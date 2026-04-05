"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Luggage, Check, ArrowLeft, AlertCircle } from "lucide-react";

import { useBookingStore } from "@/lib/store";
import { VEHICLES, calculatePrice, getCityRoutePrice, AIRPORT_PRICES, getDayHirePrice, EUR_RATE, VEHICLE_MULTIPLIERS, getRecommendedVehicle } from "@/lib/prices";
import { t } from "@/lib/translations";
import { cn } from "@/lib/utils";
import type { VehicleType } from "@/lib/types";
import VehicleImage from "@/components/ui/VehicleImage";

interface VehicleSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

function getPriceForFormData(formData: any, vehicleType: VehicleType): number {
  const service = formData.serviceType;
  if (service === "airport") {
    const match = AIRPORT_PRICES.find((p) =>
      p.airportCode === formData.airportCode &&
      (p.destination.toLowerCase().includes((formData.destinationAddress ?? "").toLowerCase().split(",")[0]) ||
       (formData.destinationAddress ?? "").toLowerCase().includes(p.destination.toLowerCase().split(" ")[0].toLowerCase()))
    );
    const base = match?.priceEconomy ?? 500;
    return Math.round(base * VEHICLE_MULTIPLIERS[vehicleType]);
  }
  if (service === "city-to-city") {
    const route = getCityRoutePrice(formData.fromCity ?? "", formData.toCity ?? "");
    const base = route?.priceEconomy ?? 0;
    return base > 0 ? Math.round(base * VEHICLE_MULTIPLIERS[vehicleType]) : 0;
  }
  if (service === "day-hire") {
    return getDayHirePrice(vehicleType, formData.dayHireDuration ?? "full-day");
  }
  return 0;
}

function hasValidRoute(formData: any): boolean {
  if (formData.serviceType === "airport") return !!formData.airportCode;
  if (formData.serviceType === "city-to-city") {
    const route = getCityRoutePrice(formData.fromCity ?? "", formData.toCity ?? "");
    return !!route;
  }
  if (formData.serviceType === "day-hire") return !!formData.baseCity;
  return false;
}

const CATEGORIES = ["Sedan", "Minivan", "Sprinter Van"] as const;

