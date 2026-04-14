"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, MapPin, Clock, ArrowRight, Building2 } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { AIRPORTS, CITIES } from "@/lib/routes";
import { MOROCCO_LOCATIONS } from "@/lib/locations";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import type { AirportCode } from "@/lib/types";

type Tab = "airport" | "city" | "dayhire";

type Suggestion = { name: string; city: string; type: string };

// Build a combined list: cities + airports + locations
const ALL_DESTINATIONS: Suggestion[] = [
  ...CITIES.map((c) => ({ name: c.name, city: c.region ?? "Morocco", type: "city" })),
  ...AIRPORTS.map((a) => ({ name: `${a.fullName}`, city: a.city, type: "airport" })),
  ...MOROCCO_LOCATIONS,
];

const POPULAR_DESTINATIONS: Suggestion[] = [
  { name: "Casablanca", city: "Casablanca-Settat", type: "city" },
  { name: "Marrakech", city: "Marrakech-Safi", type: "city" },
  { name: "Fez", city: "Fès-Meknès", type: "city" },
  { name: "Agadir", city: "Souss-Massa", type: "city" },
  { name: "Tangier", city: "Tanger-Tétouan-Al Hoceïma", type: "city" },
  { name: "Chefchaouen", city: "Tanger-Tétouan-Al Hoceïma", type: "city" },
];

const typeIcon = { city: Building2, airport: Plane };

function DestinationInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim().length < 1) { setSuggestions([]); return; }
    const lower = value.toLowerCase().trim();
    const filtered = ALL_DESTINATIONS.filter(
      (loc) => loc.name.toLowerCase().includes(lower) || loc.city.toLowerCase().includes(lower)
    ).slice(0, 8);
    setSuggestions(filtered);
    setOpen(filtered.length > 0);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleFocus() {
    if (suggestions.length > 0) {
      setOpen(true);
    } else if (value.trim().length === 0) {
      setSuggestions(POPULAR_DESTINATIONS);
      setOpen(true);
    }
  }

  function handleSelect(loc: Suggestion) {
    const label = loc.type === "city" || loc.type === "airport" ? loc.name : `${loc.name}, ${loc.city}`;
    onChange(label);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        className="w-full bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
        autoComplete="off"
      />
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-sand-dark rounded-2xl shadow-card-hover overflow-hidden">
          {value.trim().length === 0 && (
            <div className="px-4 pt-2 pb-1 text-[10px] font-semibold text-charcoal/40 uppercase tracking-wider">Popular destinations</div>
          )}
          <ul className="max-h-60 overflow-y-auto py-1.5">
            {suggestions.map((loc, i) => {
              const Icon = typeIcon[loc.type as keyof typeof typeIcon] ?? MapPin;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleSelect(loc)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-sand/60 transition-colors text-left"
                  >
                    <Icon className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{loc.name}</p>
                      <p className="text-xs text-charcoal/40">{loc.city}</p>
                    </div>
                    <span className="text-[10px] text-charcoal/40 capitalize flex-shrink-0">{loc.type}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SearchBar() {
  const router = useRouter();
  const { updateFormData } = useBookingStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("airport");
  const [airport, setAirport] = useState("");
  const [destination, setDestination] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [baseCity, setBaseCity] = useState("");
  const [duration, setDuration] = useState("full-day");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(2);

  const today = new Date().toISOString().split("T")[0];

  function handleSearch() {
    if (activeTab === "airport") {
      updateFormData({ serviceType: "airport", airportCode: airport as AirportCode, destinationAddress: destination, date, passengers });
    } else if (activeTab === "city") {
      updateFormData({ serviceType: "city-to-city", fromCity, toCity, date, passengers });
    } else {
      updateFormData({ serviceType: "day-hire", baseCity, dayHireDuration: duration as any, date, passengers });
    }
    router.push("/book");
  }

  const tabs = [
    { id: "airport" as Tab, label: t("search", "airportTab"), icon: Plane },
    { id: "city" as Tab, label: t("search", "cityTab"), icon: MapPin },
    { id: "dayhire" as Tab, label: t("search", "dayTab"), icon: Clock },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto" id="search-bar">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        {/* Tabs */}
        <div className="flex border-b border-white/10 rounded-t-2xl overflow-hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-terracotta text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Fields */}
        <div className="p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3"
            >
              {activeTab === "airport" && (
                <>
                  <select
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}
                    className="flex-1 min-w-[160px] bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
                  >
                    <option value="">{t("search", "selectAirport")}</option>
                    {AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code}>{a.code} — {a.name}</option>
                    ))}
                  </select>
                  <div className="flex-1 min-w-[180px]">
                    <DestinationInput
                      value={destination}
                      onChange={setDestination}
                      placeholder={t("search", "destinationCity")}
                    />
                  </div>
                </>
              )}

              {activeTab === "city" && (
                <>
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="flex-1 bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
                  >
                    <option value="">{t("search", "fromCity")}</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="flex-1 bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
                  >
                    <option value="">{t("search", "toCity")}</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </>
              )}

              {activeTab === "dayhire" && (
                <>
                  <select
                    value={baseCity}
                    onChange={(e) => setBaseCity(e.target.value)}
                    className="flex-1 bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
                  >
                    <option value="">{t("search", "baseCity")}</option>
                    {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="flex-1 bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
                  >
                    <option value="half-day">Half Day (5h)</option>
                    <option value="full-day">Full Day (10h)</option>
                    <option value="2-days">2 Days</option>
                    <option value="3-plus-days">3+ Days</option>
                  </select>
                </>
              )}

              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0 min-w-[140px]"
              />

              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="bg-white/90 rounded-xl px-4 py-3 text-charcoal text-sm font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/50 border-0"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? t("search", "passenger") : t("search", "passengers")}</option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-glow flex items-center gap-2 whitespace-nowrap"
              >
                {t("search", "getPrice")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
