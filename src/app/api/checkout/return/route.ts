import { NextRequest, NextResponse } from "next/server";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";

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
