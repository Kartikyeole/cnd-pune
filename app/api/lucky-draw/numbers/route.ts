import { NextResponse, type NextRequest } from "next/server";

import { addNumbers, MAX_RANGE, removeNumber } from "@/lib/lucky-draw-db";
import { isAdminRequest } from "@/lib/lucky-draw-auth";

// SQLite writes need the Node.js runtime (not edge) and must not be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isInt(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n);
}

/** Add numbers to the pool — either a range {from,to} or an explicit list {numbers}. */
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { from?: number; to?: number; numbers?: number[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  let numbers: number[];

  if (Array.isArray(body.numbers)) {
    numbers = body.numbers.filter(isInt);
    if (numbers.length === 0) {
      return NextResponse.json({ error: "Provide at least one whole number." }, { status: 400 });
    }
  } else if (isInt(body.from) && isInt(body.to)) {
    const from = body.from;
    const to = body.to;
    if (from > to) {
      return NextResponse.json({ error: "“From” must be ≤ “To”." }, { status: 400 });
    }
    if (to - from + 1 > MAX_RANGE) {
      return NextResponse.json(
        { error: `That range is too large (max ${MAX_RANGE} at once).` },
        { status: 400 }
      );
    }
    numbers = [];
    for (let n = from; n <= to; n += 1) numbers.push(n);
  } else {
    return NextResponse.json(
      { error: "Provide a range (from, to) or a list of numbers." },
      { status: 400 }
    );
  }

  const result = addNumbers(numbers);
  return NextResponse.json(result);
}

/** Remove a single number from the pool: /api/lucky-draw/numbers?number=42 */
export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const raw = new URL(req.url).searchParams.get("number");
  const number = Number(raw);
  if (!Number.isInteger(number)) {
    return NextResponse.json({ error: "Invalid number." }, { status: 400 });
  }

  removeNumber(number);
  return NextResponse.json({ ok: true });
}
