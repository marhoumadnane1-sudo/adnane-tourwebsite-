"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/translations";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=90",
  "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=90",
  "https://images.unsplash.com/photo-1559087867-ce4c91325525?w=1920&q=90",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=90",
  "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1920&q=90",
];

const KEN_BURNS = [
  { scale: [1, 1.1], x: ["0%", "-3%"], y: ["0%", "-2%"] },
  { scale: [1.05, 1], x: ["-2%", "2%"], y: ["0%", "0%"] },
  { scale: [1, 1.08], x: ["2%", "0%"], y: ["-2%", "1%"] },
  { scale: [1.08, 1.02], x: ["0%", "-2%"], y: ["2%", "0%"] },
  { scale: [1, 1.1], x: ["-1%", "2%"], y: ["1%", "-2%"] },
];

function WordSplit({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { language } = useBookingStore();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex((i) => (i + 1) % BG_IMAGES.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const highlights: string[] =
    (t(language, "hero", "highlights") as any) ??
    ["Fixed price — no surprises", "Free 90-min wait at airports", "Pay on arrival or online", "Free cancellation"];

  const kb = KEN_BURNS[imgIndex];

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Ken Burns slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={imgIndex}
            className="absolute inset-0 will-change-transform"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: kb.scale as any,
              x: kb.x as any,
              y: kb.y as any,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 7, ease: "linear" },
              x: { duration: 7, ease: "linear" },
              y: { duration: 7, ease: "linear" },
            }}
          >
            <Image
              src={BG_IMAGES[imgIndex]}
              alt="Morocco landscape"
              fill
              priority={imgIndex === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Preload next image */}
        <div className="hidden">
          <Image
            src={BG_IMAGES[(imgIndex + 1) % BG_IMAGES.length]}
            alt=""
            width={1}
            height={1}
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent" />
      </div>

      {/* Moroccan pattern overlay */}
      <div className="absolute inset-0 z-[1] moroccan-pattern opacity-20" />

      {/* Ambient floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl z-[1] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gold/10 blur-3xl z-[1] pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Slide dots */}
      <div className="absolute bottom-32 right-8 z-20 flex flex-col gap-2">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIndex(i)}
            className={`rounded-full transition-all duration-400 ${
              i === imgIndex ? "w-1.5 h-6 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <motion.span
              className="w-2 h-2 bg-gold rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/90 text-sm font-medium">{t(language, "hero", "badge")}</span>
          </motion.div>

          {/* Headline — word-split */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            <WordSplit
              text={t(language, "hero", "title1") as string}
              delay={0.3}
            />
            {" "}
            <WordSplit
              text={t(language, "hero", "title2") as string}
              delay={0.45}
              className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300"
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t(language, "hero", "subtitle")}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.88 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8"
          >
            {(Array.isArray(highlights) ? highlights : []).map((item: string, i: number) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                className="flex items-center gap-1.5 text-white/70 text-sm"
              >
                <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/book" className="btn-primary text-base px-8 py-4 shadow-glow">
                {t(language, "hero", "bookBtn")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/prices" className="btn-ghost text-base px-8 py-4">
                {t(language, "hero", "pricesBtn")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="relative z-10 flex flex-col items-center pb-8 gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      <div id="hero-sentinel" className="absolute bottom-0 h-px w-full" />
    </div>
  );
}
