"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Luggage } from "lucide-react";
import { VEHICLES } from "@/lib/prices";
import VehicleImage from "@/components/ui/VehicleImage";

const CATEGORIES = ["Sedan", "Minivan", "Sprinter Van"] as const;

export function Fleet() {
  return (
    <section className="py-20 sm:py-28 bg-cream" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-terracotta" />
            Our Fleet
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h2 className="section-title mb-4">Choose Your Vehicle</h2>
          <p className="section-subtitle">
            From economy sedans to large Sprinter vans — every vehicle is air-conditioned, well-maintained, and driven by a licensed professional.
          </p>
        </motion.div>

        <div className="space-y-12">
          {CATEGORIES.map((category) => {
            const vehicles = VEHICLES.filter((v) => v.category === category);
            if (vehicles.length === 0) return null;

            return (
              <div key={category}>
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <h3 className="text-sm font-bold text-charcoal/40 uppercase tracking-widest whitespace-nowrap">{category}</h3>
                  <div className="flex-1 h-px bg-sand-dark" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle, i) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                      whileHover={{ y: -6 }}
                      className="card overflow-hidden group"
                    >
                      <div className="relative h-48 overflow-hidden bg-sand">
                        <VehicleImage
                          src={vehicle.image}
                          alt={vehicle.name}
                          bgColor={vehicle.bgColor}
                          category={vehicle.category}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent pointer-events-none" />
                        {vehicle.badge && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="bg-terracotta text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                              {vehicle.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-charcoal text-base mb-1">{vehicle.name}</h3>
                        <p className="text-charcoal/50 text-xs mb-3 leading-relaxed">{vehicle.description}</p>

                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-sand">
                          <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                            <Users className="w-3.5 h-3.5 text-terracotta" />
                            <span>Up to {vehicle.capacity} pax</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                            <Luggage className="w-3.5 h-3.5 text-terracotta" />
                            <span>{vehicle.luggage} bags</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {vehicle.features.slice(0, 3).map((f) => (
                            <span key={f} className="text-[11px] bg-sand/60 text-charcoal/60 px-2 py-1 rounded-lg">{f}</span>
                          ))}
                        </div>

                        <Link
                          href="/book"
                          className="block text-center text-sm font-semibold text-terracotta border border-terracotta/30 hover:bg-terracotta hover:text-white px-4 py-2.5 rounded-xl transition-all duration-200"
                        >
                          Book This Vehicle
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
