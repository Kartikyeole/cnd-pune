import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

/**
 * Admin auth for the Lucky Draw.
 *
 * Only the admin may register participants, close registration and spin.
 * On login we set an httpOnly cookie holding a token derived from the admin
 * password (never the raw password). Every protected request is checked
 * against that cookie, so the session survives refreshes.
 *
 * The password comes from LUCKY_DRAW_ADMIN_PASSWORD (default "admin123" for
 * local use). Set it in your environment before deploying.
 */

const DEFAULT_PASSWORD = "mybirthday";
export const ADMIN_COOKIE = "ld_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function adminPassword(): string {
  return process.env.LUCKY_DRAW_ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
}

/** Opaque token stored in the cookie — a hash of the password, not the password. */
export function adminToken(): string {
  return createHash("sha256").update(adminPassword()).digest("hex");
}

export function isValidPassword(password: string): boolean {
  return password === adminPassword();
}

export function isAdminRequest(req: NextRequest): boolean {
  return req.cookies.get(ADMIN_COOKIE)?.value === adminToken();
}
