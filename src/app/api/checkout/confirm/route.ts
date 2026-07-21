import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";

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
      await Promise.allSettled([
        sendConfirmationEmail(status),
        sendWhatsAppNotification(status),
      ]);
    }
  } catch (err) {
    console.error("FLOW confirm webhook error:", err);
  }

  // FLOW requires a 200 response to mark the payment as processed
  return NextResponse.json({ ok: true });
}

async function sendWhatsAppNotification(status: FlowPaymentStatus) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return;

  const planName = status.subject.replace(" — SolidStack", "");
  const amount = `$${status.amount.toLocaleString("es-CL")} CLP`;
  const text = `🎉 Nueva compra en SolidStack!\n📦 ${planName}\n💰 ${amount}\n📧 ${status.payer}\n🔖 Orden: ${status.commerceOrder}`;

  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=56985193115&text=${encodeURIComponent(text)}&apikey=${apiKey}`
  ).catch((err) => console.error("WhatsApp notification error:", err));
}

async function sendConfirmationEmail(status: FlowPaymentStatus) {
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
    subject: `✅ Pago recibido — ${status.subject}`,
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
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">$${status.amount.toLocaleString("es-CL")} CLP</td>
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
