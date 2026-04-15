"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { POPULAR_ROUTES } from "@/lib/routes";
import { useBookingStore } from "@/lib/store";
import { EUR_RATE } from "@/lib/prices";

export function PopularRoutes() {
  const { currency } = useBookingStore();

  // Duplicate for seamless infinite loop
  const loopRoutes = [...POPULAR_ROUTES, ...POPULAR_ROUTES];

  return (
    <section className="py-20 sm:py-28 bg-sand/40 overflow-hidden" id="routes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-terracotta" />
              Most Booked
            </span>
            <h2 className="section-title">Popular Routes</h2>
          </div>
          <Link
            href="/prices"
            className="flex items-center gap-1.5 text-terracotta font-semibold text-sm hover:gap-2.5 transition-all"
          >
            View All Prices
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Ticker — full-width, CSS animated */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade masks — smaller on mobile */}
        <div className="absolute left-0 top-0 w-6 sm:w-16 md:w-32 h-full z-10 bg-gradient-to-r from-[#f0e6cc] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-6 sm:w-16 md:w-32 h-full z-10 bg-gradient-to-l from-[#f0e6cc] to-transparent pointer-events-none" />

        <div className="animate-scroll flex gap-4 w-max">
          {loopRoutes.map((route, idx) => {
            const vitoPrice =
              currency === "EUR"
                ? `€${(route.price / EUR_RATE).toFixed(0)}`
                : `${route.price.toLocaleString("fr-MA")} DH`;

            return (
              <div
                key={`${route.from}-${route.to}-${idx}`}
                className="bg-white rounded-2xl p-5 shadow-card w-[230px] flex-shrink-0 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-terracotta">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {route.serviceType === "airport" ? "Airport" : "City"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-charcoal/40 text-xs">
                    <Clock className="w-3 h-3" />
                    {route.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-bold text-charcoal text-sm leading-tight">{route.from}</p>
                  <div className="flex items-center gap-2 my-1.5">
                    <div className="flex-1 h-px bg-sand-dark" />
                    <ArrowRight className="w-3 h-3 text-charcoal/30" />
                    <div className="flex-1 h-px bg-sand-dark" />
                  </div>
                  <p className="font-bold text-charcoal text-sm leading-tight">{route.to}</p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xl font-bold text-terracotta">{vitoPrice}</p>
                    <p className="text-[10px] text-charcoal/40 leading-tight">Mercedes Vito</p>
                    <p className="text-[10px] text-charcoal/30 leading-tight">per vehicle</p>
                  </div>
                  <Link
                    href="/book"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:bg-terracotta group-hover:text-white"
                  >
                    Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-charcoal/40 text-xs mt-8"
        >
          Mercedes Vito prices shown (main vehicle) ·{" "}
          <span className="hidden sm:inline">Hover to pause · </span>
          All prices per vehicle, all-inclusive
        </motion.p>
      </div>
    </section>
  );
}
