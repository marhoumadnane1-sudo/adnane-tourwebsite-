"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/translations";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { language } = useBookingStore();

  const highlights: string[] = (t(language, "hero", "highlights") as any) ??
    ['Fixed price — no surprises', 'Free 90-min wait at airports', 'Pay on arrival or online', 'Free cancellation'];

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=90"
          alt="Moroccan architecture and landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 z-[1] moroccan-pattern opacity-20" />

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-white/90 text-sm font-medium">{t(language, "hero", "badge")}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            {t(language, "hero", "title1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300">
              {t(language, "hero", "title2")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t(language, "hero", "subtitle")}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8"
          >
            {(Array.isArray(highlights) ? highlights : []).map((item: string) => (
              <div key={item} className="flex items-center gap-1.5 text-white/70 text-sm">
                <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/book" className="btn-primary text-base px-8 py-4 shadow-glow">
              {t(language, "hero", "bookBtn")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/prices" className="btn-ghost text-base px-8 py-4">
              {t(language, "hero", "pricesBtn")}
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="relative z-10 flex flex-col items-center pb-8 gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      {/* Sentinel for mobile sticky bar visibility */}
      <div id="hero-sentinel" className="absolute bottom-0 h-px w-full" />
    </div>
  );
}
