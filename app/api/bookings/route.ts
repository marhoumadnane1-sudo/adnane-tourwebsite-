import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'bookings.json')

async function readBookings() {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeBookings(bookings: unknown[]) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(bookings, null, 2))
}

// GET — list all bookings (admin only)
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('n2t-admin')?.value
  if (cookie !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const bookings = await readBookings()
  return NextResponse.json(bookings)
}

// POST — save new booking
export async function POST(req: NextRequest) {
  const booking = await req.json()
  const bookings = await readBookings()

  const newBooking = {
    ...booking,
    id: booking.bookingRef,
    createdAt: new Date().toISOString(),
    status: 'pending',
  }

  bookings.unshift(newBooking)
  await writeBookings(bookings)

  return NextResponse.json({ ok: true, booking: newBooking })
}

// PATCH — update booking status
export async function PATCH(req: NextRequest) {
  const cookie = req.cookies.get('n2t-admin')?.value
  if (cookie !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, status } = await req.json()
  const bookings = await readBookings()
  const idx = bookings.findIndex((b: { id: string }) => b.id === id)

  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const booking = bookings[idx] as Record<string, unknown>
  booking.status = status
  booking.updatedAt = new Date().toISOString()
  await writeBookings(bookings)

  return NextResponse.json({ ok: true })
}
