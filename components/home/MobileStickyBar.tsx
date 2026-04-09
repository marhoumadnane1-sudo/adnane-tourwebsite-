"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { EUR_RATE } from "@/lib/prices";

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const { currency } = useBookingStore();
  const pathname = usePathname();

  const priceFrom = currency === "EUR" ? `€${(400 / EUR_RATE).toFixed(0)}` : "400 DH";

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");

    if (!sentinel) {
      // Not on home page — show after user scrolls 80 px past the navbar
      const handleScroll = () => setVisible(window.scrollY > 80);
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // run once on mount
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Home page — show when the hero sentinel exits the viewport
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  // Never show on the booking page itself — user is already there
  if (pathname === "/book") return null;

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
      {/* iOS safe area */}
      <div className="bg-white" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
