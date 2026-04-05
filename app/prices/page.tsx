"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { AIRPORT_PRICES, CITY_ROUTES, DAY_HIRE_PRICES, VEHICLE_MULTIPLIERS, EUR_RATE } from "@/lib/prices";
import { AIRPORTS } from "@/lib/routes";
import { useBookingStore } from "@/lib/store";
import type { AirportCode } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "airport", label: "Airport Transfers" },
  { id: "city", label: "City to City" },
  { id: "dayhire", label: "Day Hire" },
];

const VEHICLE_LABELS: Record<string, string> = {
  "skoda": "Skoda",
  "mercedes-e": "Mercedes E",
  "vito": "Vito (7)",
  "sprinter": "Sprinter (14)",
}
const PRICE_COLUMNS = ["skoda", "mercedes-e", "vito", "sprinter"] as const;;

function PriceBadge({ price, currency }: { price: number; currency: "MAD" | "EUR" }) {
  const display = currency === "EUR" ? `€${(price / EUR_RATE).toFixed(0)}` : `${price.toLocaleString("fr-MA")} DH`;
  return <span className="font-bold text-terracotta">{display}</span>;
}

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState("airport");
  const [activeAirport, setActiveAirport] = useState<AirportCode>("CMN");
  const { currency, setCurrency, updateFormData } = useBookingStore();

  const airportPrices = AIRPORT_PRICES.filter((p) => p.airportCode === activeAirport);

  function bookCityRoute(from: string, to: string) {
    updateFormData({ serviceType: "city-to-city", fromCity: from, toCity: to });
  }

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-charcoal py-16 relative overflow-hidden">
        <div className="absolute inset-0 zellige-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold" />
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Fixed Prices — No Surprises</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-6">
            All prices are per vehicle, all-inclusive. Tolls, fuel and taxes already included.
          </p>
          <div className="inline-flex items-center bg-terracotta/20 border border-terracotta/30 rounded-xl px-4 py-2 gap-2">
            <Info className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-white/80 text-sm">
              These are <strong>per vehicle</strong> prices — not per person. Great value for groups!
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-sand/60 rounded-2xl p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-white text-terracotta shadow-card"
                    : "text-charcoal/50 hover:text-charcoal"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Currency pill toggle */}
          <div className="flex items-center gap-1 bg-sand/60 rounded-full p-1 border border-sand-dark">
            <button
              onClick={() => setCurrency("MAD")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                currency === "MAD" ? "bg-terracotta text-white shadow-sm" : "text-charcoal/50 hover:text-charcoal"
              )}
            >
              🇲🇦 MAD (DH)
            </button>
            <button
              onClick={() => setCurrency("EUR")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                currency === "EUR" ? "bg-terracotta text-white shadow-sm" : "text-charcoal/50 hover:text-charcoal"
              )}
            >
              🇪🇺 EUR (€)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* AIRPORT */}
            {activeTab === "airport" && (
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {AIRPORTS.map((a) => (
                    <button
                      key={a.code}
                      onClick={() => setActiveAirport(a.code)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all",
                        activeAirport === a.code
                          ? "border-terracotta bg-terracotta text-white"
                          : "border-sand-dark text-charcoal/60 hover:border-terracotta/50"
                      )}
                    >
                      {a.code} — {a.city}
                    </button>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-sand bg-sand/30">
                    <h3 className="font-bold text-charcoal">
                      {AIRPORTS.find((a) => a.code === activeAirport)?.fullName} — Transfer Prices
                    </h3>
                    <p className="text-charcoal/40 text-xs mt-1">Per vehicle · All-inclusive · Economy prices shown</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand/50 bg-sand/10">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Destination</th>
                          {PRICE_COLUMNS.map((v) => (
                            <th key={v} className="px-4 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[90px]">
                              {VEHICLE_LABELS[v]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {airportPrices.map((p, i) => (
                          <tr key={p.destination} className={i < airportPrices.length - 1 ? "border-b border-sand/30" : ""}>
                            <td className="px-6 py-4 font-semibold text-charcoal">{p.destination}</td>
                            {PRICE_COLUMNS.map((v) => (
                              <td key={v} className="px-4 py-4 text-center">
                                <PriceBadge price={Math.round(p.priceEconomy * VEHICLE_MULTIPLIERS[v])} currency={currency} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-charcoal/40 text-xs mt-3 text-center">Select vehicle type at booking for exact quote · All prices per vehicle, all-inclusive</p>
              </div>
            )}

            {/* CITY TO CITY */}
            {activeTab === "city" && (
              <div>
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-sand bg-sand/30">
                    <h3 className="font-bold text-charcoal">City to City Transfer Prices</h3>
                    <p className="text-charcoal/40 text-xs mt-1">Per vehicle · Both directions same price</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand/50 bg-sand/10">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Route</th>
                          <th className="px-3 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center whitespace-nowrap">km</th>
                          <th className="px-3 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center whitespace-nowrap">Time</th>
                          {PRICE_COLUMNS.map((v) => (
                            <th key={v} className="px-3 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[80px]">
                              {VEHICLE_LABELS[v]}
                            </th>
                          ))}
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {CITY_ROUTES.map((route, i) => (
                          <tr key={route.id} className={i < CITY_ROUTES.length - 1 ? "border-b border-sand/30" : ""}>
                            <td className="px-6 py-3 font-semibold text-charcoal whitespace-nowrap">{route.from} → {route.to}</td>
                            <td className="px-3 py-3 text-charcoal/40 text-center">{route.distanceKm}</td>
                            <td className="px-3 py-3 text-charcoal/40 text-center whitespace-nowrap">{route.durationText}</td>
                            {PRICE_COLUMNS.map((v) => (
                              <td key={v} className="px-3 py-3 text-center">
                                <PriceBadge price={Math.round(route.priceEconomy * VEHICLE_MULTIPLIERS[v])} currency={currency} />
                              </td>
                            ))}
                            <td className="px-4 py-3">
                              <Link
                                href="/book"
                                onClick={() => bookCityRoute(route.from, route.to)}
                                className="text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                              >
                                Book
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-charcoal/40 text-xs mt-3 text-center">Economy prices shown · Select vehicle at booking for exact quote · All prices per vehicle</p>
              </div>
            )}

            {/* DAY HIRE */}
            {activeTab === "dayhire" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-sand bg-sand/30">
                    <h3 className="font-bold text-charcoal">Private Day Hire Prices</h3>
                    <p className="text-charcoal/40 text-xs mt-1">Per vehicle per day · Driver & fuel included</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand/50 bg-sand/10">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Vehicle</th>
                          <th className="px-4 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[110px]">Half Day (5h)</th>
                          <th className="px-4 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[110px]">Full Day (10h)</th>
                          <th className="px-4 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[90px]">Extra Hour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DAY_HIRE_PRICES.map((p, i) => (
                          <tr key={p.vehicle} className={i < DAY_HIRE_PRICES.length - 1 ? "border-b border-sand/30" : ""}>
                            <td className="px-6 py-4">
                              <p className="font-semibold text-charcoal capitalize">{VEHICLE_LABELS[p.vehicle] ?? p.vehicle}</p>
                            </td>
                            <td className="px-4 py-4 text-center"><PriceBadge price={p.halfDay} currency={currency} /></td>
                            <td className="px-4 py-4 text-center"><PriceBadge price={p.fullDay} currency={currency} /></td>
                            <td className="px-4 py-4 text-center"><PriceBadge price={p.extraHour} currency={currency} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-charcoal text-sm mb-1">Multi-Day Discounts</h4>
                    <p className="text-charcoal/50 text-xs">Automatically applied at checkout</p>
                  </div>
                  <div className="flex gap-6 sm:ml-auto">
                    <div className="text-center">
                      <span className="text-2xl font-black text-terracotta">5%</span>
                      <p className="text-charcoal/50 text-xs">2 days</p>
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-black text-terracotta">10%</span>
                      <p className="text-charcoal/50 text-xs">3+ days</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-12 bg-charcoal rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Ready to Book?</h3>
          <p className="text-white/50 mb-6">Use our booking form for instant price calculation and confirmation.</p>
          <Link href="/book" className="btn-primary inline-flex text-base px-8 py-4">
            Book a Transfer <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
