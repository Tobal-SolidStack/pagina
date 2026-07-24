import { db } from "@/lib/db";

const PRICE_DEFAULTS: Record<string, number> = {
  lanzamiento: 59990,
  negocio: 49990,
  pro: 79990,
};

export async function getPlanPrices(): Promise<Record<string, number>> {
  try {
    const rows = await db.setting.findMany({
      where: { key: { in: ["price_lanzamiento", "price_negocio", "price_pro"] } },
    });
    const result = { ...PRICE_DEFAULTS };
    for (const row of rows) {
      const plan = row.key.replace("price_", "");
      const num = Number(row.value);
      if (Number.isFinite(num) && num > 0) result[plan] = num;
    }
    return result;
  } catch {
    return { ...PRICE_DEFAULTS };
  }
}

export function formatPriceCLP(amount: number): string {
  return `$${new Intl.NumberFormat("es-CL").format(amount)}`;
}
