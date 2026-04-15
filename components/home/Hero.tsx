"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { useTranslation } from "@/hooks/useTranslation";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=90",
    alt: "Morocco desert landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=90",
    alt: "Morocco medina streets",
  },
  {
    src: "https://images.unsplash.com/photo-1559087867-ce4c91325525?w=1920&q=90",
    alt: "Morocco architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=90",
    alt: "Morocco Atlas mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=90",
    alt: "Morocco coastal view",
  },
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

  const { t, tArr, isRTL } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const highlights = tArr("hero", "highlights");

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Slideshow — all slides mounted, only opacity toggles */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={75}
            />
          </div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-charcoal/70 z-[3]" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-transparent z-[3]" />
      </div>

      {/* Moroccan pattern overlay */}
      <div className="absolute inset-0 z-[4] moroccan-pattern opacity-20" />

      {/* Ambient floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl z-[4] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gold/10 blur-3xl z-[4] pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Accessibility: announce current slide */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Slide {currentSlide + 1} of {heroImages.length}
      </div>

      {/* Desktop slide dots — vertical right side */}
      <div className="absolute bottom-32 right-8 flex-col gap-3 hidden md:flex z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "h-6 bg-white"
                : "h-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentSlide ? "true" : undefined}
          />
        ))}
      </div>

      {/* Mobile slide dots — horizontal bottom center */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8"
      >
        <div className={`max-w-5xl mx-auto text-center${isRTL ? " rtl" : ""}`}>
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
            <span className="text-white/90 text-sm font-medium">{t("hero", "badge")}</span>
          </motion.div>

          {/* Headline — word-split */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            <WordSplit
              text={t("hero", "title1")}
              delay={0.3}
            />
            {" "}
            <WordSplit
              text={t("hero", "title2")}
              delay={0.45}
              className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-300"
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className={`text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed${isRTL ? " text-right" : ""}`}
          >
            {t("hero", "subtitle")}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.88 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8"
          >
            {highlights.map((item: string, i: number) => (
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
                {t("hero", "bookBtn")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/prices" className="btn-ghost text-base px-8 py-4">
                {t("hero", "pricesBtn")}
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
