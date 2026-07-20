import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { flowGet, flowPost, FlowRegisterStatus, FlowSubscription } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const plan = searchParams.get("plan");
  const flowPlanId = searchParams.get("flowPlanId");
  const customerId = searchParams.get("customerId");
  const base = siteConfig.url;

  // FLOW envía el token en el body (form-urlencoded)
  const text = await req.text();
  const token = new URLSearchParams(text).get("token");

  console.log("[subscription-return] token:", token ? "present" : "missing", "| plan:", plan, "| flowPlanId:", flowPlanId, "| customerId:", customerId);

  if (!token || !plan || !flowPlanId || !customerId) {
    console.error("[subscription-return] Missing required params");
    return NextResponse.redirect(`${base}/checkout/failure`, { status: 303 });
  }

  try {
    const regStatus = await flowGet<FlowRegisterStatus>("customer/getRegisterStatus", { token });
    console.log("[subscription-return] regStatus:", JSON.stringify(regStatus));

    if (String(regStatus.status) !== "1") {
      console.warn("[subscription-return] Card registration failed, status:", regStatus.status);
      return NextResponse.redirect(`${base}/checkout/failure?plan=${plan}`, { status: 303 });
    }

    const sub = await flowPost<FlowSubscription>("subscription/create", {
      planId: flowPlanId,
      customerId: regStatus.customerId,
      trialPeriodDays: "0",
    });
    console.log("[subscription-return] subscription created:", JSON.stringify(sub));

    await sendWelcomeEmail(regStatus.customerId, plan);

    const amounts: Record<string, string> = { negocio: "49990", pro: "79990" };
    const params = new URLSearchParams({
      plan,
      customerId: regStatus.customerId,
      amount: amounts[plan] ?? "",
      cardType: regStatus.creditCardType ?? "",
      last4: regStatus.last4CardDigits ?? "",
    });
    return NextResponse.redirect(`${base}/checkout/success?${params}`, { status: 303 });
  } catch (err) {
    console.error("[subscription-return] Error:", err);
    const failParams = new URLSearchParams({ plan });
    return NextResponse.redirect(`${base}/checkout/failure?${failParams}`, { status: 303 });
  }
}

async function sendWelcomeEmail(customerId: string, plan: string) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "SolidStack";
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) return;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const planName = plan === "negocio" ? "Plan Negocio ($49.990/mes)" : "Plan Pro ($79.990/mes)";

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: toEmail,
    subject: `🎉 Nueva suscripción activa — ${planName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
        <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:32px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:24px;">Nueva suscripción activa 🎉</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">SolidStack</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;width:160px;">Plan</td>
              <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${planName}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#6b7280;font-size:14px;">Customer ID FLOW</td>
              <td style="padding:12px 0;">${customerId}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb;">
            <p style="margin:0;font-size:13px;color:#1d4ed8;">
              La tarjeta fue registrada y la suscripción está activa en FLOW. El primer cobro se realizará de forma automática.
            </p>
          </div>
        </div>
      </div>
    `,
  });
}
