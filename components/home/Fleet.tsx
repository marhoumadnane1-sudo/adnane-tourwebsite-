"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Luggage } from "lucide-react";
import { VEHICLES } from "@/lib/prices";
import VehicleImage from "@/components/ui/VehicleImage";
import { useTranslation } from "@/hooks/useTranslation";

const CATEGORIES = ["Sedan", "Minivan", "Sprinter Van"] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Fleet() {
  const { t } = useTranslation();

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
          <h2 className="section-title mb-4">{t("fleet", "title")}</h2>
          <p className="section-subtitle">
            {t("fleet", "subtitle")}
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <h3 className="text-sm font-bold text-charcoal/40 uppercase tracking-widest whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="flex-1 h-px bg-sand-dark" />
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {vehicles.map((vehicle) => (
                    <motion.div
                      key={vehicle.id}
                      variants={cardVariants}
                      whileHover={{ y: -8, boxShadow: "0 16px 50px rgba(26,26,46,0.14)" }}
                      className="card overflow-hidden group"
                    >
                      {/* Image container with zoom on hover */}
                      <div className="relative h-48 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f1318 0%, #1a1f2e 60%, #111827 100%)" }}>
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: 1.07 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <VehicleImage
                            src={vehicle.image}
                            alt={vehicle.name}
                            bgColor={vehicle.bgColor}
                            category={vehicle.category}
                          />
                        </motion.div>
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
                            <span>Up to {vehicle.capacity} {t("fleet", "passengers")}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                            <Luggage className="w-3.5 h-3.5 text-terracotta" />
                            <span>{vehicle.luggage} {t("fleet", "bags")}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {vehicle.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="text-[11px] bg-sand/60 text-charcoal/60 px-2 py-1 rounded-lg"
                            >
                              {f}
                            </span>
                          ))}
                        </div>

                        <Link
                          href="/book"
                          className="block text-center text-sm font-semibold text-terracotta border border-terracotta/30 hover:bg-terracotta hover:text-white px-4 py-2.5 rounded-xl transition-all duration-200"
                        >
                          {t("fleet", "book")}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
