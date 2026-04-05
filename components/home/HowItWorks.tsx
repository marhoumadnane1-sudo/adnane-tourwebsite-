"use client";

import { motion } from "framer-motion";
import { Search, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose Your Service",
    description: "Select airport transfer, city-to-city, or day hire. Enter your route, date, and number of passengers.",
    iconBg: "bg-terracotta/10",
    iconColor: "text-terracotta",
  },
  {
    number: "02",
    icon: Car,
    title: "Pick Your Vehicle",
    description: "Choose from Economy, Comfort, Minivan, or Sprinter. Your fixed all-inclusive price is shown instantly.",
    iconBg: "bg-gold/15",
    iconColor: "text-yellow-700",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Driver Meets You",
    description: "Your professional driver arrives on time. Pay on arrival or online. No hidden fees, ever.",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
];

export function HowItWorks() {
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
            Simple Process
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="section-subtitle">
            Book your transfer in under 2 minutes. No account required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only, behind the cards */}
          <div
            className="hidden md:block absolute top-[52px] h-px bg-gradient-to-r from-terracotta/20 via-gold/40 to-green-200 z-0 pointer-events-none"
            style={{ left: "18%", right: "18%" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-start">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl border border-sand shadow-card p-8"
                >
                  {/* Step label */}
                  <div className="text-xs font-bold text-charcoal/25 tracking-widest mb-3 uppercase">
                    Step {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${step.iconBg}`}>
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-sm text-charcoal/55 leading-relaxed">{step.description}</p>

                  {/* Mobile connector */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden w-px h-8 bg-terracotta/20 mx-auto mt-6" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
