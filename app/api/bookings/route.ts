import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const BOOKINGS_KEY = "bookings";

// GET — list all bookings (admin only)
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("n2t-admin")?.value;
  if (cookie !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let raw: unknown[];
  try {
    raw = await redis.lrange(BOOKINGS_KEY, 0, -1);
  } catch (err) {
    console.error("[bookings GET] lrange failed:", err);
    return NextResponse.json({ error: "Failed to read bookings" }, { status: 500 });
  }
  const bookings = raw.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );
  return NextResponse.json(bookings);
}

// POST — save new booking (rate limited)
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, retryAfterMs } = rateLimit(`bookings-post:${ip}`, 10, 600_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const formData = (body.formData ?? {}) as Record<string, unknown>;

  // Flatten formData fields so the admin dashboard can read them directly
  const newBooking = {
    ...formData,
    id: body.bookingRef,
    bookingRef: body.bookingRef,
    totalPrice: body.calculatedPrice,
    currency: body.currency,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  await redis.lpush(BOOKINGS_KEY, JSON.stringify(newBooking));
  console.log("[bookings] Saved to Redis:", newBooking.id, newBooking);

  return NextResponse.json({ ok: true, booking: newBooking });
}

// PATCH — update booking status (admin only)
export async function PATCH(req: NextRequest) {
  const cookie = req.cookies.get("n2t-admin")?.value;
  if (cookie !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: unknown; status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { id, status } = body;
  if (typeof id !== "string" || typeof status !== "string") {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  let raw: unknown[];
  try {
    raw = await redis.lrange(BOOKINGS_KEY, 0, -1);
  } catch (err) {
    console.error("[bookings PATCH] lrange failed:", err);
    return NextResponse.json({ error: "Failed to read bookings" }, { status: 500 });
  }

  const bookings = raw.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  ) as Array<Record<string, unknown>>;

  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  bookings[idx].status = status;
  bookings[idx].updatedAt = new Date().toISOString();

  try {
    await redis.lset(BOOKINGS_KEY, idx, JSON.stringify(bookings[idx]));
  } catch (err) {
    console.error("[bookings PATCH] lset failed:", err);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
