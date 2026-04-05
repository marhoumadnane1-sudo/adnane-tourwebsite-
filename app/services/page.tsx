import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Clock, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { AIRPORTS } from "@/lib/routes";
import { DAY_HIRE_PRICES, VEHICLES } from "@/lib/prices";
import { DAY_TRIP_ITINERARIES } from "@/lib/routes";
import { CityRouteTable } from "@/components/services/CityRouteTable";

export const metadata: Metadata = {
  title: "Services — Airport Transfers, City to City & Day Hire in Morocco",
  description:
    "Professional private transfers from Casablanca Mohammed V Airport (CMN), city-to-city rides from Casablanca, and private driver hire. Fixed prices, all-inclusive.",
};

function SectionHeader({ tag, title, description }: { tag: string; title: string; description: string }) {
  return (
    <div className="mb-12">
      <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
        <span className="w-6 h-px bg-terracotta" />
        {tag}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">{title}</h2>
      <p className="text-charcoal/60 text-lg max-w-2xl">{description}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <div className="bg-charcoal py-20 relative overflow-hidden">
        <div className="absolute inset-0 zellige-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold" />
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Every Transfer You Need in Morocco
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">
            From airport pickups to multi-day road trips — professional drivers, fixed prices, zero stress.
          </p>
          <Link href="/book" className="btn-primary text-base px-8 py-4">
            Book a Transfer <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Airport Transfers */}
      <section id="airport" className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Airport Transfers"
            title="Arrive & Depart Stress-Free"
            description="Professional meet-and-greet service at Casablanca Mohammed V Airport (CMN). Your driver tracks your flight — if it's delayed, he waits."
          />

          {/* Included features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Clock, title: "90 Min Free Wait", desc: "Counted from actual landing time, not scheduled" },
              { icon: Plane, title: "Flight Tracking", desc: "Real-time tracking for every flight — always up to date" },
              { icon: Shield, title: "Name Sign Meet", desc: "Your driver waits in arrivals with your name on a sign" },
              { icon: CheckCircle, title: "Free Cancellation", desc: "Cancel any time up to 24h before pickup, no charge" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-card">
                <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-terracotta" />
                </div>
                <h3 className="font-bold text-charcoal text-sm mb-1">{title}</h3>
                <p className="text-charcoal/50 text-xs">{desc}</p>
              </div>
            ))}
          </div>

          {/* Airports List */}
          <h3 className="text-xl font-bold text-charcoal mb-6">Airports We Serve</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {AIRPORTS.map((airport) => (
              <div key={airport.code} className="bg-white rounded-2xl p-5 shadow-card border border-sand/80 flex items-center gap-4">
                <div className="w-14 h-14 bg-charcoal rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm tracking-wider">{airport.code}</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal">{airport.fullName}</p>
                  <p className="text-charcoal/40 text-xs">{airport.city}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/book" className="btn-primary inline-flex">
            Book Airport Transfer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* City to City */}
      <section id="city-to-city" className="py-20 sm:py-28 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="City to City"
            title="Direct Private Rides Between Cities"
            description="No shared taxis. No bus stops. Direct, private, comfortable transfers from Casablanca to any major Moroccan city."
          />

          {/* Filterable Route Table */}
          <div className="mb-10">
            <CityRouteTable />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/prices" className="btn-secondary inline-flex">
              See Full Price List
            </Link>
            <Link href="/book" className="btn-primary inline-flex">
              Book City Transfer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Day Hire */}
      <section id="day-hire" className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Private Day Hire"
            title="Your Own Driver, Your Own Schedule"
            description="Hire a private driver for a half day, full day, or multiple days. Explore Morocco at your own pace, with a knowledgeable local guide behind the wheel."
          />

          {/* Duration options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { title: "Half Day", hours: "5 hours", desc: "Perfect for a morning excursion or afternoon city tour", from: 500 },
              { title: "Full Day", hours: "10 hours", desc: "Explore a full region or do a day trip to a nearby destination", from: 800 },
              { title: "2 Days", hours: "2 × 10h", desc: "5% multi-day discount — ideal for Sahara or Imperial Cities", from: 1520 },
              { title: "3+ Days", hours: "3+ × 10h", desc: "10% discount — best for complete Morocco road trips", from: 2160 },
            ].map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-bold text-charcoal text-base mb-1">{opt.title}</h3>
                <p className="text-terracotta font-semibold text-sm mb-2">{opt.hours}</p>
                <p className="text-charcoal/50 text-xs mb-4">{opt.desc}</p>
                <p className="text-charcoal/40 text-xs">Economy Sedan from</p>
                <p className="text-xl font-bold text-terracotta">{opt.from.toLocaleString("fr-MA")} DH</p>
              </div>
            ))}
          </div>

          {/* Day trip itineraries */}
          <h3 className="text-xl font-bold text-charcoal mb-6">Popular Day-Trip Itineraries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {DAY_TRIP_ITINERARIES.map((trip) => (
              <div key={trip.title} className="bg-white rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-terracotta/10 text-terracotta text-xs font-semibold px-2 py-1 rounded-lg">{trip.base}</span>
                  <span className="text-charcoal/40 text-xs">{trip.duration}</span>
                </div>
                <h4 className="font-bold text-charcoal text-sm mb-2">{trip.title}</h4>
                <p className="text-charcoal/55 text-xs mb-3">{trip.description}</p>
                <div className="flex flex-wrap gap-1">
                  {trip.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="text-[11px] bg-sand/60 text-charcoal/50 px-2 py-0.5 rounded-lg">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link href="/book" className="btn-primary inline-flex">
            Book Day Hire <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
