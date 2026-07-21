import { NextRequest, NextResponse } from "next/server";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";
import { db } from "@/lib/db";

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

async function saveClientToDB(
  status: FlowPaymentStatus,
  plan: string,
  flowCustomerId: string,
  nombre: string,
  telefono: string,
  rut: string,
) {
  try {
    // Fallback: intentar leer desde optional si los params de URL están vacíos
    if (!nombre || !telefono) {
      try {
        const opt = JSON.parse(status.optional ?? "{}");
        nombre = nombre || opt.nombre || "";
        telefono = telefono || opt.telefono || "";
        rut = rut || opt.rut || "";
      } catch {}
    }

    await db.client.upsert({
      where: { email: status.payer },
      update: { name: nombre || undefined, phone: telefono || undefined, flowCustomerId: flowCustomerId || undefined },
      create: {
        name: nombre || status.payer,
        email: status.payer,
        phone: telefono,
        rut,
        plan,
        amount: Number(status.amount),
        commerceOrder: status.commerceOrder,
        flowCustomerId: flowCustomerId || null,
        project: { create: { status: "pending" } },
      },
    });
  } catch (err) {
    console.error("saveClientToDB error:", err);
  }
}

async function sendWhatsAppNotification(
  status: FlowPaymentStatus,
  plan: string,
  nombre: string,
  telefono: string,
) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return;

  const planName = PLAN_NAMES[plan] ?? plan;
  const price = PLAN_PRICES[plan] ?? `$${status.amount.toLocaleString("es-CL")} CLP`;

  const text = [
    `Nueva compra en SolidStack!`,
    `Plan ${planName} - ${price}`,
    `Cliente: ${nombre || status.payer}`,
    `Telefono: ${telefono || "-"}`,
    `Email: ${status.payer}`,
    `Orden: ${status.commerceOrder}`,
  ].join(" | ");

  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=56985193115&text=${encodeURIComponent(text)}&apikey=${apiKey}`
  ).catch((err) => console.error("WhatsApp notification error:", err));
}

async function handleReturn(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const plan = searchParams.get("plan") ?? "lanzamiento";
  const customerId = searchParams.get("customerId") ?? "";
  const nombre = searchParams.get("nombre") ?? "";
  const telefono = searchParams.get("telefono") ?? "";
  const rut = searchParams.get("rut") ?? "";
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
      await saveClientToDB(status, plan, customerId, nombre, telefono, rut);
      await sendWhatsAppNotification(status, plan, nombre, telefono);
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
