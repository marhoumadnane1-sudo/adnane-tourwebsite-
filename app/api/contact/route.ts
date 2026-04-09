import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = "nigor2.car@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "NIGOR 2Transport <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: { name: string; email: string; phone?: string; subject?: string; message: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { name, email, phone, subject, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await Promise.all([
      // Auto-reply to sender
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "We received your message — NIGOR 2Transport",
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 16px;">
            <div style="background:#B5451B;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:22px;">Message Received</h1>
            </div>
            <div style="background:#fff;padding:32px;border:1px solid #e8e0d8;border-top:none;border-radius:0 0 12px 12px;">
              <p style="color:#3a3330;font-size:15px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
              <p style="color:#3a3330;font-size:15px;line-height:1.6;">
                Thank you for reaching out to NIGOR 2Transport. We have received your message and will get back to you within a few hours.
              </p>
              <p style="color:#3a3330;font-size:15px;line-height:1.6;">
                For urgent enquiries, message us directly on WhatsApp:
              </p>
              <div style="text-align:center;margin:24px 0;">
                <a href="https://wa.me/212661659607" style="background:#25D366;color:#fff;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;font-size:15px;">
                  Chat on WhatsApp
                </a>
              </div>
              <hr style="border:none;border-top:1px solid #e8e0d8;margin:24px 0;" />
              <p style="color:#aaa;font-size:12px;text-align:center;">
                NIGOR 2Transport · +212 661 659 607 · nigor2.car@gmail.com
              </p>
            </div>
          </div>`,
      }),
      // Alert to business
      resend.emails.send({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        subject: `📩 New Contact Message — ${subject || "General Enquiry"} — ${name}`,
        html: `
          <h2 style="color:#B5451B;">New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:8px 12px;background:#f5f0eb;font-weight:600;width:30%;">Name</td><td style="padding:8px 12px;">${name}</td></tr>
            <tr><td style="padding:8px 12px;background:#f5f0eb;font-weight:600;">Email</td><td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 12px;background:#f5f0eb;font-weight:600;">Phone</td><td style="padding:8px 12px;">${phone}</td></tr>` : ""}
            <tr><td style="padding:8px 12px;background:#f5f0eb;font-weight:600;">Subject</td><td style="padding:8px 12px;">${subject || "—"}</td></tr>
            <tr><td style="padding:8px 12px;background:#f5f0eb;font-weight:600;vertical-align:top;">Message</td><td style="padding:8px 12px;white-space:pre-wrap;">${message}</td></tr>
          </table>`,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
