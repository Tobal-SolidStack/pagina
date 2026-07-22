import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSession } from "@/lib/auth";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { to, subject, body } = await req.json();
  if (!to || !subject || !body)
    return NextResponse.json({ error: "Destinatario, asunto y cuerpo requeridos" }, { status: 400 });

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "SolidStack";

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail)
    return NextResponse.json({ error: "SMTP no configurado" }, { status: 500 });

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const bodyHtml = body
    .split("\n\n")
    .map((p: string) => `<p style="margin:0 0 16px;line-height:1.7;color:#374151;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    replyTo: fromEmail,
    to,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:28px 32px;border-radius:12px 12px 0 0;display:flex;align-items:center;gap:12px;">
          <div style="display:flex;flex-direction:column;gap:3px;">
            <div style="width:18px;height:4px;border-radius:2px;background:rgba(255,255,255,0.55);"></div>
            <div style="width:26px;height:4px;border-radius:2px;background:rgba(255,255,255,0.80);"></div>
            <div style="width:34px;height:5px;border-radius:2px;background:white;"></div>
          </div>
          <span style="font-size:20px;font-weight:700;color:white;letter-spacing:-0.3px;">SolidStack</span>
        </div>

        <!-- Body -->
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
          ${bodyHtml}

          <!-- Firma -->
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f3f4f6;">
            <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">${session.name}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">${siteConfig.name}</p>
            <div style="margin-top:12px;display:flex;gap:16px;font-size:12px;color:#9ca3af;">
              <a href="mailto:${siteConfig.email}" style="color:#2563eb;text-decoration:none;">${siteConfig.email}</a>
              <span>·</span>
              <a href="https://wa.me/${siteConfig.whatsappNumber}" style="color:#2563eb;text-decoration:none;">${siteConfig.phoneDisplay}</a>
              <span>·</span>
              <a href="${siteConfig.url}" style="color:#2563eb;text-decoration:none;">solidstack.cl</a>
            </div>
          </div>
        </div>

        <p style="margin:16px 0 0;font-size:11px;color:#d1d5db;text-align:center;">
          © ${new Date().getFullYear()} ${siteConfig.name} · Santiago, Chile
        </p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