export function VehicleSelector({ onNext, onBack }: VehicleSelectorProps) {
  const { formData, updateFormData, setCalculatedPrice, currency, language } = useBookingStore();
  const recommended = getRecommendedVehicle(formData.passengers ?? 2);
  const [selected, setSelected] = useState<VehicleType>(formData.vehicleType ?? recommended);
  const routeValid = hasValidRoute(formData);

  function formatPrice(amount: number) {
    if (amount === 0) return "—";
    if (currency === "EUR") return `€${(amount / EUR_RATE).toFixed(0)}`;
    return `${amount.toLocaleString("fr-MA")} DH`;
  }

  function handleSelect(vehicleId: VehicleType) {
    setSelected(vehicleId);
    const price = getPriceForFormData(formData, vehicleId);
    setCalculatedPrice(price);
    updateFormData({ vehicleType: vehicleId });
  }

  function handleNext() {
    const price = getPriceForFormData(formData, selected);
    setCalculatedPrice(price);
    updateFormData({ vehicleType: selected });
    onNext();
  }

  useEffect(() => {
    const price = getPriceForFormData(formData, selected);
    setCalculatedPrice(price);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function routeLabel() {
    if (formData.serviceType === "airport") return `${formData.airportCode} ↔ ${formData.destinationAddress || "destination"}`;
    if (formData.serviceType === "city-to-city") return `${formData.fromCity} → ${formData.toCity}`;
    return `${formData.baseCity} — ${formData.dayHireDuration?.replace("-", " ")}`;
  }

  const currentPrice = getPriceForFormData(formData, selected);

  return (
    <div className="space-y-5">
      {/* Route summary bar */}
      <div className="bg-sand/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-sm text-charcoal/60">
          <span className="font-semibold text-charcoal">{routeLabel()}</span>
          <span className="mx-2">·</span>
          <span>{formData.passengers} pax</span>
          <span className="mx-2">·</span>
          <span>{VEHICLES.find((v) => v.id === selected)?.name}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selected}-${currentPrice}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="text-xl font-bold text-terracotta shrink-0"
          >
            {routeValid ? formatPrice(currentPrice) : <span className="text-sm text-charcoal/40">Select route first</span>}
          </motion.div>
        </AnimatePresence>
      </div>

      {!routeValid && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Please go back and complete your route selection to see accurate prices.
        </div>
      )}

      <div className="text-xs text-charcoal/40 mb-1">
        {t(language, "booking", "allInclusive")} · Showing vehicles for{" "}
        <span className="font-semibold text-charcoal">{formData.passengers} passenger{(formData.passengers ?? 1) > 1 ? "s" : ""}</span>.
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((category) => {
          const categoryVehicles = VEHICLES.filter((v) => v.category === category);
          if (categoryVehicles.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-charcoal/35 uppercase tracking-widest whitespace-nowrap">{category}</span>
                <div className="flex-1 h-px bg-sand-dark" />
              </div>

              <div className="space-y-3">
                {categoryVehicles.map((vehicle) => {
                  const price = getPriceForFormData(formData, vehicle.id);
                  const isSuitable = vehicle.capacity >= (formData.passengers ?? 1);
                  const isSelected = selected === vehicle.id;
                  const isRecommended = vehicle.id === recommended && isSuitable;

                  return (
                    <motion.button
                      key={vehicle.id}
                      type="button"
                      onClick={() => isSuitable && handleSelect(vehicle.id)}
                      disabled={!isSuitable}
                      whileHover={isSuitable ? { scale: 1.005 } : {}}
                      whileTap={isSuitable ? { scale: 0.995 } : {}}
                      className={cn(
                        "w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-200",
                        isSelected
                          ? "border-terracotta shadow-glow bg-white"
                          : isSuitable
                          ? "border-sand-dark hover:border-terracotta/40 bg-white"
                          : "border-sand bg-sand/30 opacity-40 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-stretch">
                        {/* Image */}
                        <div className="relative w-28 sm:w-40 flex-shrink-0 bg-sand overflow-hidden">
                          <VehicleImage
                            src={vehicle.image}
                            alt={vehicle.name}
                            bgColor={vehicle.bgColor}
                            category={vehicle.category}
                            sizes="(max-width: 640px) 112px, 160px"
                          />
                          {!isSuitable && (
                            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-charcoal/50 text-center px-1">Too small for {formData.passengers} pax</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                <h3 className={cn("font-bold text-sm sm:text-base", isSelected ? "text-terracotta" : "text-charcoal")}>
                                  {vehicle.name}
                                </h3>
                                {isSelected && (
                                  <span className="bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Selected</span>
                                )}
                                {isRecommended && !isSelected && (
                                  <span className="bg-gold/20 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/30">
                                    Recommended
                                  </span>
                                )}
                                {vehicle.badge && !isSelected && !isRecommended && (
                                  <span className="bg-charcoal/10 text-charcoal/50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {vehicle.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-charcoal/40 text-xs mb-2 leading-relaxed">{vehicle.description}</p>

                              <div className="flex items-center gap-3 mb-2">
                                <span className="flex items-center gap-1 text-xs text-charcoal/60">
                                  <Users className="w-3.5 h-3.5 text-terracotta" /> Up to {vehicle.capacity}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-charcoal/60">
                                  <Luggage className="w-3.5 h-3.5 text-terracotta" /> {vehicle.luggage} bags
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {vehicle.features.slice(0, 3).map((f) => (
                                  <span key={f} className="text-[11px] bg-sand/60 text-charcoal/55 px-2 py-0.5 rounded-lg">{f}</span>
                                ))}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              <div className={cn("text-xl sm:text-2xl font-bold", isSelected ? "text-terracotta" : "text-charcoal")}>
                                {formatPrice(price)}
                              </div>
                              <div className="text-[11px] text-charcoal/40">{t(language, "booking", "perVehicle")}</div>

                              {isSelected && (
                                <div className="mt-2 w-7 h-7 bg-terracotta rounded-full flex items-center justify-center ml-auto">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary flex items-center gap-2 px-5 py-3.5">
          <ArrowLeft className="w-4 h-4" /> {t(language, "booking", "back")}
        </button>
        <button type="button" onClick={handleNext} className="btn-primary flex-1 py-3.5 text-base">
          {t(language, "booking", "next")} — {t(language, "booking", "step3")}
        </button>
      </div>
    </div>
  );
}
