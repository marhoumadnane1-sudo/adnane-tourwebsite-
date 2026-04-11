"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";

export const CONSENT_KEY = "n2t-cookie-consent";
export type ConsentStatus = "accepted" | "declined";

/** Load Plausible script after user consent */
function loadPlausible() {
  if (typeof window === "undefined") return;
  if (document.querySelector('script[data-domain="nigor2transport.ma"]')) return;
  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-domain", "nigor2transport.ma");
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(CONSENT_KEY);
  return val === "accepted" || val === "declined" ? val : null;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === "accepted") {
      loadPlausible();
      return;
    }
    if (!stored) {
      // Small delay so banner doesn't flash before hydration
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadPlausible();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
        >
          <div className="max-w-4xl mx-auto bg-charcoal text-white rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div
              className="w-10 h-10 bg-terracotta/20 rounded-xl flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <Cookie className="w-5 h-5 text-terracotta" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-1">We use cookies</p>
              <p className="text-white/60 text-xs leading-relaxed">
                We use anonymous analytics cookies to understand how visitors use our site and improve
                the booking experience. No personal data is sold or shared with third parties.{" "}
                <Link href="/policy" className="underline text-gold hover:text-gold/80 transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
                aria-label="Decline analytics cookies"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-auto px-5 py-2.5 rounded-xl text-sm font-semibold bg-terracotta hover:bg-terracotta/90 text-white transition-colors"
                aria-label="Accept analytics cookies"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
