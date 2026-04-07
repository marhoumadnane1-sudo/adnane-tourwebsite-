"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Plane, MapPin, Car, ArrowRight, Clock, Shield, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const serviceConfig = [
  {
    icon: Plane,
    titleKey: "airport",
    descKey: "airportDesc",
    features: ["90 min free wait time", "Real-time flight tracking", "Casablanca Mohammed V (CMN)"],
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    glowColor: "rgba(59,130,246,0.15)",
    href: "/services#airport",
    cta: "Book Airport Transfer",
  },
  {
    icon: MapPin,
    titleKey: "city",
    descKey: "cityDesc",
    features: ["Door-to-door service", "20+ routes available", "Fixed all-inclusive price"],
    color: "bg-terracotta/5",
    iconColor: "text-terracotta",
    glowColor: "rgba(181,69,27,0.15)",
    href: "/services#city-to-city",
    cta: "See All Routes",
    featured: true,
  },
  {
    icon: Car,
    titleKey: "day",
    descKey: "dayDesc",
    features: ["Half day from 500 DH", "Multiple day discounts", "Custom itineraries"],
    color: "bg-gold/10",
    iconColor: "text-gold-dark",
    glowColor: "rgba(212,168,67,0.15)",
    href: "/services#day-hire",
    cta: "Get a Quote",
  },
];

function TiltCard({ glowColor, featured, children }: { glowColor: string; featured?: boolean; children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    rawRotateY.set((dx / (rect.width / 2)) * 9);
    rawRotateX.set(-(dy / (rect.height / 2)) * 9);
    setShinePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, boxShadow: `0 20px 60px ${glowColor}` }}
      className={`card p-8 relative overflow-hidden group cursor-default ${
        featured ? "ring-2 ring-terracotta shadow-glow" : ""
      }`}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export function ServiceCards() {
  const { t } = useTranslation();

  const services = serviceConfig.map((s) => ({
    ...s,
    title: t("services", s.titleKey),
    desc: t("services", s.descKey),
  }));

  return (
    <section className="py-20 sm:py-28 bg-cream" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-terracotta" />
            {t("services", "title")}
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h2 className="section-title mb-4">{t("services", "subtitle")}</h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: 1200 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <TiltCard key={service.titleKey} glowColor={service.glowColor} featured={service.featured}>
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {t("booking", "mostPopular")}
                  </div>
                )}

                <motion.div
                  className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={`w-7 h-7 ${service.iconColor}`} />
                </motion.div>

                <h3 className="text-xl font-bold text-charcoal mb-3">{service.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-6">{service.desc}</p>

                <ul className="space-y-2.5 mb-8">
                  {service.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fi * 0.08 }}
                      className="flex items-center gap-2 text-sm text-charcoal/70"
                    >
                      <div className="w-5 h-5 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-terracotta rounded-full" />
                      </div>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="flex items-center gap-2 text-terracotta font-semibold text-sm group-hover:gap-3 transition-all duration-200"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </TiltCard>
            );
          })}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Shield, text: "100% Fixed Prices" },
            { icon: Clock, text: "24/7 Service" },
            { icon: Star, text: "4.9★ Rated" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-charcoal/50 text-sm font-medium">
              <Icon className="w-4 h-4 text-gold" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
