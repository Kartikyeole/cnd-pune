import { NextResponse, type NextRequest } from "next/server";

import { drawRandomWinner, resetAll } from "@/lib/lucky-draw-db";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  adminToken,
  isAdminRequest,
  isValidPassword,
} from "@/lib/lucky-draw-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Action = "login" | "logout" | "spin" | "reset";

export async function POST(req: NextRequest) {
  let body: { action?: Action; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // --- Login: validate password, set the session cookie ---
  if (body.action === "login") {
    if (!isValidPassword(body.password ?? "")) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, adminToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });
    return res;
  }

  // --- Logout: clear the cookie ---
  if (body.action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(ADMIN_COOKIE);
    return res;
  }

  // --- Everything else requires a valid session ---
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  switch (body.action) {
    case "spin": {
      const winner = drawRandomWinner();
      if (!winner) {
        return NextResponse.json({ error: "No numbers left to draw." }, { status: 409 });
      }
      return NextResponse.json({ winner });
    }

    case "reset":
      resetAll();
      return NextResponse.json({ ok: true });

    default:
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }
}
