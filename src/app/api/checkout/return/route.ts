import { NextRequest, NextResponse } from "next/server";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");
  const plan = searchParams.get("plan") ?? "lanzamiento";
  const customerId = searchParams.get("customerId") ?? "";
  const base = siteConfig.url;

  if (!token) {
    return NextResponse.redirect(`${base}/checkout/failure?plan=${plan}`);
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
      return NextResponse.redirect(`${base}/checkout/success?${successParams}`);
    }
    const failParams = new URLSearchParams({ plan, order: status.commerceOrder });
    return NextResponse.redirect(`${base}/checkout/failure?${failParams}`);
  } catch (err) {
    console.error("FLOW return error:", err);
    return NextResponse.redirect(`${base}/checkout/failure?plan=${plan}`);
  }
}
