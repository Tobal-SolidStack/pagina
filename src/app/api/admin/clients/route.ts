import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const clients = await db.client.findMany({
    include: { project: true, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { name, email, phone, rut, plan, amount } = await req.json();
  if (!name || !email || !plan)
    return NextResponse.json({ error: "Nombre, email y plan son requeridos" }, { status: 400 });

  try {
    const client = await db.client.upsert({
      where: { email },
      update: { name, phone: phone ?? "", rut: rut ?? "", plan, amount: Number(amount) || 0 },
      create: {
        name,
        email,
        phone: phone ?? "",
        rut: rut ?? "",
        plan,
        amount: Number(amount) || 0,
        project: { create: { status: "pending" } },
      },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    console.error("create client error:", err);
    return NextResponse.json({ error: "Error al crear cliente" }, { status: 500 });
  }
}
