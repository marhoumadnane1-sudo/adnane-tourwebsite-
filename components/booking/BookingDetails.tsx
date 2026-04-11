"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CreditCard, Banknote, MapPin, Calendar, Users, Car, AlertCircle } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { VEHICLES, EUR_RATE } from "@/lib/prices";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { PayPalButton } from "./PayPalButton";
import AddressInput from "@/components/ui/AddressInput";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  flightNumber: z.string().optional(),
  hotelAddress: z.string().min(3, "Please enter your hotel or address"),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(["online", "on-arrival"]),
  agreePolicy: z.literal(true, { errorMap: () => ({ message: "You must agree to the cancellation policy" }) }),
});

type FormValues = z.infer<typeof schema>;

function OrderSummary() {
  const { formData, calculatedPrice, currency } = useBookingStore();
  const { t } = useTranslation();
  const vehicle = VEHICLES.find((v) => v.id === formData.vehicleType);

  const priceDisplay = calculatedPrice
    ? currency === "EUR"
      ? `€${(calculatedPrice / EUR_RATE).toFixed(0)}`
      : `${calculatedPrice.toLocaleString("fr-MA")} DH`
    : "—";

  function routeLabel() {
    if (formData.serviceType === "airport") return `${formData.airportCode} ↔ ${formData.destinationAddress || "Hotel/Address"}`;
    if (formData.serviceType === "city-to-city") return `${formData.fromCity} → ${formData.toCity}`;
    return `${formData.baseCity} — ${formData.dayHireDuration?.replace("-", " ")}`;
  }

  return (
    <div className="bg-sand/40 rounded-2xl p-6 space-y-4" style={{ position: "sticky", top: "100px" }}>
      <h3 className="font-bold text-charcoal text-base">{t("booking", "orderSummary")}</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-charcoal/40 text-xs uppercase tracking-wider">Route</p>
            <p className="font-semibold text-charcoal">{routeLabel()}</p>
            {formData.pickupAddress && (
              <p className="text-charcoal/50 text-xs mt-0.5">📍 Pickup: {formData.pickupAddress}</p>
            )}
            {formData.dropoffAddress && (
              <p className="text-charcoal/50 text-xs mt-0.5">📍 Drop-off: {formData.dropoffAddress}</p>
            )}
          </div>
        </div>
        {formData.date && (
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-charcoal/40 text-xs uppercase tracking-wider">Date & Time</p>
              <p className="font-semibold text-charcoal">{formatDate(formData.date)} at {formData.time}</p>
            </div>
          </div>
        )}
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-charcoal/40 text-xs uppercase tracking-wider">{t("booking", "passengers")}</p>
            <p className="font-semibold text-charcoal">{formData.passengers} pax · {formData.luggage} bags</p>
          </div>
        </div>
        {vehicle && (
          <div className="flex items-start gap-2">
            <Car className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-charcoal/40 text-xs uppercase tracking-wider">Vehicle</p>
              <p className="font-semibold text-charcoal">{vehicle.name}</p>
              <p className="text-charcoal/40 text-xs">{vehicle.description}</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-sand-dark pt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-charcoal/60 text-sm">{t("booking", "total")}</span>
          <span className="text-2xl font-bold text-terracotta">{priceDisplay}</span>
        </div>
        <p className="text-charcoal/40 text-xs text-right">{t("booking", "allInclusive")}</p>
      </div>

      <div className="bg-terracotta/8 rounded-xl p-3 text-xs text-terracotta font-medium text-center">
        Free cancellation up to 24h before pickup
      </div>
    </div>
  );
}

interface BookingDetailsProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function BookingDetails({ onSubmit, onBack }: BookingDetailsProps) {
  const { formData, updateFormData, calculatedPrice } = useBookingStore();
  const { t } = useTranslation();
  const [showPayPal, setShowPayPal] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: formData.fullName ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
      flightNumber: formData.flightNumber ?? "",
      hotelAddress: formData.hotelAddress || formData.pickupAddress || "",
      specialRequests: formData.specialRequests ?? "",
      paymentMethod: formData.paymentMethod ?? "on-arrival",
      agreePolicy: undefined as any,
    },
  });

  const paymentMethod = watch("paymentMethod");
  const hotelAddress = watch("hotelAddress");

  function onFormSubmit(values: FormValues) {
    const { agreePolicy: _, ...rest } = values;
    updateFormData(rest as any);
    if (values.paymentMethod === "online") {
      setShowPayPal(true);
    } else {
      onSubmit();
    }
  }

  function handlePayPalSuccess(orderId: string) {
    updateFormData({ paypalOrderId: orderId } as any);
    onSubmit();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <form onSubmit={handleSubmit(onFormSubmit)} className="lg:col-span-3 space-y-6">
        <div>
          <h3 className="font-bold text-charcoal text-base mb-4">{t("booking", "step3")}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                {t("booking", "fullName")} *
              </label>
              <input {...register("fullName")} placeholder="John Smith" className="input-field" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  {t("booking", "email")} *
                </label>
                <input {...register("email")} type="email" placeholder="john@email.com" className="input-field" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  {t("booking", "phone")} * <span className="text-charcoal/30 normal-case font-normal">(used for confirmation)</span>
                </label>
                <input {...register("phone")} type="tel" placeholder="+212 6XX XXX XXX" className="input-field" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {formData.serviceType === "airport" && (
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  {t("booking", "flightNumber")}
                </label>
                <input {...register("flightNumber")} placeholder="e.g. AT 123, FR 456" className="input-field" />
              </div>
            )}

            <AddressInput
              label={`${formData.serviceType === "city-to-city" ? "Pickup Address" : t("booking", "hotel")} *`}
              placeholder={
                formData.serviceType === "city-to-city"
                  ? "Hotel, riad, or street address for pickup..."
                  : "Hotel name, riad, or full address..."
              }
              value={hotelAddress}
              onChange={(val) => setValue("hotelAddress", val, { shouldValidate: true })}
              error={errors.hotelAddress?.message}
            />

            <div>
              <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                {t("booking", "requests")}
              </label>
              <textarea {...register("specialRequests")} rows={3} placeholder="Child seat, extra stops, accessibility needs..." className="input-field resize-none" />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h3 className="font-bold text-charcoal text-base mb-4">{t("booking", "payment")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: "on-arrival", icon: Banknote, label: t("booking", "payOnArrival"), desc: "Cash or card when driver arrives" },
              { value: "online", icon: CreditCard, label: "Pay Online (PayPal)", desc: "Secure payment via PayPal" },
            ].map((opt) => {
              const Icon = opt.icon;
              const isSelected = paymentMethod === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setValue("paymentMethod", opt.value as any)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                    isSelected ? "border-terracotta bg-terracotta/5" : "border-sand-dark hover:border-terracotta/40"
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", isSelected ? "bg-terracotta" : "bg-sand")}>
                    <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-charcoal/50")} />
                  </div>
                  <div>
                    <p className={cn("font-semibold text-sm", isSelected ? "text-terracotta" : "text-charcoal")}>{opt.label}</p>
                    <p className="text-charcoal/40 text-xs">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Policy checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("agreePolicy")}
              className="mt-0.5 w-4 h-4 accent-terracotta rounded flex-shrink-0"
            />
            <span className="text-sm text-charcoal/60">
              I understand and agree to the{" "}
              <Link href="/policy" className="text-terracotta underline">cancellation policy</Link>
              : free cancellation up to 24 hours before pickup. 50% fee within 24 hours.
            </span>
          </label>
          {errors.agreePolicy && (
            <p className="text-red-500 text-xs mt-1 ml-7">{errors.agreePolicy.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn-secondary flex items-center gap-2 px-5 py-3.5">
            <ArrowLeft className="w-4 h-4" /> {t("booking", "back")}
          </button>
          <button type="submit" className="btn-primary flex-1 py-3.5 text-base">
            {t("booking", "confirm")}
          </button>
        </div>

        <p className="text-charcoal/40 text-xs text-center">
          Your personal data is used only to process your booking and is never shared with third parties.
        </p>
        <p className="text-xs text-charcoal/40 text-center">
          By booking, you agree to our{" "}
          <Link href="/policy" className="text-terracotta hover:underline">
            policies &amp; terms
          </Link>
        </p>
      </form>

      {/* PayPal payment overlay */}
      {showPayPal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-charcoal text-lg mb-1 text-center">Complete Payment</h3>
            <p className="text-charcoal/50 text-sm text-center mb-5">
              Pay securely with PayPal to confirm your booking
            </p>

            {calculatedPrice && (
              <div className="bg-sand/50 rounded-xl p-4 mb-5 text-center">
                <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">Total</p>
                <p className="text-2xl font-bold text-terracotta">
                  €{(calculatedPrice / EUR_RATE).toFixed(0)}
                </p>
                <p className="text-xs text-charcoal/30 mt-1">
                  {calculatedPrice.toLocaleString("fr-MA")} DH · all inclusive
                </p>
              </div>
            )}

            {paypalError && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{paypalError}</span>
              </div>
            )}

            {calculatedPrice && (
              <PayPalButton
                amountMAD={calculatedPrice}
                onSuccess={handlePayPalSuccess}
                onError={() => setPaypalError("Payment failed. Please try again or choose Pay on Arrival.")}
              />
            )}

            <button
              type="button"
              onClick={() => { setShowPayPal(false); setPaypalError(null); }}
              className="mt-4 w-full text-center text-sm text-charcoal/40 hover:text-charcoal transition-colors"
            >
              Cancel — go back
            </button>
          </div>
        </div>
      )}

      <div className="lg:col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
}
