import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitize } from "@/lib/sanitize";

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = "nigor2.car@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "NIGOR 2Transport <onboarding@resend.dev>";

interface BookingPayload {
  bookingRef: string;
  formData: {
    serviceType?: string;
    airportCode?: string;
    direction?: string;
    destinationAddress?: string;
    fromCity?: string;
    toCity?: string;
    baseCity?: string;
    dayHireDuration?: string;
    date?: string;
    time?: string;
    passengers?: number;
    luggage?: number;
    vehicleType?: string;
    pickupAddress?: string;
    dropoffAddress?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    flightNumber?: string;
    hotelAddress?: string;
    specialRequests?: string;
    paymentMethod?: string;
    paypalOrderId?: string;
  };
  calculatedPrice: number | null;
  currency: "MAD" | "EUR";
}

function routeLabel(fd: BookingPayload["formData"]): string {
  if (fd.serviceType === "airport")
    return `${sanitize(fd.airportCode)} ↔ ${sanitize(fd.destinationAddress)}`;
  if (fd.serviceType === "city-to-city")
    return `${sanitize(fd.fromCity)} → ${sanitize(fd.toCity)}`;
  return `${sanitize(fd.baseCity)} — Day Hire (${sanitize(fd.dayHireDuration)?.replace("-", " ")})`;
}

function priceDisplay(price: number | null, currency: "MAD" | "EUR"): string {
  if (!price) return "—";
  return currency === "EUR"
    ? `€${(price / 10.8).toFixed(0)}`
    : `${price.toLocaleString("fr-MA")} DH`;
}

function vehicleName(id?: string): string {
  const map: Record<string, string> = {
    skoda: "Skoda Superb",
    "mercedes-e": "Mercedes E-Class",
    vito: "Mercedes Vito",
    sprinter: "Mercedes Sprinter",
  };
  return id ? (map[id] ?? sanitize(id)) : "—";
}

