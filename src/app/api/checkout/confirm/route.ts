import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";
import { db } from "@/lib/db";

function extractPlan(subject: string): string {
  if (subject.includes("Negocio")) return "negocio";
  if (subject.includes("Pro")) return "pro";
  return "lanzamiento";
}

export async function POST(req: NextRequest) {
  let token: string | null = null;

  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    token = new URLSearchParams(text).get("token");
  } else {
    const body = await req.json().catch(() => ({}));
    token = body?.token ?? null;
  }

  if (!token) {
    return NextResponse.json({ error: "Token requerido" }, { status: 400 });
  }

  try {
    const status = await flowGet<FlowPaymentStatus>("payment/getStatus", { token });

    if (status.status === 2) {
      // Extract any available customer data from the optional field
      let nombre = "", telefono = "", rut = "";
      try {
        const opt = JSON.parse(status.optional ?? "{}");
        nombre = opt.nombre ?? "";
        telefono = opt.telefono ?? "";
        rut = opt.rut ?? "";
      } catch {}

      const plan = extractPlan(status.subject);

      // Idempotent DB save — ensures client is stored even if browser never redirected
      await saveClientFromWebhook(status, plan, nombre, telefono, rut);

      await Promise.allSettled([sendAdminEmail(status), sendAdminWhatsApp(status, plan)]);
    }
  } catch (err) {
    console.error("FLOW confirm webhook error:", err);
  }

  return NextResponse.json({ ok: true });
}

async function saveClientFromWebhook(
  status: FlowPaymentStatus,
  plan: string,
  nombre: string,
  telefono: string,
  rut: string,
) {
  try {
    const existing = await db.client.findUnique({
      where: { email: status.payer },
      select: { accessToken: true },
    });

    if (existing) {
      // Client already exists (likely saved by return route) — skip
      return;
    }

    await db.client.create({
      data: {
        name: nombre || status.payer,
        email: status.payer,
        phone: telefono,
        rut,
        plan,
        amount: Number(status.amount),
        commerceOrder: status.commerceOrder,
        flowCustomerId: null,
        accessToken: randomUUID(),
        project: { create: { status: "pending" } },
      },
    });
  } catch (err) {
    console.error("saveClientFromWebhook error:", err);
  }
}

async function sendAdminWhatsApp(status: FlowPaymentStatus, plan: string) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return;

  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
  const text = `🔔 Webhook FLOW confirmado\n📦 Plan ${planName}\n📧 ${status.payer}\n🔖 Orden: ${status.commerceOrder}`;

  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=56985193115&text=${encodeURIComponent(text)}&apikey=${apiKey}`
  ).catch((err) => console.error("WhatsApp webhook notification error:", err));
}

async function sendAdminEmail(status: FlowPaymentStatus) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "SolidStack";
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
    console.error("Faltan variables SMTP para email de confirmación.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: toEmail,
    subject: `✅ Pago confirmado — ${status.subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
        <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:32px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:24px;">Pago confirmado ✅</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">SolidStack</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:140px;">Orden</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${status.commerceOrder}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Plan</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">${status.subject}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Monto</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">$${Number(status.amount).toLocaleString("es-CL")} CLP</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Cliente</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">${status.payer}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#6b7280;font-size:14px;">Nº FLOW</td>
              <td style="padding:12px 0;">${status.flowOrder}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e;">
            <p style="margin:0;font-size:13px;color:#15803d;">
              Contacta al cliente en <strong>${status.payer}</strong> para coordinar el inicio del proyecto.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}
