"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    country: "🇬🇧 United Kingdom",
    avatar: "SM",
    rating: 5,
    text: "Absolutely seamless transfer from Casablanca airport to Marrakech. Our driver Mohamed was waiting right at arrivals with a sign, helped with all our luggage, and the car was spotless. The price was exactly what was quoted — no surprises. Highly recommend!",
    route: "CMN → Marrakech",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Pierre Durand",
    country: "🇫🇷 France",
    avatar: "PD",
    rating: 5,
    text: "Nous avons utilisé NIGOR 2Transport pour un aller-retour Fès - Chefchaouen. Le chauffeur était ponctuel, connaissait parfaitement la route et était très agréable. Le van était climatisé et confortable. Prix fixe, aucun supplément. Parfait!",
    route: "Fez → Chefchaouen",
    date: "February 2025",
  },
  {
    id: 3,
    name: "David & Emma Kowalski",
    country: "🇩🇪 Germany",
    avatar: "DK",
    rating: 5,
    text: "We hired a private driver for 3 days to explore the Draa Valley and Sahara. The itinerary was flexible, the Mercedes Sprinter was comfortable for our group of 8, and the driver was knowledgeable about local history. Multi-day discount made it great value.",
    route: "Marrakech → Merzouga (3-day)",
    date: "January 2025",
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    country: "🇯🇵 Japan",
    avatar: "YT",
    rating: 5,
    text: "Our flight to RAK was delayed by 2 hours and the driver waited for us with no extra charge — exactly as promised. The transfer to our riad in the Medina was smooth despite the narrow streets. The driver knew a perfect shortcut. Will use again next trip!",
    route: "RAK Airport → Marrakech Medina",
    date: "April 2025",
  },
  {
    id: 5,
    name: "Carlos Mendez",
    country: "🇪🇸 Spain",
    avatar: "CM",
    rating: 5,
    text: "Used NIGOR 2Transport for the Agadir to Essaouira route. The comfort sedan was clean and the music selection was fantastic! The driver was on time, professional and pointed out beautiful viewpoints along the coast road. Fixed price is a huge plus — no haggling.",
    route: "Agadir → Essaouira",
    date: "March 2025",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 sm:py-28 bg-charcoal relative overflow-hidden" id="reviews">
      {/* Background pattern */}
      <div className="absolute inset-0 zellige-bg opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-gold" />
            Customer Stories
            <span className="w-6 h-px bg-gold" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Trusted by Travellers Worldwide</h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-gold text-gold" />
            ))}
            <span className="text-white/50 text-sm ml-2">4.9 average from 1,200+ reviews</span>
          </div>
        </motion.div>

        {/* Main testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <Quote className="w-10 h-10 text-terracotta mb-6 opacity-60" />

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-white/40 text-sm">{t.country} · {t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5 justify-end mb-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">{t.route}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-terracotta" : "w-4 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 bg-terracotta hover:bg-terracotta-dark rounded-xl flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
