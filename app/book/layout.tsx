import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Book a Transfer — NIGOR 2Transport Morocco",
  description:
    "Book your private airport transfer, city-to-city ride, or private day hire in Morocco in 3 easy steps. Fixed prices, professional drivers, available 24/7.",
  keywords: [
    "book Morocco transfer",
    "book CMN airport taxi",
    "réserver transfert aéroport Maroc",
    "book private driver Casablanca",
    "حجز سيارة خاصة المغرب",
  ],
  openGraph: {
    title: "Book Your Private Transfer in Morocco — NIGOR 2Transport",
    description:
      "3 simple steps. Fixed price guaranteed. Professional drivers 24/7 across Morocco.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Book Morocco private transfer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Morocco Private Transfer — Fixed Price, 24/7",
    description: "3 steps. Instant price. Professional drivers across all of Morocco.",
  },
  robots: { index: false, follow: true },
};

export default function BookLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
