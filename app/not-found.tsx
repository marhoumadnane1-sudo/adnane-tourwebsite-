import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | NIGOR 2Transport",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 relative overflow-hidden">
      {/* Moroccan pattern background */}
      <div className="absolute inset-0 zellige-bg opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative text-center max-w-lg mx-auto py-20">
        {/* Giant 404 with icon overlay */}
        <div className="relative mb-6 select-none" aria-hidden="true">
          <div className="text-[9rem] sm:text-[12rem] font-black text-terracotta/10 leading-none tracking-tighter">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-terracotta/10 rounded-3xl flex items-center justify-center shadow-card">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 sm:w-12 sm:h-12 text-terracotta/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Decorative label */}
        <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-4">
          <span className="w-6 h-px bg-terracotta" aria-hidden="true" />
          Page Not Found
          <span className="w-6 h-px bg-terracotta" aria-hidden="true" />
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3">
          Lost somewhere in Morocco?
        </h1>
        <p className="text-charcoal/55 text-lg mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us transfer you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-glow"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Return Home
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 border-2 border-charcoal/20 hover:border-terracotta hover:text-terracotta text-charcoal font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Book a Transfer
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Brand footer */}
        <div className="mt-14 flex items-center justify-center gap-3 text-charcoal/30 text-sm">
          <span className="w-8 h-px bg-charcoal/20" aria-hidden="true" />
          NIGOR 2Transport · Morocco
          <span className="w-8 h-px bg-charcoal/20" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
