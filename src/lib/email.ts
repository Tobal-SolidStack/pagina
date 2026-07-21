import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

const PLAN_LABELS: Record<string, string> = {
  lanzamiento: "Plan Lanzamiento — Pago único",
  negocio: "Plan Negocio — $49.990/mes",
  pro: "Plan Pro — $79.990/mes",
};

function hasSmtp() {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_FROM_EMAIL
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: Number(process.env.SMTP_PORT ?? "587") === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function sendClientPurchaseConfirmation({
  to,
  nombre,
  plan,
  amountFormatted,
  order,
  portalUrl,
}: {
  to: string;
  nombre?: string;
  plan: string;
  amountFormatted: string;
  order: string;
  portalUrl: string;
}) {
  if (!hasSmtp()) {
    console.error("sendClientPurchaseConfirmation: SMTP no configurado");
    return;
  }

  const planLabel = PLAN_LABELS[plan] ?? plan;
  const displayName = nombre || to;
  const fromEmail = process.env.CONTACT_FROM_EMAIL!;
  const fromName = process.env.CONTACT_FROM_NAME ?? "SolidStack";

  await createTransporter().sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: `✅ ¡Tu compra está confirmada! — SolidStack`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
        <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:32px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:24px;">¡Hola, ${displayName}! 👋</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Tu compra en SolidStack fue confirmada exitosamente.</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:140px;">Plan</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${planLabel}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Monto</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${amountFormatted}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#6b7280;font-size:14px;">Nº de orden</td>
              <td style="padding:12px 0;font-family:monospace;font-size:13px;">${order}</td>
            </tr>
          </table>

          <div style="margin:28px 0;padding:24px;background:#eff6ff;border-radius:12px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Tu portal de seguimiento</p>
            <p style="margin:0 0 16px;font-size:14px;color:#1d4ed8;">Sigue el estado de tu proyecto en tiempo real</p>
            <a href="${portalUrl}" style="display:inline-block;background:#2563eb;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
              Ver estado del proyecto →
            </a>
            <p style="margin:14px 0 0;font-size:12px;color:#9ca3af;">Guarda este link — es tu acceso único y personal</p>
          </div>

          <div style="padding:16px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e;">
            <p style="margin:0 0 6px;font-size:13px;color:#15803d;font-weight:600;">¿Qué sigue?</p>
            <ol style="margin:0;padding-left:20px;font-size:13px;color:#166534;line-height:1.9;">
              <li>Te contactaremos por WhatsApp en las próximas horas</li>
              <li>Coordinaremos los detalles de tu sitio web</li>
              <li>Entrega garantizada en 48 horas hábiles</li>
            </ol>
          </div>

          <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
            Ante cualquier consulta escríbenos a
            <a href="mailto:${siteConfig.email}" style="color:#2563eb;text-decoration:none;">${siteConfig.email}</a>
          </p>
        </div>
        <p style="margin:16px 0 0;font-size:11px;color:#d1d5db;text-align:center;">
          © ${new Date().getFullYear()} ${siteConfig.name} · Pago procesado por FLOW
        </p>
      </div>
    `,
  });
}
