"use client";

import { useTranslation } from "@/hooks/useTranslation";

const STATS = [
  { value: "5,000", suffix: "+", labelKey: "transfers", fallback: "Transfers Completed" },
  { value: "4.9",   suffix: "★", labelKey: "rating",    fallback: "Average Rating" },
  { value: "24",    suffix: "/7", labelKey: "available", fallback: "Hours Available" },
  { value: "100",   suffix: "%", labelKey: "fixed",     fallback: "Fixed Price Guaranteed" },
];

export function Stats() {
  const { t } = useTranslation();

  return (
    <section className="bg-charcoal py-12 sm:py-16 zellige-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {STATS.map((stat) => (
            <div key={stat.labelKey} className="text-center px-6 py-4">
              <span className="block text-4xl sm:text-5xl font-bold text-white">
                {stat.value}<span className="text-gold">{stat.suffix}</span>
              </span>
              <p className="text-white/50 text-sm mt-3 font-medium">
                {t("stats", stat.labelKey) || stat.fallback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
