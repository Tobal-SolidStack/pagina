import { NextRequest, NextResponse } from "next/server";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";

const PLAN_NAMES: Record<string, string> = {
  lanzamiento: "Lanzamiento",
  negocio: "Negocio",
  pro: "Pro",
};

const PLAN_PRICES: Record<string, string> = {
  lanzamiento: "$59.990 CLP",
  negocio: "$49.990 CLP/mes",
  pro: "$79.990 CLP/mes",
};

async function sendWhatsAppNotification(status: FlowPaymentStatus, plan: string) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return;

  let nombre = "—";
  let telefono = "—";
  try {
    const opt = JSON.parse(status.optional ?? "{}");
    nombre = opt.nombre ?? "—";
    telefono = opt.telefono ?? "—";
  } catch {}

  const planName = PLAN_NAMES[plan] ?? plan;
  const price = PLAN_PRICES[plan] ?? `$${status.amount.toLocaleString("es-CL")} CLP`;

  const text = [
    `🎉 Nueva compra en SolidStack!`,
    `📦 Plan ${planName} — ${price}`,
    `👤 ${nombre}`,
    `📞 ${telefono}`,
    `📧 ${status.payer}`,
    `🔖 Orden: ${status.commerceOrder}`,
  ].join("\n");

  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=56985193115&text=${encodeURIComponent(text)}&apikey=${apiKey}`
  ).catch((err) => console.error("WhatsApp notification error:", err));
}

async function handleReturn(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const plan = searchParams.get("plan") ?? "lanzamiento";
  const customerId = searchParams.get("customerId") ?? "";
  const base = siteConfig.url;

  // FLOW puede enviar el token en query string (GET) o en el body (POST)
  let token = searchParams.get("token");
  if (!token && req.method === "POST") {
    const text = await req.text();
    token = new URLSearchParams(text).get("token");
  }

  if (!token) {
    return NextResponse.redirect(`${base}/checkout/failure?plan=${plan}`, { status: 303 });
  }

  try {
    const status = await flowGet<FlowPaymentStatus>("payment/getStatus", { token });

    if (status.status === 2) {
      void sendWhatsAppNotification(status, plan);
      const successParams = new URLSearchParams({
        plan,
        order: status.commerceOrder,
        amount: String(status.amount),
        email: status.payer,
        flowOrder: String(status.flowOrder),
      });
      if (customerId) successParams.set("customerId", customerId);
      return NextResponse.redirect(`${base}/checkout/success?${successParams}`, { status: 303 });
    }
    const failParams = new URLSearchParams({ plan, order: status.commerceOrder });
    return NextResponse.redirect(`${base}/checkout/failure?${failParams}`, { status: 303 });
  } catch (err) {
    console.error("FLOW return error:", err);
    return NextResponse.redirect(`${base}/checkout/failure?plan=${plan}`, { status: 303 });
  }
}

export async function GET(req: NextRequest) {
  return handleReturn(req);
}

export async function POST(req: NextRequest) {
  return handleReturn(req);
}
