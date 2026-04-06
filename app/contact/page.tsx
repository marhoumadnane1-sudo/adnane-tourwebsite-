"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import { CONTACT } from "@/lib/routes";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production this would send to an API endpoint
    setSent(true);
  }

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Bonjour NIGOR 2Transport! Je voudrais avoir plus d'informations sur vos services de transfert."
  )}`;

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-charcoal py-16 relative overflow-hidden">
        <div className="absolute inset-0 zellige-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold" />
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">We&apos;re Here 24/7</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Have a question? Need a custom quote? We respond within minutes on WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Contact Details</h2>
            </div>

            {[
              {
                icon: MessageCircle,
                label: "WhatsApp (fastest response)",
                value: CONTACT.phone,
                href: whatsappUrl,
                color: "bg-[#25D366]",
                external: true,
              },
              {
                icon: Phone,
                label: "Phone",
                value: CONTACT.phone,
                href: `tel:${CONTACT.phone}`,
                color: "bg-terracotta",
                external: false,
              },
              {
                icon: Mail,
                label: "Email",
                value: CONTACT.email,
                href: `mailto:${CONTACT.email}`,
                color: "bg-blue-500",
                external: false,
              },
              {
                icon: Clock,
                label: "Availability",
                value: CONTACT.hours,
                href: null,
                color: "bg-gold",
                external: false,
              },
              {
                icon: MapPin,
                label: "Address",
                value: CONTACT.address,
                href: null,
                color: "bg-charcoal",
                external: false,
              },
            ].map(({ icon: Icon, label, value, href, color, external }) => (
              <div key={label} className="flex items-start gap-4">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-charcoal/40 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="font-semibold text-charcoal hover:text-terracotta transition-colors"
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
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 px-5 rounded-2xl transition-colors mt-4"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chat on WhatsApp — Fastest Response</span>
            </a>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-sand-dark mt-2">
              <div
                className="h-44 relative flex flex-col items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #e8dcc8 0%, #d4c4a0 40%, #c8b890 60%, #b8a878 100%)",
                }}
              >
                {/* Stylized Morocco map silhouette */}
                <svg viewBox="0 0 120 100" className="w-24 h-20 text-charcoal/20" fill="currentColor">
                  <path d="M30,10 L50,8 L70,12 L85,20 L90,35 L88,50 L80,65 L70,80 L60,90 L50,88 L40,78 L30,65 L22,50 L20,35 L25,20 Z" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-center shadow-sm">
                    <MapPin className="w-4 h-4 text-terracotta mx-auto mb-1" />
                    <p className="text-charcoal font-semibold text-xs">Nationwide Coverage</p>
                    <p className="text-charcoal/50 text-[11px]">Driver meets you at your location</p>
                  </div>
                </div>
              </div>
              <div className="bg-sand/40 px-4 py-2.5 text-xs text-charcoal/50 text-center border-t border-sand">
                We operate across all of Morocco — airports, hotels, riads & private addresses
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-card p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
                <p className="text-charcoal/60">
                  Thank you for reaching out. We&apos;ll get back to you within a few hours.
                  For urgent inquiries, please contact us via WhatsApp.
                </p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-8">
                <h2 className="text-xl font-bold text-charcoal mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@email.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+212 6XX XXX XXX"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Select topic...</option>
                        <option>Booking Inquiry</option>
                        <option>Price Quote</option>
                        <option>Group Transfer</option>
                        <option>Modify/Cancel Booking</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your transfer needs — dates, route, number of passengers..."
                      className="input-field resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-base">
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
