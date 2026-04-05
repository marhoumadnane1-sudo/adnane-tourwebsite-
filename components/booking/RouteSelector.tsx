"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, MapPin, Car, Minus, Plus } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { AIRPORTS, CITIES } from "@/lib/routes";
import { t } from "@/lib/translations";
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
  if (data.serviceType === "airport" && !data.airportCode) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["airportCode"], message: "Please select an airport" });
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
  const { formData, updateFormData, language } = useBookingStore();
  const today = new Date().toISOString().split("T")[0];

  // Address fields managed outside RHF, written directly to store
  const [pickupAddress, setPickupAddress] = useState(formData.pickupAddress ?? "");
  const [dropoffAddress, setDropoffAddress] = useState(formData.dropoffAddress ?? "");

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

  const serviceType = watch("serviceType");
  const passengers = watch("passengers");
  const luggage = watch("luggage");
  const destinationAddress = watch("destinationAddress");
  const fromCity = watch("fromCity");
  const toCity = watch("toCity");

  function handleServiceChange(type: ServiceType) {
    setValue("serviceType", type);
    if (type !== "airport") { setValue("airportCode", ""); setValue("destinationAddress", ""); }
    if (type !== "city-to-city") { setValue("fromCity", ""); setValue("toCity", ""); }
    if (type !== "day-hire") { setValue("baseCity", ""); }
    setPickupAddress("");
    setDropoffAddress("");
  }

  function onSubmit(values: FormValues) {
    updateFormData({ ...values as any, pickupAddress, dropoffAddress });
    onNext();
  }

  const serviceOptions = [
    { id: "airport" as ServiceType, icon: Plane, label: t(language, "booking", "airportTransfer"), desc: "Arrive or depart from Casablanca Mohammed V Airport" },
    { id: "city-to-city" as ServiceType, icon: MapPin, label: t(language, "booking", "cityToCity"), desc: "Direct ride from Casablanca to any city" },
    { id: "day-hire" as ServiceType, icon: Car, label: t(language, "booking", "dayHire"), desc: "Your own driver for a half or full day" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* Service Type */}
      <div>
        <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          {t(language, "booking", "serviceType")}
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

      {/* Dynamic route fields */}
      <AnimatePresence mode="wait">
        <motion.div
          key={serviceType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {serviceType === "airport" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Airport</label>
                  <select {...register("airportCode")} className="input-field">
                    <option value="">Select airport...</option>
                    {AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code}>{a.code} — {a.name}, {a.city}</option>
                    ))}
                  </select>
                  {errors.airportCode && <p className="text-red-500 text-xs mt-1">{errors.airportCode.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                    {t(language, "booking", "direction")}
                  </label>
                  <select {...register("direction")} className="input-field">
                    <option value="arriving">{t(language, "booking", "arriving")} (Airport → Hotel)</option>
                    <option value="departing">{t(language, "booking", "departing")} (Hotel → Airport)</option>
                  </select>
                </div>
              </div>
              <AddressInput
                label="Pickup / Drop-off Address"
                placeholder="Hotel name, address, or paste Google Maps link..."
                value={destinationAddress ?? ""}
                onChange={(val) => setValue("destinationAddress", val)}
              />
            </>
          )}

          {serviceType === "city-to-city" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">From</label>
                  <select {...register("fromCity")} className="input-field">
                    <option value="">Select city...</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.fromCity && <p className="text-red-500 text-xs mt-1">{errors.fromCity.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">To</label>
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

          {serviceType === "day-hire" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Base City</label>
                  <select {...register("baseCity")} className="input-field">
                    <option value="">Select city...</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.baseCity && <p className="text-red-500 text-xs mt-1">{errors.baseCity.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">Duration</label>
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

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {t(language, "booking", "date")}
          </label>
          <input type="date" min={today} {...register("date")} className="input-field" />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {t(language, "booking", "time")}
          </label>
          <input type="time" {...register("time")} className="input-field" />
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
        </div>
      </div>

      {/* Passengers & Luggage */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
            {t(language, "booking", "passengers")}
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
            {t(language, "booking", "luggage")}
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

      <button type="submit" className="btn-primary w-full py-4 text-base">
        {t(language, "booking", "next")} — {t(language, "booking", "step2")}
      </button>
    </form>
  );
}
