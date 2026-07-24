import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const SETTING_KEYS = ["price_lanzamiento", "price_negocio", "price_pro"] as const;

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rows = await db.setting.findMany({ where: { key: { in: [...SETTING_KEYS] } } });
  const prices: Record<string, string> = {};
  for (const row of rows) prices[row.key] = row.value;

  // Fallback defaults if not yet in DB
  const defaults: Record<string, string> = {
    price_lanzamiento: "59990",
    price_negocio: "49990",
    price_pro: "79990",
  };
  for (const key of SETTING_KEYS) {
    if (!prices[key]) prices[key] = defaults[key];
  }

  const flowUrl = process.env.FLOW_API_URL ?? "";
  const flowMode = flowUrl.includes("sandbox") ? "sandbox" : flowUrl ? "production" : "not_set";

  return NextResponse.json({
    prices,
    flow: {
      mode: flowMode,
      url: flowUrl,
      configured: {
        apiKey: !!process.env.FLOW_API_KEY,
        secretKey: !!process.env.FLOW_SECRET_KEY,
        planNegocioId: !!process.env.FLOW_PLAN_NEGOCIO_ID,
        planProId: !!process.env.FLOW_PLAN_PRO_ID,
      },
    },
    notifications: {
      smtp: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      whatsapp: !!process.env.CALLMEBOT_API_KEY,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const allowed = new Set(SETTING_KEYS as readonly string[]);
  const updates: Array<{ key: string; value: string }> = [];

  for (const [key, val] of Object.entries(body)) {
    if (!allowed.has(key)) continue;
    const num = Number(val);
    if (!Number.isInteger(num) || num < 1000 || num > 9999999) {
      return NextResponse.json({ error: `Precio inválido para ${key}` }, { status: 400 });
    }
    updates.push({ key, value: String(num) });
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "Sin cambios válidos" }, { status: 400 });
  }

  await Promise.all(
    updates.map(({ key, value }) =>
      db.setting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
