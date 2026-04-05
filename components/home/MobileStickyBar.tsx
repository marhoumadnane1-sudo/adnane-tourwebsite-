"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { EUR_RATE } from "@/lib/prices";

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const { currency } = useBookingStore();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const priceFrom = currency === "EUR" ? `€${(300 / EUR_RATE).toFixed(0)}` : "300 DH";

  useEffect(() => {
    // Create a sentinel element at the bottom of the hero section
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when hero sentinel is NOT visible (user scrolled past hero)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-sand-dark shadow-[0_-4px_20px_rgba(0,0,0,0.12)] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-charcoal/50 leading-tight">Private transfer</p>
          <p className="text-charcoal font-bold text-sm leading-tight">
            From <span className="text-terracotta">{priceFrom}</span> per vehicle
          </p>
        </div>
        <Link
          href="/book"
          className="flex-shrink-0 flex items-center gap-1.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
        >
          Book Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {/* Safe area padding for iOS */}
      <div className="bg-white h-safe-bottom" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
