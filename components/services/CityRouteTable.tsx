"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CITY_ROUTES } from "@/lib/prices";
import { useBookingStore } from "@/lib/store";
import { EUR_RATE } from "@/lib/prices";

export function CityRouteTable() {
  const [query, setQuery] = useState("");
  const { currency, updateFormData } = useBookingStore();

  const filtered = CITY_ROUTES.filter(
    (r) =>
      r.from.toLowerCase().includes(query.toLowerCase()) ||
      r.to.toLowerCase().includes(query.toLowerCase())
  );

  function formatPrice(p: number) {
    return currency === "EUR" ? `€${(p / EUR_RATE).toFixed(0)}` : `${p.toLocaleString("fr-MA")} DH`;
  }

  return (
    <div>
      {/* Search filter */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          type="text"
          placeholder="Filter by city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-sand-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-3 border-b border-sand bg-sand/30 grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 text-xs font-semibold text-charcoal/40 uppercase tracking-wider">
          <span>Route</span>
          <span className="text-center min-w-[55px]">km</span>
          <span className="text-center min-w-[55px]">Time</span>
          <span className="text-center min-w-[90px]">From (Economy)</span>
          <span className="w-16"></span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-10 text-center text-charcoal/40 text-sm">
            No routes found for &quot;{query}&quot;
          </div>
        ) : (
          filtered.map((route, i) => (
            <div
              key={route.id}
              className={`grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 items-center px-6 py-4 ${i < filtered.length - 1 ? "border-b border-sand/30" : ""}`}
            >
              <span className="font-semibold text-charcoal text-sm">{route.from} → {route.to}</span>
              <span className="text-charcoal/40 text-xs text-center min-w-[55px]">{route.distanceKm}</span>
              <span className="text-charcoal/40 text-xs text-center min-w-[55px]">{route.durationText}</span>
              <span className="text-center min-w-[90px]">
                <span className="font-bold text-terracotta text-sm">{formatPrice(route.priceEconomy)}</span>
              </span>
              <div className="w-16">
                <Link
                  href="/book"
                  onClick={() => updateFormData({ serviceType: "city-to-city", fromCity: route.from, toCity: route.to })}
                  className="text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-dark px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Book
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
