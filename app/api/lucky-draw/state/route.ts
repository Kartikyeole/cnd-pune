import { NextResponse, type NextRequest } from "next/server";

import { countEntries, listEntries, listWinners } from "@/lib/lucky-draw-db";
import { isAdminRequest } from "@/lib/lucky-draw-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = isAdminRequest(req);

  return NextResponse.json({
    // The pages use this to decide between the login screen and the panel.
    isAdmin: admin,
    count: countEntries(),
    winners: listWinners(),
    entries: admin ? listEntries() : undefined,
  });
}
