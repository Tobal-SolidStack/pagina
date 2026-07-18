import { NextRequest, NextResponse } from "next/server";
import { flowGet, FlowPaymentStatus } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const base = siteConfig.url;

  if (!token) {
    return NextResponse.redirect(`${base}/checkout/failure`);
  }

  try {
    const status = await flowGet<FlowPaymentStatus>("payment/getStatus", { token });

    if (status.status === 2) {
      return NextResponse.redirect(`${base}/checkout/success?plan=lanzamiento`);
    }
    return NextResponse.redirect(`${base}/checkout/failure?plan=lanzamiento`);
  } catch (err) {
    console.error("FLOW return error:", err);
    return NextResponse.redirect(`${base}/checkout/failure`);
  }
}
