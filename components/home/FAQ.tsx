"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do prices include tolls, fuel and taxes?",
    a: "Yes — absolutely everything is included. The price you see is the price you pay. There are no hidden fees, no fuel surcharges, no toll charges, and no taxes added at the end. Our fixed price covers the complete journey door to door.",
  },
  {
    q: "What if my flight is delayed?",
    a: "Don't worry — we track all incoming flights in real time. Your driver will monitor your flight and adjust their arrival time accordingly. For airport pick-ups, we include 90 minutes of free waiting time from your scheduled landing. If your flight is seriously delayed, we'll contact you proactively.",
  },
  {
    q: "How do I pay?",
    a: "You can choose to pay on arrival (cash in MAD or EUR, or card) or pay online at the time of booking via our secure payment link. We accept Visa, Mastercard, and bank transfers. No payment is required to confirm your booking if you choose 'Pay on Arrival'.",
  },
  {
    q: "Can I cancel or modify a booking?",
    a: "Yes. Cancellations made more than 24 hours before your transfer are 100% free. Cancellations within 24 hours are charged at 50%. You can modify your booking (date, time, number of passengers) at any time for free, subject to availability. Contact us via WhatsApp or email for any changes.",
  },
  {
    q: "Is the price per person or per vehicle?",
    a: "The price is always per vehicle — not per person. Whether you're travelling alone or with 3 passengers in a sedan (or up to 14 in a Sprinter), you pay the same fixed price for the vehicle. This makes it much better value for groups and families compared to taxis or shared transfers.",
  },
  {
    q: "What vehicles are available and what's the capacity?",
    a: "We offer four vehicle types: Economy Sedan (Toyota Corolla / Dacia Logan, up to 3 pax + 3 bags), Comfort Sedan (Mercedes E-Class, up to 3 pax + 3 bags), Minivan (Toyota HiAce, up to 6 pax + 6 bags), and Sprinter Van (Mercedes Sprinter, up to 14 pax). All vehicles are air-conditioned and well-maintained.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
          <h2 className="section-title mb-3">Common Questions</h2>
          <p className="section-subtitle text-base">Everything you need to know before booking.</p>
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
