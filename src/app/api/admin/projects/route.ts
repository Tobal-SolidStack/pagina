import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { clientId, status, notes, deliveryDate } = await req.json();
  const project = await db.project.upsert({
    where: { clientId },
    update: { status, notes, deliveryDate: deliveryDate ? new Date(deliveryDate) : null },
    create: { clientId, status: status ?? "pending", notes, deliveryDate: deliveryDate ? new Date(deliveryDate) : null },
  });
  return NextResponse.json(project);
}
