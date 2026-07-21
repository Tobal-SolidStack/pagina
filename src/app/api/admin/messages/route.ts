import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { clientId, content } = await req.json();
  if (!clientId || !content)
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  const message = await db.message.create({
    data: { clientId, content, author: session.name },
  });
  return NextResponse.json(message);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await req.json();
  await db.message.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
