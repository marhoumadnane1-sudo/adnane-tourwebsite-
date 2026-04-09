"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { StepIndicator } from "@/components/booking/StepIndicator";
import { RouteSelector } from "@/components/booking/RouteSelector";
import { VehicleSelector } from "@/components/booking/VehicleSelector";
import { BookingDetails } from "@/components/booking/BookingDetails";
import { SuccessScreen } from "@/components/booking/SuccessScreen";
import { useBookingStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import { generateBookingRef } from "@/lib/utils";

const pageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

function BookingContent() {
  const { step, setStep, nextStep, prevStep, updateFormData, formData, calculatedPrice, currency } = useBookingStore();
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const STEPS = [
    { label: t("booking", "step1"), description: "Service & dates" },
    { label: t("booking", "step2"), description: "Choose your car" },
    { label: t("booking", "step3"), description: "Your information" },
  ];

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from && to) {
      updateFormData({ serviceType: "city-to-city", fromCity: from, toCity: to });
      setStep(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    const ref = generateBookingRef();
    setBookingRef(ref);
    // Fire-and-forget email confirmation — booking succeeds even if email fails
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingRef: ref, formData, calculatedPrice, currency }),
      });
    } catch (err) {
      console.error("Booking notification failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-sand/30 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!bookingRef ? (
          <>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-2">
                <span className="w-6 h-px bg-terracotta" />
                Book a Transfer
                <span className="w-6 h-px bg-terracotta" />
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal">
                Reserve Your Private Transfer
              </h1>
              <p className="text-charcoal/50 mt-2">Fixed prices · Professional drivers · 24/7 service</p>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <StepIndicator currentStep={step} steps={STEPS} />
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={pageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {step === 1 && <RouteSelector onNext={nextStep} />}
                  {step === 2 && <VehicleSelector onNext={nextStep} onBack={prevStep} />}
                  {step === 3 && <BookingDetails onSubmit={handleSubmit} onBack={prevStep} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-charcoal/40 text-xs">
              {["100% Fixed Price", "Free Cancellation 24h", "No Hidden Fees", "Secure Booking"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-8">
            <SuccessScreen bookingRef={bookingRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "test",
        currency: "EUR",
        intent: "capture",
      }}
    >
      <Suspense fallback={
        <div className="min-h-screen bg-sand/30 pt-24 pb-16 flex items-center justify-center">
          <div className="text-charcoal/40">Loading booking form...</div>
        </div>
      }>
        <BookingContent />
      </Suspense>
    </PayPalScriptProvider>
  );
}
