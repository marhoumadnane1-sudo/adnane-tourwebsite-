"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 5000, suffix: "+", label: "Transfers Completed", decimals: 0 },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  { value: 24, suffix: "/7", label: "Hours Available", decimals: 0 },
  { value: 100, suffix: "%", label: "Fixed Price", decimals: 0 },
];

function Counter({ target, decimals, suffix }: { target: number; decimals: number; suffix: string }) {
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
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-white">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}
      <span className="text-gold">{suffix}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-charcoal py-12 sm:py-16 zellige-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-6"
            >
              <Counter target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              <p className="text-white/50 text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
