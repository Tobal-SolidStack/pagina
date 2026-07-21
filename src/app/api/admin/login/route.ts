import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: "Credenciales requeridas" }, { status: 400 });

  const result = await login(email, password);
  if (!result)
    return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 });

  const res = NextResponse.json({ ok: true, name: result.user.name });
  res.cookies.set(result.cookieName, result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
