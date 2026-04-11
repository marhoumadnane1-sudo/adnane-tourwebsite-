"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error tracking service here if needed
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 relative overflow-hidden">
      {/* Moroccan pattern background */}
      <div className="absolute inset-0 zellige-bg opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative text-center max-w-lg mx-auto py-20">
        {/* Error icon */}
        <div className="w-20 h-20 bg-terracotta/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-card">
          <AlertTriangle className="w-10 h-10 text-terracotta" aria-hidden="true" />
        </div>

        {/* Decorative label */}
        <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-4">
          <span className="w-6 h-px bg-terracotta" aria-hidden="true" />
          Unexpected Error
          <span className="w-6 h-px bg-terracotta" aria-hidden="true" />
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3">
          Something went wrong
        </h1>
        <p className="text-charcoal/55 text-lg mb-8 leading-relaxed">
          We apologize for the inconvenience. This is likely a temporary issue —
          please try again or contact us if the problem persists.
        </p>

        {/* Error digest for support reference */}
        {error.digest && (
          <p className="text-charcoal/30 text-xs mb-8 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-glow"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-charcoal/20 hover:border-terracotta hover:text-terracotta text-charcoal font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </a>
        </div>

        {/* Contact fallback */}
        <p className="mt-8 text-charcoal/40 text-sm">
          Need help?{" "}
          <a
            href="https://wa.me/212661659607"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta hover:underline font-medium"
          >
            WhatsApp us
          </a>{" "}
          or call{" "}
          <a
            href="tel:+212661659607"
            className="text-terracotta hover:underline font-medium"
          >
            +212 661 659 607
          </a>
        </p>

        {/* Brand footer */}
        <div className="mt-10 flex items-center justify-center gap-3 text-charcoal/30 text-sm">
          <span className="w-8 h-px bg-charcoal/20" aria-hidden="true" />
          NIGOR 2Transport · Morocco
          <span className="w-8 h-px bg-charcoal/20" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
