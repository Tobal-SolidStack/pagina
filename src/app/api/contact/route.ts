import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { name, email, company, message } = parsed.data;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "SolidStack";
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
    console.error("Faltan variables de entorno SMTP.");
    return NextResponse.json(
      { error: "Error de configuración del servidor." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subject = `Nueva cotización de ${name}${company ? ` — ${company}` : ""}`;

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
      <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:32px;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:24px;">Nueva cotización recibida</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Desde el formulario de SolidStack</p>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;width:130px;color:#6b7280;font-size:14px;">Nombre</td>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Correo</td>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
              <a href="mailto:${email}" style="color:#2563eb;">${email}</a>
            </td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Empresa</td>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">${company}</td>
          </tr>` : ""}
          <tr>
            <td style="padding:12px 0;color:#6b7280;font-size:14px;vertical-align:top;">Mensaje</td>
            <td style="padding:12px 0;line-height:1.6;">${message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
        <div style="margin-top:32px;padding:16px;background:#f0f9ff;border-radius:8px;border-left:4px solid #2563eb;">
          <p style="margin:0;font-size:13px;color:#0369a1;">
            Responde directamente a este mensaje para contactar a <strong>${name}</strong> en <a href="mailto:${email}" style="color:#0369a1;">${email}</a>
          </p>
        </div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
        SolidStack · Santiago, Chile · solidstack.cl
      </p>
    </div>
  `;

  const textBody = [
    `Nueva cotización recibida desde SolidStack`,
    ``,
    `Nombre: ${name}`,
    `Correo: ${email}`,
    company ? `Empresa: ${company}` : null,
    ``,
    `Mensaje:`,
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: `"${name}" <${email}>`,
      subject,
      html: htmlBody,
      text: textBody,
    });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el correo. Intenta de nuevo." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
