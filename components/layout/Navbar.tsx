"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/lib/store";
import { t, type Lang } from "@/lib/translations";

const languages: { code: Lang; label: string; full: string }[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "fr", label: "FR", full: "Français" },
  { code: "ar", label: "AR", full: "العربية" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { currency, setCurrency, language, setLanguage } = useBookingStore();

  const navLinks = [
    { href: "/", label: t(language, "nav", "home") },
    { href: "/about", label: t(language, "nav", "about") },
    { href: "/services", label: t(language, "nav", "services") },
    { href: "/prices", label: t(language, "nav", "prices") },
    { href: "/contact", label: t(language, "nav", "contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isAr = language === "ar";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-sand-dark/30"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-terracotta rounded-xl flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn(
                "text-lg font-bold tracking-tight transition-colors",
                scrolled || !isHome ? "text-charcoal" : "text-white"
              )}>
                NIGOR 2Transport
              </span>
              <span className={cn(
                "text-[10px] font-medium tracking-widest uppercase transition-colors hidden xs:block",
                scrolled || !isHome ? "text-terracotta" : "text-gold"
              )}>
                Premium Transfers
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-orange-50 text-terracotta"
                    : scrolled || !isHome
                    ? "text-charcoal/70 hover:text-charcoal hover:bg-sand/60"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Currency Toggle */}
            <button
              onClick={() => setCurrency(currency === "MAD" ? "EUR" : "MAD")}
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all",
                scrolled || !isHome
                  ? "border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta"
                  : "border-white/30 text-white/80 hover:border-white hover:text-white"
              )}
            >
              {currency === "MAD" ? "DH → €" : "€ → DH"}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all",
                  scrolled || !isHome
                    ? "text-charcoal/70 hover:text-charcoal hover:bg-sand/60"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <Globe className="w-4 h-4" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "absolute top-full mt-2 bg-white rounded-xl shadow-card-hover border border-sand-dark/30 py-1 w-36 z-50",
                      isAr ? "left-0" : "right-0"
                    )}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm transition-colors",
                          language === lang.code
                            ? "text-terracotta font-semibold bg-terracotta/5"
                            : "text-charcoal/70 hover:text-charcoal hover:bg-sand/40"
                        )}
                        dir={lang.code === "ar" ? "rtl" : "ltr"}
                      >
                        {lang.full}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/book" className="btn-primary text-sm px-5 py-2.5">
              {t(language, "nav", "bookNow")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled || !isHome
                ? "text-charcoal hover:bg-sand/60"
                : "text-white hover:bg-white/10"
            )}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-sand-dark/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-orange-50 text-terracotta"
                      : "text-charcoal/70 hover:bg-sand/60 hover:text-charcoal"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile controls row */}
              <div className="pt-3 flex items-center gap-2">
                <button
                  onClick={() => setCurrency(currency === "MAD" ? "EUR" : "MAD")}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-sand-dark text-charcoal/70 hover:border-terracotta hover:text-terracotta transition-all whitespace-nowrap"
                >
                  {currency === "MAD" ? "DH → €" : "€ → DH"}
                </button>
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 btn-primary text-sm py-2 text-center"
                >
                  {t(language, "nav", "bookNow")}
                </Link>
              </div>

              {/* Language pills */}
              <div className="flex gap-2 pt-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-semibold transition-colors",
                      language === lang.code
                        ? "bg-terracotta/10 text-terracotta"
                        : "text-charcoal/50 hover:bg-sand/60"
                    )}
                    dir={lang.code === "ar" ? "rtl" : "ltr"}
                  >
                    {lang.full}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
