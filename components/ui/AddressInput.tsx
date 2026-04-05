"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Clipboard, CheckCircle, X, ChevronRight } from "lucide-react";
import { MOROCCO_LOCATIONS } from "@/lib/locations";
import { cn } from "@/lib/utils";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

function detectMapLink(text: string): boolean {
  return (
    text.includes("maps.google") ||
    text.includes("maps.app.goo.gl") ||
    text.includes("goo.gl/maps") ||
    text.includes("google.com/maps") ||
    text.includes("maps.apple.com") ||
    /^-?\d+\.\d+,\s*-?\d+\.\d+$/.test(text.trim())
  );
}

const typeBadgeColor: Record<string, string> = {
  hotel: "bg-blue-50 text-blue-600",
  riad: "bg-amber-50 text-amber-700",
  airport: "bg-green-50 text-green-600",
  landmark: "bg-purple-50 text-purple-600",
  medina: "bg-orange-50 text-orange-600",
};

export default function AddressInput({
  value,
  onChange,
  placeholder = "Hotel name, address, or paste a Google Maps link...",
  label,
  error,
  className,
}: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<typeof MOROCCO_LOCATIONS>([]);
  const [open, setOpen] = useState(false);
  const [isMapLink, setIsMapLink] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pasteHint, setPasteHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setOpen(false);
      setIsMapLink(false);
      return;
    }
    if (detectMapLink(value)) {
      setIsMapLink(true);
      setOpen(false);
      setSuggestions([]);
      return;
    }
    setIsMapLink(false);
    const lower = value.toLowerCase();
    const filtered = MOROCCO_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(lower) ||
        loc.city.toLowerCase().includes(lower)
    ).slice(0, 7);
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

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        onChange(text.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      inputRef.current?.focus();
    } catch {
      // Clipboard permission denied — focus input so user can Ctrl+V manually
      inputRef.current?.focus();
      inputRef.current?.select();
      setPasteHint(true);
      setTimeout(() => setPasteHint(false), 3000);
    }
  };

  const handleSelect = (loc: typeof MOROCCO_LOCATIONS[0]) => {
    onChange(`${loc.name}, ${loc.city}`);
    setOpen(false);
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {label && (
        <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border bg-white transition-all duration-200",
          error
            ? "border-red-400 ring-1 ring-red-200"
            : "border-sand-dark focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20"
        )}
      >
        <MapPin className="w-4 h-4 text-charcoal/30 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={() => { onChange(""); setIsMapLink(false); setOpen(false); }}
            className="text-charcoal/25 hover:text-charcoal/50 transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={handlePasteFromClipboard}
          title="Paste from clipboard (Google Maps link)"
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border transition-all duration-200 flex-shrink-0",
            copied
              ? "bg-green-50 border-green-200 text-green-600"
              : "bg-sand/40 border-sand-dark text-charcoal/50 hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5"
          )}
        >
          {copied ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <Clipboard className="w-3 h-3" />
          )}
          <span className="hidden sm:inline">{copied ? "Pasted!" : "Paste Maps"}</span>
        </button>
      </div>

      {pasteHint && (
        <div className="mt-1.5 flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
          <span>Press <kbd className="font-mono font-bold">Ctrl+V</kbd> (or <kbd className="font-mono font-bold">⌘V</kbd>) to paste your Maps link.</span>
        </div>
      )}

      {isMapLink && value && (
        <div className="mt-1.5 flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700">
          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            <strong>Map location detected.</strong> Your driver will navigate directly to this location.
          </span>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {!value && !error && (
        <p className="mt-1 text-xs text-charcoal/40">
          Type your hotel name, or paste a Google Maps link for exact location.
        </p>
      )}

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white border border-sand-dark rounded-2xl shadow-card-hover overflow-hidden">
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-wider">Suggestions</p>
          </div>
          <ul className="max-h-64 overflow-y-auto pb-2">
            {suggestions.map((loc, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-sand/60 transition-colors text-left group"
                >
                  <MapPin className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{loc.name}</p>
                    <p className="text-xs text-charcoal/40">{loc.city}</p>
                  </div>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium capitalize flex-shrink-0", typeBadgeColor[loc.type])}>
                    {loc.type}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-charcoal/20 group-hover:text-terracotta transition-colors flex-shrink-0" />
                </button>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2.5 border-t border-sand/50 bg-sand/20">
            <p className="text-xs text-charcoal/40">
              Not listed? Type the full address or paste a Google Maps link above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
