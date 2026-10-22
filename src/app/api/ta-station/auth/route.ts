// biome-ignore-all lint: api-ta-station-auth
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import argon2 from "argon2";
import { getUserByUsername } from "@/lib/db";

const AUTH_COOKIE = "ta_station_auth";
const AUTH_TOKEN = "ta-authenticated-admin-session";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุชื่อผู้ใช้งานและรหัสผ่าน" },
        { status: 400 }
      );
    }

    const user = getUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const isValid = await argon2.verify(user.password_hash, password);
    if (isValid) {
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE, AUTH_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        user: { username: user.username, role: user.role, name: user.name },
      });
    }

    return NextResponse.json(
      { success: false, error: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Login failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (token === AUTH_TOKEN) {
    return NextResponse.json({ authenticated: true, user: { username: "yudev", role: "Admin", name: "Yu Dev" } });
  }

  return NextResponse.json({ authenticated: false });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return NextResponse.json({ success: true, message: "Logged out" });
}
