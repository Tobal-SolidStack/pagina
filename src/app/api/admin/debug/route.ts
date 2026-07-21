import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const count = await db.adminUser.count();
    const users = await db.adminUser.findMany({ select: { email: true, createdAt: true } });
    return NextResponse.json({ count, users, dbUrl: process.env.DATABASE_URL?.slice(0, 50) });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
