"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const statData = [
  { value: 5000, suffix: "+", labelKey: "transfers", decimals: 0 },
  { value: 4.9, suffix: "★", labelKey: "rating", decimals: 1 },
  { value: 24, suffix: "/7", labelKey: "available", decimals: 0 },
  { value: 100, suffix: "%", labelKey: "fixed", decimals: 0 },
];

function PulseRings({ inView }: { inView: boolean }) {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-gold/40"
          initial={{ scale: 1, opacity: 0 }}
          animate={inView ? { scale: [1, 2.4, 2.4], opacity: [0, 0.35, 0] } : {}}
          transition={{
            duration: 2.2,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

function Counter({
  target,
  decimals,
  suffix,
}: {
  target: number;
  decimals: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(target, increment * step);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      {/* Pulse rings anchor — sized to wrap the number */}
      <span className="relative inline-flex items-center justify-center">
        <PulseRings inView={inView} />
        <span className="relative text-4xl sm:text-5xl font-bold text-white">
          {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}
          <span className="text-gold">{suffix}</span>
        </span>
      </span>
    </div>
  );
}

export function Stats() {
  const { t } = useTranslation();

  const stats = [
    { value: 5000, suffix: "+", label: t("stats", "transfers"), decimals: 0 },
    { value: 4.9, suffix: "★", label: t("stats", "rating"), decimals: 1 },
    { value: 24, suffix: "/7", label: t("stats", "available"), decimals: 0 },
    { value: 100, suffix: "%", label: t("stats", "fixed"), decimals: 0 },
  ];

  return (
    <section className="bg-charcoal py-12 sm:py-16 zellige-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-6 py-4"
            >
              <Counter target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              <p className="text-white/50 text-sm mt-3 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
