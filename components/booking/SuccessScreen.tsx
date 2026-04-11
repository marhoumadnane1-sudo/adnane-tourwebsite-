"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Car, MapPin, Copy, Check, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useBookingStore } from "@/lib/store";
import { VEHICLES, EUR_RATE } from "@/lib/prices";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { CONTACT } from "@/lib/routes";

interface SuccessScreenProps {
  bookingRef: string;
}

export function SuccessScreen({ bookingRef }: SuccessScreenProps) {
  const { formData, calculatedPrice, currency, resetBooking } = useBookingStore();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Save booking to admin dashboard
  useEffect(() => {
    if (bookingRef && formData && calculatedPrice) {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef,
          ...formData,
          totalPrice: calculatedPrice,
        }),
      }).catch(console.error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingRef]);
  const vehicle = VEHICLES.find((v) => v.id === formData.vehicleType);

  const priceDisplay = calculatedPrice
    ? currency === "EUR"
      ? `€${(calculatedPrice / EUR_RATE).toFixed(0)}`
      : `${calculatedPrice.toLocaleString("fr-MA")} DH`
    : "—";

  function routeLabel() {
    if (formData.serviceType === "airport") return `${formData.airportCode} ↔ ${formData.destinationAddress}`;
    if (formData.serviceType === "city-to-city") return `${formData.fromCity} → ${formData.toCity}`;
    return `${formData.baseCity} — ${formData.dayHireDuration?.replace("-", " ")}`;
  }

  function copyRef() {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const serviceLabel =
    formData.serviceType === "airport" ? t("booking", "airportTransfer")
    : formData.serviceType === "city-to-city" ? t("booking", "cityToCity")
    : t("booking", "dayHire");

  const whatsappText = [
    `🚗 NIGOR 2Transport — New Booking`,
    `📋 Reference: ${bookingRef}`,
    ``,
    `🚀 Service: ${serviceLabel}`,
    formData.airportCode ? `✈️ Airport: ${formData.airportCode}` : "",
    formData.fromCity ? `📍 From: ${formData.fromCity}` : "",
    formData.toCity ? `📍 To: ${formData.toCity}` : "",
    formData.pickupAddress ? `🏨 Pickup: ${formData.pickupAddress}` : "",
    formData.dropoffAddress ? `🏨 Drop-off: ${formData.dropoffAddress}` : "",
    formData.destinationAddress && formData.serviceType === "airport"
      ? `🏨 Hotel/Address: ${formData.destinationAddress}` : "",
    `📅 Date: ${formatDate(formData.date ?? "")} at ${formData.time}`,
    `👥 Passengers: ${formData.passengers} · 🧳 Luggage: ${formData.luggage} pieces`,
    `🚙 Vehicle: ${vehicle?.name ?? formData.vehicleType}`,
    formData.flightNumber ? `✈️ Flight: ${formData.flightNumber}` : "",
    ``,
    `💰 Total: ${priceDisplay} (${formData.paymentMethod === "on-arrival" ? "Pay on arrival" : "Pay online"})`,
    ``,
    `👤 Client: ${formData.fullName}`,
    `📱 Phone: ${formData.phone}`,
    `📧 Email: ${formData.email}`,
    formData.specialRequests ? `📝 Notes: ${formData.specialRequests}` : "",
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-10 h-10 text-green-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-2xl font-bold text-charcoal mb-2"
        >
          {t("booking", "successTitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-charcoal/60"
        >
          Confirmation sent to <strong>{formData.email}</strong>.
          {" "}Tap the WhatsApp button below to get instant confirmation.
        </motion.p>
      </div>

      {/* Booking reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-charcoal rounded-2xl p-6 mb-5 text-center"
      >
        <p className="text-white/50 text-sm mb-2">{t("booking", "bookingRef")}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-black text-gold tracking-wider">{bookingRef}</span>
          <button
            onClick={copyRef}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-white/30 text-xs mt-2">Save this reference for any changes or queries</p>
      </motion.div>

      {/* Booking details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-sand-dark shadow-card p-6 mb-5 space-y-4"
      >
        <h3 className="font-bold text-charcoal">Booking Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-charcoal/40 text-xs">Route</p>
              <p className="font-semibold">{routeLabel()}</p>
              {formData.pickupAddress && (
                <p className="text-charcoal/50 text-xs mt-0.5">📍 {formData.pickupAddress}</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
            <div><p className="text-charcoal/40 text-xs">Date & Time</p><p className="font-semibold">{formatDate(formData.date ?? "")} at {formData.time}</p></div>
          </div>
          <div className="flex items-start gap-2">
            <Car className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
            <div><p className="text-charcoal/40 text-xs">Vehicle</p><p className="font-semibold">{vehicle?.name}</p></div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 mt-0.5 flex-shrink-0 text-terracotta font-bold text-sm">DH</div>
            <div>
              <p className="text-charcoal/40 text-xs">{t("booking", "total")}</p>
              <p className="font-bold text-terracotta text-base">{priceDisplay}</p>
              <p className="text-charcoal/30 text-xs">{formData.paymentMethod === "on-arrival" ? t("booking", "payOnArrival") : t("booking", "payOnline")}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-sand/50 rounded-2xl p-5 mb-6 space-y-3"
      >
        <h3 className="font-bold text-charcoal text-sm uppercase tracking-wider">What Happens Next?</h3>
        {[
          "Our team has received your booking and will confirm it shortly by WhatsApp or email",
          "Your driver's name and phone number will be sent to you 24 hours before pickup",
          "For airport pickups, your driver will be at arrivals with your name on a sign",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-terracotta rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
            <p className="text-charcoal/65 text-sm">{step}</p>
          </div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors text-base"
        >
          <MessageCircle className="w-5 h-5" />
          {t("booking", "whatsappConfirm")}
        </a>
        <Link
          href="/"
          onClick={resetBooking}
          className="flex-1 btn-secondary py-4 text-center"
        >
          {t("booking", "newBooking")}
        </Link>
      </motion.div>
    </motion.div>
  );
}
