import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { subject, body } = await req.json();
  if (!subject || !body)
    return NextResponse.json({ error: "Asunto y cuerpo requeridos" }, { status: 400 });

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "SolidStack";

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail)
    return NextResponse.json({ error: "SMTP no configurado" }, { status: 500 });

  const clients = await db.client.findMany({ select: { email: true, name: true } });
  if (clients.length === 0)
    return NextResponse.json({ error: "No hay clientes registrados" }, { status: 400 });

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const results = await Promise.allSettled(
    clients.map((c: { email: string; name: string }) =>
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: c.email,
        subject,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <p>Hola ${c.name},</p>
          ${body.replace(/\n/g, "<br/>")}
          <br/><hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="font-size:12px;color:#6b7280;">SolidStack · <a href="mailto:${fromEmail}">Responder</a></p>
        </div>`,
      })
    )
  );

  const sent = results.filter((r: PromiseSettledResult<unknown>) => r.status === "fulfilled").length;
  const failed = results.filter((r: PromiseSettledResult<unknown>) => r.status === "rejected").length;
  return NextResponse.json({ sent, failed, total: clients.length });
}
