"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, Star } from "lucide-react";
import { AIRPORT_TRANSFERS, CITY_ROUTES, DAY_HIRE_RATES, EUR_RATE } from "@/lib/prices";
import { AIRPORTS } from "@/lib/routes";
import { useBookingStore } from "@/lib/store";
import type { AirportCode, VehicleType } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "airport",  label: "Airport Transfers" },
  { id: "city",     label: "City to City" },
  { id: "dayhire",  label: "Day Hire" },
];

type ColKey = VehicleType;

const PRICE_COLUMNS: { key: ColKey; label: string; main?: boolean }[] = [
  { key: "skoda",      label: "Skoda Superb" },
  { key: "mercedes-e", label: "Mercedes E-Class" },
  { key: "vito",       label: "Mercedes Vito", main: true },
  { key: "sprinter",   label: "Mercedes Sprinter" },
];

function PriceCell({ price, currency }: { price: number; currency: "MAD" | "EUR" }) {
  const display =
    currency === "EUR"
      ? `€${(price / EUR_RATE).toFixed(0)}`
      : `${price.toLocaleString("fr-MA")} DH`;
  return <span className="font-bold text-terracotta">{display}</span>;
}

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState("airport");
  const [activeAirport, setActiveAirport] = useState<AirportCode>("CMN");
  const { currency, setCurrency, updateFormData } = useBookingStore();

  const airportRoutes = AIRPORT_TRANSFERS[activeAirport] ?? [];

  // Lowest skoda price for the note under each table
  const minSkoda = Math.min(...airportRoutes.map((r) => r.prices.skoda));
  const minEClass = Math.min(...airportRoutes.map((r) => r.prices["mercedes-e"]));
  const minSprinter = Math.min(...airportRoutes.map((r) => r.prices.sprinter));

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

          {/* Currency toggle */}
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
            {/* ── AIRPORT ── */}
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
                    <p className="text-charcoal/40 text-xs mt-1">Per vehicle · All-inclusive (tolls, fuel, taxes) · Both directions same price</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand/50 bg-sand/10">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Destination</th>
                          <th className="px-3 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center whitespace-nowrap">Time</th>
                          {PRICE_COLUMNS.map((col) => (
                            <th key={col.key} className={cn(
                              "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-center min-w-[100px] relative",
                              col.main ? "text-terracotta" : "text-charcoal/40"
                            )}>
                              {col.main && (
                                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full bg-terracotta text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-white" /> Most Popular
                                </span>
                              )}
                              {col.label}
                            </th>
                          ))}
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {airportRoutes.map((route, i) => (
                          <tr
                            key={route.city}
                            className={cn(
                              i < airportRoutes.length - 1 ? "border-b border-sand/30" : "",
                              "hover:bg-sand/20 transition-colors"
                            )}
                          >
                            <td className="px-6 py-4 font-semibold text-charcoal">{route.city}</td>
                            <td className="px-3 py-4 text-charcoal/40 text-center whitespace-nowrap">{route.duration}</td>
                            {PRICE_COLUMNS.map((col) => (
                              <td key={col.key} className={cn(
                                "px-4 py-4 text-center",
                                col.main && "bg-terracotta/5"
                              )}>
                                <PriceCell price={route.prices[col.key]} currency={currency} />
                              </td>
                            ))}
                            <td className="px-4 py-4">
                              <Link
                                href="/book"
                                onClick={() => updateFormData({ serviceType: "airport", airportCode: activeAirport, destinationAddress: route.city })}
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

                <p className="text-charcoal/40 text-xs mt-3 text-center">
                  Prices shown for Mercedes Vito (our main vehicle) ·{" "}
                  Skoda Superb from {currency === "EUR" ? `€${(minSkoda / EUR_RATE).toFixed(0)}` : `${minSkoda.toLocaleString("fr-MA")} DH`}{" "}·{" "}
                  Mercedes E-Class from {currency === "EUR" ? `€${(minEClass / EUR_RATE).toFixed(0)}` : `${minEClass.toLocaleString("fr-MA")} DH`}{" "}·{" "}
                  Sprinter from {currency === "EUR" ? `€${(minSprinter / EUR_RATE).toFixed(0)}` : `${minSprinter.toLocaleString("fr-MA")} DH`}
                </p>
              </div>
            )}

            {/* ── CITY TO CITY ── */}
            {activeTab === "city" && (
              <div>
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-sand bg-sand/30">
                    <h3 className="font-bold text-charcoal">City to City Transfer Prices</h3>
                    <p className="text-charcoal/40 text-xs mt-1">Per vehicle · Both directions same price · All-inclusive</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand/50 bg-sand/10">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Route</th>
                          <th className="px-3 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center whitespace-nowrap">km</th>
                          <th className="px-3 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center whitespace-nowrap">Time</th>
                          {PRICE_COLUMNS.map((col) => (
                            <th key={col.key} className={cn(
                              "px-3 py-3 text-xs font-semibold uppercase tracking-wider text-center min-w-[100px] relative",
                              col.main ? "text-terracotta" : "text-charcoal/40"
                            )}>
                              {col.main && (
                                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full bg-terracotta text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-white" /> Most Popular
                                </span>
                              )}
                              {col.label}
                            </th>
                          ))}
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {CITY_ROUTES.map((route, i) => (
                          <tr
                            key={`${route.from}-${route.to}`}
                            className={cn(
                              i < CITY_ROUTES.length - 1 ? "border-b border-sand/30" : "",
                              "hover:bg-sand/20 transition-colors"
                            )}
                          >
                            <td className="px-6 py-3 font-semibold text-charcoal whitespace-nowrap">{route.from} → {route.to}</td>
                            <td className="px-3 py-3 text-charcoal/40 text-center">{route.distance}</td>
                            <td className="px-3 py-3 text-charcoal/40 text-center whitespace-nowrap">{route.duration}</td>
                            {PRICE_COLUMNS.map((col) => (
                              <td key={col.key} className={cn(
                                "px-3 py-3 text-center",
                                col.main && "bg-terracotta/5"
                              )}>
                                <PriceCell price={route.prices[col.key]} currency={currency} />
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

                <p className="text-charcoal/40 text-xs mt-3 text-center">
                  Prices shown for Mercedes Vito (our main vehicle) · Skoda Superb from {currency === "EUR" ? `€${(700 / EUR_RATE).toFixed(0)}` : "700 DH"} · Mercedes E-Class from {currency === "EUR" ? `€${(1250 / EUR_RATE).toFixed(0)}` : "1,250 DH"} · Sprinter from {currency === "EUR" ? `€${(1550 / EUR_RATE).toFixed(0)}` : "1,550 DH"}
                </p>
              </div>
            )}

            {/* ── DAY HIRE ── */}
            {activeTab === "dayhire" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-sand bg-sand/30">
                    <h3 className="font-bold text-charcoal">Private Day Hire Prices</h3>
                    <p className="text-charcoal/40 text-xs mt-1">Per vehicle per day · Driver & fuel included · All-inclusive</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-sand/50 bg-sand/10">
                          <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Vehicle</th>
                          <th className="px-4 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[120px]">Half Day (5h)</th>
                          <th className="px-4 py-3 text-xs font-semibold text-charcoal/40 uppercase tracking-wider text-center min-w-[120px]">Full Day (10h)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(["skoda", "mercedes-e", "vito", "sprinter"] as VehicleType[]).map((v, i, arr) => {
                          const rates = DAY_HIRE_RATES[v];
                          const isMain = v === "vito";
                          const labels: Record<VehicleType, string> = {
                            skoda: "Skoda Superb",
                            "mercedes-e": "Mercedes E-Class",
                            vito: "Mercedes Vito",
                            sprinter: "Mercedes Sprinter",
                          };
                          return (
                            <tr key={v} className={cn(
                              i < arr.length - 1 ? "border-b border-sand/30" : "",
                              isMain && "bg-terracotta/5"
                            )}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-charcoal">{labels[v]}</p>
                                  {isMain && (
                                    <span className="flex items-center gap-0.5 bg-terracotta text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                      <Star className="w-2.5 h-2.5 fill-white" /> Main
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <PriceCell price={rates.halfDay} currency={currency} />
                              </td>
                              <td className="px-4 py-4 text-center">
                                <PriceCell price={rates.fullDay} currency={currency} />
                              </td>
                            </tr>
                          );
                        })}
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

                <p className="text-charcoal/40 text-xs mt-1 text-center">
                  Prices shown for Mercedes Vito (our main vehicle) · Skoda Superb half day from {currency === "EUR" ? `€${(1200 / EUR_RATE).toFixed(0)}` : "1,200 DH"} · Sprinter from {currency === "EUR" ? `€${(2000 / EUR_RATE).toFixed(0)}` : "2,000 DH"}
                </p>
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
