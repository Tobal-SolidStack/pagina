import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { flowPost, FlowPaymentResponse, FlowCustomer, FlowRegisterResponse } from "@/lib/flow";
import { siteConfig } from "@/lib/site-config";

const schema = z.object({
  planId: z.enum(["lanzamiento", "negocio", "pro"]),
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(8),
  rut: z.string().min(7),
});

const PLAN_AMOUNTS: Record<string, string> = {
  lanzamiento: "59990",
  negocio: "49990",
  pro: "79990",
};

const PLAN_SUBJECTS: Record<string, string> = {
  lanzamiento: "Plan Lanzamiento — SolidStack",
  negocio: "Plan Negocio — SolidStack",
  pro: "Plan Pro — SolidStack",
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { planId, nombre, email, telefono, rut } = parsed.data;
  const baseUrl = siteConfig.url;
  const commerceOrder = `SOL-${planId.toUpperCase()}-${Date.now()}`;

  try {
    if (planId === "lanzamiento") {
      const data = await flowPost<FlowPaymentResponse>("payment/create", {
        subject: PLAN_SUBJECTS[planId],
        currency: "CLP",
        amount: PLAN_AMOUNTS[planId],
        email,
        urlConfirmation: `${baseUrl}/api/checkout/confirm`,
        urlReturn: `${baseUrl}/api/checkout/return`,
        commerceOrder,
        optional: JSON.stringify({ nombre, telefono, rut }),
      });
      return NextResponse.json({ redirectUrl: `${data.url}?token=${data.token}` });
    }

    // Planes de suscripción: Negocio y Pro
    const flowPlanId =
      planId === "negocio"
        ? process.env.FLOW_PLAN_NEGOCIO_ID
        : process.env.FLOW_PLAN_PRO_ID;

    if (!flowPlanId) {
      console.error(`FLOW_PLAN_${planId.toUpperCase()}_ID no configurado`);
      return NextResponse.json({ error: "Plan no configurado." }, { status: 500 });
    }

    const externalId = `${rut.replace(/\./g, "").replace("-", "")}-${Date.now()}`;
    const customer = await flowPost<FlowCustomer>("customer/create", {
      name: nombre,
      email,
      externalId,
    });

    const returnUrl =
      `${baseUrl}/api/checkout/subscription-return` +
      `?plan=${planId}&flowPlanId=${encodeURIComponent(flowPlanId)}&customerId=${encodeURIComponent(customer.customerId)}`;

    const reg = await flowPost<FlowRegisterResponse>("customer/register", {
      customerId: customer.customerId,
      url_return: returnUrl,
    });

    return NextResponse.json({ redirectUrl: `${reg.url}?token=${reg.token}` });
  } catch (err) {
    console.error("FLOW checkout/create error:", err);
    return NextResponse.json({ error: "Error al conectar con FLOW. Intenta de nuevo." }, { status: 502 });
  }
}
