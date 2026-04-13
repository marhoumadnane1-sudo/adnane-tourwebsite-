"use client";

import { Star } from "lucide-react";

const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    initials: "SM",
    avatarColor: "#4285F4",
    rating: 5,
    date: "March 2025",
    text: "Absolutely seamless transfer from Casablanca airport to Marrakech. Our driver was waiting right at arrivals with a sign, helped with all our luggage, and the car was spotless. The price was exactly what was quoted — no surprises. Highly recommend!",
  },
  {
    id: 2,
    name: "Pierre Durand",
    initials: "PD",
    avatarColor: "#EA4335",
    rating: 5,
    date: "February 2025",
    text: "Service impeccable pour notre trajet Fès - Chefchaouen. Le chauffeur était ponctuel, très agréable et connaissait parfaitement la route. Prix fixe, aucun supplément. Je recommande vivement NIGOR 2Transport !",
  },
  {
    id: 3,
    name: "Ahmed Karim",
    initials: "AK",
    avatarColor: "#34A853",
    rating: 5,
    date: "January 2025",
    text: "Excellent service, chauffeur professionnel et ponctuel. La voiture était très propre et confortable. Le prix affiché est le prix payé, sans mauvaise surprise. J'utilise ce service régulièrement pour mes déplacements professionnels.",
  },
  {
    id: 4,
    name: "Emma Schneider",
    initials: "ES",
    avatarColor: "#FBBC05",
    rating: 5,
    date: "April 2025",
    text: "We booked a 3-day private driver for our family trip through the Atlas Mountains. Flexible itinerary, comfortable Sprinter van, and our driver shared fascinating stories about Morocco. The multi-day discount made it exceptional value.",
  },
];

// Google G logo SVG
function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={s <= rating ? { fill: "#FBBC04", color: "#FBBC04" } : { color: "rgba(255,255,255,0.2)" }}
          className="w-3.5 h-3.5"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-charcoal relative overflow-hidden" id="reviews">
      {/* Background */}
      <div className="absolute inset-0 zellige-bg opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>

        {/* Google Reviews header */}
        <div className="text-center mb-12">
          {/* Google branding */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 mb-6">
            <GoogleIcon size={22} />
            <span className="text-white font-semibold text-sm tracking-wide">Google Reviews</span>
          </div>

          {/* Overall rating */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-white">4.9</span>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5" style={{ fill: "#FBBC04", color: "#FBBC04" }} />
                  ))}
                </div>
                <span className="text-white/50 text-sm">127 reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {GOOGLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-lg"
            >
              {/* Reviewer header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm leading-tight">{review.name}</p>
                    <p className="text-charcoal/40 text-xs">{review.date}</p>
                  </div>
                </div>
                <GoogleIcon size={18} />
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Review text */}
              <p className="text-charcoal/70 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
                <GoogleIcon size={13} />
                <span className="text-charcoal/30 text-xs">Posted on Google</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-50 text-charcoal font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md text-sm"
          >
            <GoogleIcon size={18} />
            See all reviews on Google
            <svg className="w-4 h-4 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
