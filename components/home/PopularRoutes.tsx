"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { POPULAR_ROUTES } from "@/lib/prices";
import { formatPrice } from "@/lib/utils";
import { useBookingStore } from "@/lib/store";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function PopularRoutes() {
  const { currency } = useBookingStore();
  const displayRoutes = POPULAR_ROUTES.slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-sand/40" id="routes">
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

        {/* Route Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {displayRoutes.map((route) => {
            const price = currency === "EUR"
              ? `€${(route.priceEconomy / 10.8).toFixed(0)}`
              : `${route.priceEconomy.toLocaleString("fr-MA")} DH`;

            return (
              <motion.div
                key={route.id}
                variants={cardVariants}
                whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(26, 26, 46, 0.12)" }}
                className="bg-white rounded-2xl p-5 shadow-card group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-terracotta">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Route</span>
                  </div>
                  <div className="flex items-center gap-1 text-charcoal/40 text-xs">
                    <Clock className="w-3 h-3" />
                    {route.durationText}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-bold text-charcoal text-base leading-tight">{route.from}</p>
                  <div className="flex items-center gap-2 my-1.5">
                    <div className="flex-1 h-px bg-sand-dark" />
                    <ArrowRight className="w-3 h-3 text-charcoal/30" />
                    <div className="flex-1 h-px bg-sand-dark" />
                  </div>
                  <p className="font-bold text-charcoal text-base leading-tight">{route.to}</p>
                </div>

                <div className="text-xs text-charcoal/40 mb-4">
                  {route.distanceKm} km · Economy Sedan
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-terracotta">{price}</p>
                    <p className="text-[11px] text-charcoal/40">per vehicle</p>
                  </div>
                  <Link
                    href={`/book?from=${route.from}&to=${route.to}`}
                    className="bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-terracotta group-hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-charcoal/40 text-xs mt-8"
        >
          Economy Sedan prices shown. Comfort, Minivan & Sprinter options available. All prices per vehicle, all-inclusive.
        </motion.p>
      </div>
    </section>
  );
}
