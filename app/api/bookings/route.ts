import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const DB_PATH = path.join(process.cwd(), "data", "bookings.json");

async function readBookings() {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeBookings(bookings: unknown[]) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2));
}

// GET — list all bookings (admin only)
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("n2t-admin")?.value;
  if (cookie !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bookings = await readBookings();
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

  let booking: Record<string, unknown>;
  try {
    booking = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const bookings = await readBookings();

  const newBooking = {
    ...booking,
    id: booking.bookingRef,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  bookings.unshift(newBooking);
  await writeBookings(bookings);

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

  const bookings = await readBookings();
  const idx = bookings.findIndex((b: { id: string }) => b.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const booking = bookings[idx] as Record<string, unknown>;
  booking.status = status;
  booking.updatedAt = new Date().toISOString();
  await writeBookings(bookings);

  return NextResponse.json({ ok: true });
}
