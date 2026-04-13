"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, MapPin, Car, Minus, Plus, Tag, ArrowRightLeft } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { AIRPORTS, CITIES } from "@/lib/routes";
import {
  AIRPORT_TRANSFERS,
  calculateAirportPrice,
  calculateCityPrice,
  getDayHirePrice,
  EUR_RATE,
} from "@/lib/prices";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import type { ServiceType, AirportCode } from "@/lib/types";
import AddressInput from "@/components/ui/AddressInput";

const schema = z.object({
  serviceType: z.enum(["airport", "city-to-city", "day-hire"]),
  airportCode: z.string().optional(),
  direction: z.enum(["arriving", "departing"]).optional(),
  destinationAddress: z.string().optional(),
  fromCity: z.string().optional(),
  toCity: z.string().optional(),
  baseCity: z.string().optional(),
  dayHireDuration: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  passengers: z.number().min(1).max(14),
  luggage: z.number().min(0).max(20),
}).superRefine((data, ctx) => {
  if (data.serviceType === "airport") {
    if (!data.airportCode) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["airportCode"], message: "Please select an airport" });
    }
    if (!data.destinationAddress) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["destinationAddress"], message: "Please select your destination city" });
    }
  }
  if (data.serviceType === "city-to-city" && !data.fromCity) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["fromCity"], message: "Please select departure city" });
  }
  if (data.serviceType === "city-to-city" && !data.toCity) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["toCity"], message: "Please select destination city" });
  }
  if (data.serviceType === "day-hire" && !data.baseCity) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["baseCity"], message: "Please select a city" });
  }
});

type FormValues = z.infer<typeof schema>;

interface RouteSelectorProps {
  onNext: () => void;
}

