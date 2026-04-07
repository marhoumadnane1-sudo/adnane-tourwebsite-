"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Car, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const stepConfig = [
  {
    number: "01",
    icon: Search,
    titleKey: "step1Title",
    descKey: "step1Desc",
    iconBg: "bg-terracotta/10",
    iconColor: "text-terracotta",
    ringColor: "rgba(181,69,27,0.3)",
  },
  {
    number: "02",
    icon: Car,
    titleKey: "step2Title",
    descKey: "step2Desc",
    iconBg: "bg-gold/15",
    iconColor: "text-yellow-700",
    ringColor: "rgba(212,168,67,0.3)",
  },
  {
    number: "03",
    icon: CheckCircle,
    titleKey: "step3Title",
    descKey: "step3Desc",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    ringColor: "rgba(34,197,94,0.3)",
  },
];

function StepCard({ step, index, title, description }: { step: (typeof stepConfig)[0]; index: number; title: string; description: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 800 }}
      className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl border border-sand shadow-card p-8"
    >
      {/* Step label */}
      <div className="text-xs font-bold text-charcoal/25 tracking-widest mb-3 uppercase">
        Step {step.number}
      </div>

      {/* Icon with pulse rings */}
      <div className="relative mb-5">
        {[0, 1].map((ri) => (
          <motion.span
            key={ri}
            className="absolute inset-0 rounded-2xl"
            style={{ border: `2px solid ${step.ringColor}` }}
            initial={{ scale: 1, opacity: 0 }}
            animate={
              inView
                ? { scale: [1, 1.8, 1.8], opacity: [0, 0.6, 0] }
                : {}
            }
            transition={{
              duration: 1.8,
              delay: index * 0.18 + ri * 0.55,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <motion.div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.iconBg}`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ duration: 0.25 }}
        >
          <Icon className={`w-6 h-6 ${step.iconColor}`} />
        </motion.div>
      </div>

      <h3 className="text-lg font-bold text-charcoal mb-3">{title}</h3>
      <p className="text-sm text-charcoal/55 leading-relaxed">{description}</p>

      {index < stepConfig.length - 1 && (
        <div className="md:hidden w-px h-8 bg-terracotta/20 mx-auto mt-6" />
      )}
    </motion.div>
  );
}

export function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-80px" });
  const { t } = useTranslation();

  const steps = stepConfig.map((s) => ({
    ...s,
    title: t("howItWorks", s.titleKey),
    description: t("howItWorks", s.descKey),
  }));

  return (
    <section className="py-20 sm:py-28 bg-white" id="how-it-works">
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
            {t("howItWorks", "tag")}
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h2 className="section-title mb-4">{t("howItWorks", "title")}</h2>
          <p className="section-subtitle">
            {t("howItWorks", "subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative" ref={lineRef}>
          {/* Animated connector line — desktop only */}
          <div
            className="hidden md:block absolute top-[52px] h-px z-0 pointer-events-none overflow-hidden"
            style={{ left: "18%", right: "18%" }}
          >
            <div className="absolute inset-0 bg-sand-dark" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-terracotta/60 via-gold/60 to-green-400/60"
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-start">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
