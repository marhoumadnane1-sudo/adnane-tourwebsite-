"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useTranslation();

  const faqs = [
    { q: t("faq", "q1"), a: t("faq", "a1") },
    { q: t("faq", "q2"), a: t("faq", "a2") },
    { q: t("faq", "q3"), a: t("faq", "a3") },
    { q: t("faq", "q4"), a: t("faq", "a4") },
    { q: t("faq", "q5"), a: t("faq", "a5") },
  ];

  return (
    <section className="py-20 sm:py-28 bg-sand/30" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-terracotta" />
            FAQ
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h2 className="section-title mb-3">{t("faq", "title")}</h2>
          <p className="section-subtitle text-base">{t("faq", "subtitle")}</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn(
                "bg-white rounded-2xl overflow-hidden shadow-card transition-shadow duration-200",
                openIdx === i && "shadow-card-hover"
              )}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                aria-controls={`faq-panel-${i}`}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={cn(
                  "font-semibold text-sm sm:text-base transition-colors",
                  openIdx === i ? "text-terracotta" : "text-charcoal"
                )}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                    openIdx === i ? "bg-terracotta text-white" : "bg-sand text-charcoal/50"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-charcoal/65 text-sm leading-relaxed border-t border-sand">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