export function RouteSelector({ onNext }: RouteSelectorProps) {
  const { formData, updateFormData, currency } = useBookingStore();
  const { t, isRTL } = useTranslation();
  const today = new Date().toISOString().split("T")[0];

  // Address fields managed outside RHF, written directly to store
  const [pickupAddress, setPickupAddress] = useState(formData.pickupAddress ?? "");
  const [dropoffAddress, setDropoffAddress] = useState(formData.dropoffAddress ?? "");

  // Return trip state
  const [returnTrip, setReturnTrip] = useState(formData.returnTrip ?? false);
  const [returnDate, setReturnDate] = useState(formData.returnDate ?? "");
  const [returnTime, setReturnTime] = useState(formData.returnTime ?? "10:00");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: (formData.serviceType as ServiceType) ?? "airport",
      airportCode: formData.airportCode ?? "",
      direction: formData.direction ?? "arriving",
      destinationAddress: formData.destinationAddress ?? "",
      fromCity: formData.fromCity ?? "",
      toCity: formData.toCity ?? "",
      baseCity: formData.baseCity ?? "",
      dayHireDuration: formData.dayHireDuration ?? "full-day",
      date: formData.date ?? "",
      time: formData.time ?? "10:00",
      passengers: formData.passengers ?? 2,
      luggage: formData.luggage ?? 2,
    },
  });

  const serviceType    = watch("serviceType");
  const passengers     = watch("passengers");
  const luggage        = watch("luggage");
  const airportCode    = watch("airportCode");
  const destinationAddress = watch("destinationAddress");
  const fromCity       = watch("fromCity");
  const toCity         = watch("toCity");
  const dayHireDuration = watch("dayHireDuration");
  const outboundDate   = watch("date");

  // Cities available for the selected airport
  const airportCities = useMemo(
    () => (airportCode ? (AIRPORT_TRANSFERS[airportCode] ?? []).map((r) => r.city) : []),
    [airportCode]
  );

  // ── Live price preview (Vito = default recommended vehicle) ────────────────
  const previewPrice = useMemo<number | null>(() => {
    if (serviceType === "airport" && airportCode && destinationAddress) {
      const p = calculateAirportPrice(airportCode, destinationAddress, "vito");
      return p > 0 ? p : null;
    }
    if (serviceType === "city-to-city" && fromCity && toCity) {
      const p = calculateCityPrice(fromCity, toCity, "vito");
      return p > 0 ? p : null;
    }
    if (serviceType === "day-hire") {
      const p = getDayHirePrice("vito", dayHireDuration ?? "full-day");
      return p > 0 ? p : null;
    }
    return null;
  }, [serviceType, airportCode, destinationAddress, fromCity, toCity, dayHireDuration]);

  function formatPreviewPrice(amount: number) {
    if (currency === "EUR") return `€${(amount / EUR_RATE).toFixed(0)}`;
    return `${amount.toLocaleString("fr-MA")} DH`;
  }

  function handleServiceChange(type: ServiceType) {
    setValue("serviceType", type);
    if (type !== "airport")      { setValue("airportCode", ""); setValue("destinationAddress", ""); }
    if (type !== "city-to-city") { setValue("fromCity", ""); setValue("toCity", ""); }
    if (type !== "day-hire")     { setValue("baseCity", ""); }
    setPickupAddress("");
    setDropoffAddress("");
  }

  function onSubmit(values: FormValues) {
    const hasReturn = returnTrip && values.serviceType !== "day-hire";
    updateFormData({
      ...values as any,
      pickupAddress,
      dropoffAddress,
      returnTrip: hasReturn,
      returnDate: hasReturn ? returnDate : undefined,
      returnTime: hasReturn ? returnTime : undefined,
    });
    onNext();
  }

  const serviceOptions = [
    { id: "airport" as ServiceType,      icon: Plane,  label: t("booking", "airportTransfer"), desc: "Arrive or depart from Casablanca Mohammed V Airport" },
    { id: "city-to-city" as ServiceType, icon: MapPin, label: t("booking", "cityToCity"),      desc: "Direct ride between any two cities" },
    { id: "day-hire" as ServiceType,     icon: Car,    label: t("booking", "dayHire"),          desc: "Your own driver for a half or full day" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Service Type ──────────────────────────────────────────────────────── */}
      <div>
        <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          {t("booking", "serviceType")}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {serviceOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = serviceType === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => handleServiceChange(opt.id)}
                className={cn(
                  "flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                  isSelected
                    ? "border-terracotta bg-terracotta/5 shadow-glow"
                    : "border-sand-dark hover:border-terracotta/40 hover:bg-sand/40"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isSelected ? "bg-terracotta" : "bg-sand")}>
                  <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-charcoal/60")} />
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

      {/* ── Dynamic Route Fields ──────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={serviceType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* ── AIRPORT ────────────────────────────────────────────────────────── */}
          {serviceType === "airport" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Airport select */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Airport</label>
                  <select
                    {...register("airportCode")}
                    onChange={(e) => {
                      setValue("airportCode", e.target.value as AirportCode);
                      setValue("destinationAddress", ""); // reset city when airport changes
                    }}
                    className="input-field"
                  >
                    <option value="">Select airport...</option>
                    {AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code}>{a.code} — {a.name}</option>
                    ))}
                  </select>
                  {errors.airportCode && <p className="text-red-500 text-xs mt-1">{errors.airportCode.message}</p>}
                </div>

                {/* Direction */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                    {t("booking", "direction")}
                  </label>
                  <select {...register("direction")} className="input-field">
                    <option value="arriving">{t("booking", "arriving")}</option>
                    <option value="departing">{t("booking", "departing")}</option>
                  </select>
                </div>
              </div>

              {/* Destination city — clean select, no fuzzy match needed */}
              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  Destination City *
                </label>
                <select
                  {...register("destinationAddress")}
                  className="input-field"
                  disabled={!airportCode}
                >
                  <option value="">
                    {airportCode ? "Select your destination city..." : "Select airport first"}
                  </option>
                  {airportCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.destinationAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.destinationAddress.message}</p>
                )}
              </div>

              {/* Hotel / drop-off address — for driver, stored separately */}
              <AddressInput
                label="Hotel or Drop-off Address"
                placeholder="Hotel name, riad, or paste Google Maps link..."
                value={pickupAddress}
                onChange={setPickupAddress}
              />
            </>
          )}

          {/* ── CITY TO CITY ──────────────────────────────────────────────────── */}
          {serviceType === "city-to-city" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">{t("search", "fromCity")}</label>
                  <select {...register("fromCity")} className="input-field">
                    <option value="">Select city...</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.fromCity && <p className="text-red-500 text-xs mt-1">{errors.fromCity.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">{t("search", "toCity")}</label>
                  <select {...register("toCity")} className="input-field">
                    <option value="">Select city...</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.toCity && <p className="text-red-500 text-xs mt-1">{errors.toCity.message}</p>}
                </div>
              </div>
              <AddressInput
                label={`Exact pickup address${fromCity ? ` in ${fromCity}` : ""}`}
                placeholder="Hotel name, riad, or exact address..."
                value={pickupAddress}
                onChange={setPickupAddress}
              />
              <AddressInput
                label={`Exact drop-off address${toCity ? ` in ${toCity}` : ""}`}
                placeholder="Hotel name, riad, or exact address..."
                value={dropoffAddress}
                onChange={setDropoffAddress}
              />
            </div>
          )}

          {/* ── DAY HIRE ──────────────────────────────────────────────────────── */}
          {serviceType === "day-hire" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">{t("search", "baseCity")}</label>
                  <select {...register("baseCity")} className="input-field">
                    <option value="">Select city...</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.baseCity && <p className="text-red-500 text-xs mt-1">{errors.baseCity.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">{t("common", "duration")}</label>
                  <select {...register("dayHireDuration")} className="input-field">
                    <option value="half-day">Half Day (5 hours)</option>
                    <option value="full-day">Full Day (10 hours)</option>
                    <option value="2-days">2 Days (5% discount)</option>
                    <option value="3-plus-days">3+ Days (10% discount)</option>
                  </select>
                </div>
              </div>
              <AddressInput
                label="Start location"
                placeholder="Where should we pick you up?"
                value={pickupAddress}
                onChange={setPickupAddress}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Date & Time ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {returnTrip && serviceType !== "day-hire" ? "Outbound — Aller" : t("booking", "date")}
          </label>
          <input type="date" min={today} {...register("date")} className="input-field" />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {returnTrip && serviceType !== "day-hire" ? "Outbound Time — Heure aller" : t("booking", "time")}
            <span className="ml-1 text-charcoal/30 normal-case font-normal">(local Morocco time)</span>
          </label>
          <input type="time" {...register("time")} className="input-field" />
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
        </div>
      </div>

      {/* ── Return Trip Toggle ────────────────────────────────────────────────── */}
      {serviceType !== "day-hire" && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              const next = !returnTrip;
              setReturnTrip(next);
              if (!next) { setReturnDate(""); setReturnTime("10:00"); }
            }}
            className={cn(
              "w-full flex items-center justify-between gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200",
              returnTrip
                ? "border-terracotta bg-terracotta/5 shadow-glow"
                : "border-sand-dark hover:border-terracotta/40 hover:bg-sand/40"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", returnTrip ? "bg-terracotta" : "bg-sand")}>
                <ArrowRightLeft className={cn("w-5 h-5", returnTrip ? "text-white" : "text-charcoal/60")} />
              </div>
              <div>
                <p className={cn("font-semibold text-sm", returnTrip ? "text-terracotta" : "text-charcoal")}>
                  Return trip — Aller-retour
                </p>
                <p className="text-charcoal/40 text-xs">Add a return journey · Price × 2</p>
              </div>
            </div>
            <div className={cn(
              "w-11 h-6 rounded-full transition-all duration-200 flex items-center px-0.5 flex-shrink-0",
              returnTrip ? "bg-terracotta" : "bg-sand-dark"
            )}>
              <div className={cn(
                "w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                returnTrip ? "translate-x-5" : "translate-x-0"
              )} />
            </div>
          </button>

          <AnimatePresence>
            {returnTrip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                      Return Date — Retour *
                    </label>
                    <input
                      type="date"
                      min={outboundDate || today}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                      Return Time — Heure retour
                      <span className="ml-1 text-charcoal/30 normal-case font-normal">(Morocco time)</span>
                    </label>
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Passengers & Luggage ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {t("booking", "passengers")}
          </label>
          <div className="flex items-center gap-3 input-field">
            <button type="button" onClick={() => setValue("passengers", Math.max(1, passengers - 1))}
              className="w-7 h-7 bg-sand rounded-lg flex items-center justify-center hover:bg-sand-dark transition-colors flex-shrink-0">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="flex-1 text-center font-semibold text-charcoal">{passengers}</span>
            <button type="button" onClick={() => setValue("passengers", Math.min(14, passengers + 1))}
              className="w-7 h-7 bg-sand rounded-lg flex items-center justify-center hover:bg-sand-dark transition-colors flex-shrink-0">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {t("booking", "luggage")}
          </label>
          <div className="flex items-center gap-3 input-field">
            <button type="button" onClick={() => setValue("luggage", Math.max(0, luggage - 1))}
              className="w-7 h-7 bg-sand rounded-lg flex items-center justify-center hover:bg-sand-dark transition-colors flex-shrink-0">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="flex-1 text-center font-semibold text-charcoal">{luggage}</span>
            <button type="button" onClick={() => setValue("luggage", Math.min(20, luggage + 1))}
              className="w-7 h-7 bg-sand rounded-lg flex items-center justify-center hover:bg-sand-dark transition-colors flex-shrink-0">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Live Price Preview ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {previewPrice !== null && (
          <motion.div
            key="price-preview"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Tag className="w-4 h-4 text-terracotta" />
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">
                  {returnTrip ? "Estimated round-trip — Mercedes Vito" : "Estimated price — Mercedes Vito"}
                </p>
                <p className="text-xs text-charcoal/40 mt-0.5">
                  {returnTrip ? `Aller-retour · 2 × ${formatPreviewPrice(previewPrice)}` : "All-inclusive · Per vehicle · Fixed price — choose vehicle on next step"}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-terracotta">{formatPreviewPrice(returnTrip ? previewPrice * 2 : previewPrice)}</p>
              {currency === "MAD" && (
                <p className="text-xs text-charcoal/30">≈ €{((returnTrip ? previewPrice * 2 : previewPrice) / EUR_RATE).toFixed(0)}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" className="btn-primary w-full py-4 text-base">
        {t("booking", "next")} — {t("booking", "step2")}
      </button>
    </form>
  );
}