function buildCustomerHtml(
  ref: string,
  fd: BookingPayload["formData"],
  price: number | null,
  currency: "MAD" | "EUR"
): string {
  const safeName = sanitize(fd.fullName);
  const safeDate = sanitize(fd.date);
  const safeTime = sanitize(fd.time);
  const safeFlightNum = sanitize(fd.flightNumber);
  const safeHotel = sanitize(fd.hotelAddress);
  const safePaypalId = sanitize(fd.paypalOrderId);

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Booking Confirmed</title></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#B5451B;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#f5deb3;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Private Transfer</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;font-weight:800;">Booking Confirmed</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#1a1a2e;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:2px;text-transform:uppercase;">Your Booking Reference</p>
            <p style="margin:8px 0 0;color:#D4AF37;font-size:32px;font-weight:900;letter-spacing:4px;">${sanitize(ref)}</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.3);font-size:11px;">Save this for any changes or queries</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px 16px;">
            <p style="margin:0;color:#3a3330;font-size:16px;line-height:1.6;">
              Dear <strong>${safeName}</strong>,<br>
              Thank you for choosing NIGOR 2Transport. Your private transfer has been received and is being confirmed. Here's a summary:
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;border-radius:12px;overflow:hidden;">
              ${row("Route", routeLabel(fd))}
              ${row("Date &amp; Time", `${safeDate ?? "—"} at ${safeTime ?? "—"} (Morocco time)`)}
              ${row("Passengers", `${fd.passengers ?? 0} pax · ${fd.luggage ?? 0} bags`)}
              ${row("Vehicle", vehicleName(fd.vehicleType))}
              ${safeFlightNum ? row("Flight Number", safeFlightNum) : ""}
              ${safeHotel ? row("Hotel / Address", safeHotel) : ""}
              ${row("Payment", fd.paymentMethod === "online" ? `Paid online via PayPal${safePaypalId ? ` (Order: ${safePaypalId})` : ""}` : "Pay on arrival")}
              ${row("Total", `<strong style="color:#B5451B;font-size:18px;">${priceDisplay(price, currency)}</strong> <span style="color:#999;font-size:12px;">all-inclusive</span>`)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 24px;">
            <p style="margin:0 0 12px;color:#3a3330;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;">What Happens Next?</p>
            ${step("1", "Your booking details will be sent to our team immediately.")}
            ${step("2", "We will send your driver's name and phone number 24 hours before pickup.")}
            ${step("3", "For airport pickups, your driver will be at arrivals with your name on a sign.")}
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <a href="https://wa.me/212661659607" style="display:inline-block;background:#25D366;color:#ffffff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none;">
              Message Us on WhatsApp
            </a>
            <p style="margin:12px 0 0;color:#aaa;font-size:12px;">Questions? Call or WhatsApp: +212 661 659 607</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f5f0eb;padding:20px 40px;text-align:center;border-top:1px solid #e8e0d8;">
            <p style="margin:0;color:#aaa;font-size:11px;">NIGOR 2Transport · License N° 1754/T/2018 · Ain Borja, Casablanca, Morocco</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e8e0d8;color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;width:36%;">${label}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e8e0d8;color:#3a3330;font-size:14px;">${value}</td>
    </tr>`;
}

function step(num: string, text: string): string {
  return `
    <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
      <div style="width:24px;height:24px;background:#B5451B;border-radius:50%;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;text-align:center;line-height:24px;">${num}</div>
      <p style="margin:0;color:#555;font-size:13px;line-height:1.6;padding-top:3px;">${text}</p>
    </div>`;
}

function buildBusinessHtml(
  ref: string,
  fd: BookingPayload["formData"],
  price: number | null,
  currency: "MAD" | "EUR"
): string {
  const safeName = sanitize(fd.fullName);
  const safePhone = sanitize(fd.phone);
  const safeEmail = sanitize(fd.email);
  const safeFlightNum = sanitize(fd.flightNumber);
  const safeHotel = sanitize(fd.hotelAddress);
  const safeRequests = sanitize(fd.specialRequests);
  const safePaypalId = sanitize(fd.paypalOrderId);

  return `
<h2 style="color:#B5451B;">New Booking — ${sanitize(ref)}</h2>
<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Route</td><td style="padding:6px 12px;">${routeLabel(fd)}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Date &amp; Time</td><td style="padding:6px 12px;">${sanitize(fd.date)} at ${sanitize(fd.time)}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Passengers</td><td style="padding:6px 12px;">${fd.passengers ?? 0} pax · ${fd.luggage ?? 0} bags</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Vehicle</td><td style="padding:6px 12px;">${vehicleName(fd.vehicleType)}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Client</td><td style="padding:6px 12px;">${safeName}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Phone</td><td style="padding:6px 12px;">${safePhone}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Email</td><td style="padding:6px 12px;">${safeEmail}</td></tr>
  ${safeFlightNum ? `<tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Flight</td><td style="padding:6px 12px;">${safeFlightNum}</td></tr>` : ""}
  ${safeHotel ? `<tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Hotel</td><td style="padding:6px 12px;">${safeHotel}</td></tr>` : ""}
  ${safeRequests ? `<tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Notes</td><td style="padding:6px 12px;">${safeRequests}</td></tr>` : ""}
  <tr><td style="padding:6px 12px;background:#f5f0eb;font-weight:600;">Payment</td><td style="padding:6px 12px;">${fd.paymentMethod === "online" ? `Online (PayPal${safePaypalId ? ` — ${safePaypalId}` : ""})` : "On arrival"}</td></tr>
  <tr><td style="padding:6px 12px;background:#B5451B;color:#fff;font-weight:700;">Total</td><td style="padding:6px 12px;background:#B5451B;color:#fff;font-weight:700;">${priceDisplay(price, currency)}</td></tr>
</table>`;
}

export async function POST(req: NextRequest) {
  // ── Rate limiting: 10 booking requests per IP per 10 minutes ──
  const ip = getClientIp(req);
  const { allowed, retryAfterMs } = rateLimit(`booking:${ip}`, 10, 600_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: BookingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { bookingRef, formData, calculatedPrice, currency } = body;

  if (!formData?.email || !bookingRef) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: sanitize(formData.email),
        subject: `Booking Confirmed — ${sanitize(bookingRef)} | NIGOR 2Transport`,
        html: buildCustomerHtml(bookingRef, formData, calculatedPrice, currency),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        subject: `🚗 New Booking — ${sanitize(bookingRef)} — ${routeLabel(formData)}`,
        html: buildBusinessHtml(bookingRef, formData, calculatedPrice, currency),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ ok: true, emailError: String(err) });
  }
}
