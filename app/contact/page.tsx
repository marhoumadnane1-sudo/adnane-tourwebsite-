"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { CONTACT } from "@/lib/routes";
import { useTranslation } from "@/hooks/useTranslation";
import { usePlausible } from "@/hooks/usePlausible";

/* ── Zod schema ── */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(30, "Phone number is too long").optional(),
  subject: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/* ── Toast ── */
interface ToastItem {
  id: number;
  type: "success" | "error";
  message: string;
}

let toastId = 0;

function ToastContainer({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[];
  dismiss: (id: number) => void;
}) {
  return (
    <div
      className="fixed top-4 right-4 z-[70] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="alert"
            className={`flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg text-white text-sm font-medium max-w-xs pointer-events-auto ${
              t.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-1 hover:opacity-70 transition-opacity flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function addToast(type: "success" | "error", message: string, durationMs = 5000) {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => dismiss(id), durationMs);
  }

  function dismiss(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return { toasts, addToast, dismiss };
}

/* ── Main page ── */
export default function ContactPage() {
  const { t } = useTranslation();
  const { trackEvent } = usePlausible();
  const { toasts, addToast, dismiss } = useToast();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Bonjour NIGOR 2Transport! Je voudrais avoir plus d'informations sur vos services de transfert."
  )}`;

  async function onSubmit(data: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.error ?? "Failed to send. Please try WhatsApp instead.";
        addToast("error", msg);
        return;
      }

      trackEvent("contact_submitted");
      setSent(true);
      reset();
      addToast("success", "Message sent! We'll get back to you within a few hours.");
    } catch {
      addToast(
        "error",
        "Network error. Please check your connection or contact us via WhatsApp."
      );
    }
  }

  /* auto-dismiss success state after viewing it */
  useEffect(() => {
    if (!sent) return;
    const timer = setTimeout(() => setSent(false), 12_000);
    return () => clearTimeout(timer);
  }, [sent]);

  const contactItems = [
    {
      icon: MessageCircle,
      label: t("contact", "whatsappBtn"),
      value: CONTACT.phone,
      href: whatsappUrl,
      color: "bg-[#25D366]",
      external: true,
    },
    {
      icon: Phone,
      label: t("contact", "phone"),
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
      color: "bg-terracotta",
      external: false,
    },
    {
      icon: Mail,
      label: t("contact", "email"),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      color: "bg-blue-500",
      external: false,
    },
    {
      icon: Clock,
      label: t("contact", "hours"),
      value: CONTACT.hours,
      href: null,
      color: "bg-gold",
      external: false,
    },
    {
      icon: MapPin,
      label: t("contact", "address"),
      value: CONTACT.address,
      href: null,
      color: "bg-charcoal",
      external: false,
    },
  ];

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <div className="pt-20 min-h-screen bg-cream">
        {/* Hero */}
        <div className="bg-charcoal py-16 relative overflow-hidden">
          <div className="absolute inset-0 zellige-bg opacity-40" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-gold" aria-hidden="true" />
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("contact", "title")}
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              {t("contact", "subtitle")}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Contact Details</h2>

              {contactItems.map(({ icon: Icon, label, value, href, color, external }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-charcoal/40 text-xs uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="font-semibold text-charcoal hover:text-terracotta transition-colors"
                        aria-label={`${label}: ${value}`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp — fastest response"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 px-5 rounded-2xl transition-colors mt-4"
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>{t("contact", "whatsappBtn")} — Fastest Response</span>
              </a>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-sand-dark mt-2">
                <div
                  className="h-44 relative flex flex-col items-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #e8dcc8 0%, #d4c4a0 40%, #c8b890 60%, #b8a878 100%)",
                  }}
                >
                  <svg
                    viewBox="0 0 120 100"
                    className="w-24 h-20 text-charcoal/20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M30,10 L50,8 L70,12 L85,20 L90,35 L88,50 L80,65 L70,80 L60,90 L50,88 L40,78 L30,65 L22,50 L20,35 L25,20 Z" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-center shadow-sm">
                      <MapPin className="w-4 h-4 text-terracotta mx-auto mb-1" aria-hidden="true" />
                      <p className="text-charcoal font-semibold text-xs">Nationwide Coverage</p>
                      <p className="text-charcoal/50 text-[11px]">
                        Driver meets you at your location
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-sand/40 px-4 py-2.5 text-xs text-charcoal/50 text-center border-t border-sand">
                  We operate across all of Morocco — airports, hotels, riads &amp; private addresses
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-card p-10 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
                    <p className="text-charcoal/60">
                      Thank you for reaching out. We&apos;ll get back to you within a few hours.
                      For urgent inquiries, please contact us via WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-card p-8"
                  >
                    <h2 className="text-xl font-bold text-charcoal mb-6">Send a Message</h2>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-4"
                      aria-label="Contact form"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5"
                          >
                            {t("contact", "formName")} *
                          </label>
                          <input
                            id="contact-name"
                            {...register("name")}
                            placeholder="John Smith"
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={`input-field ${errors.name ? "border-red-400 focus:ring-red-400/30" : ""}`}
                          />
                          {errors.name && (
                            <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5"
                          >
                            {t("contact", "formEmail")} *
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            {...register("email")}
                            placeholder="john@email.com"
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={`input-field ${errors.email ? "border-red-400 focus:ring-red-400/30" : ""}`}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5"
                          >
                            {t("contact", "phone")}
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            {...register("phone")}
                            placeholder="+212 6XX XXX XXX"
                            className="input-field"
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label
                            htmlFor="contact-subject"
                            className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5"
                          >
                            Subject
                          </label>
                          <select
                            id="contact-subject"
                            {...register("subject")}
                            className="input-field"
                          >
                            <option value="">Select topic...</option>
                            <option value="Booking Inquiry">Booking Inquiry</option>
                            <option value="Price Quote">Price Quote</option>
                            <option value="Group Transfer">Group Transfer</option>
                            <option value="Modify/Cancel Booking">Modify/Cancel Booking</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5"
                        >
                          {t("contact", "formMessage")} *
                        </label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          {...register("message")}
                          placeholder="Tell us about your transfer needs — dates, route, number of passengers..."
                          aria-required="true"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={`input-field resize-none ${errors.message ? "border-red-400 focus:ring-red-400/30" : ""}`}
                        />
                        {errors.message && (
                          <p
                            id="message-error"
                            className="text-red-500 text-xs mt-1"
                            role="alert"
                          >
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-label={isSubmitting ? "Sending message..." : "Send message"}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            {t("contact", "formSend")}
                            <Send className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
