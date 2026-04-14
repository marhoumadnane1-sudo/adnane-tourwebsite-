import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { StatsWrapper } from "@/components/home/StatsWrapper";
import { ServiceCards } from "@/components/home/ServiceCards";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BlogTeaser } from "@/components/home/BlogTeaser";

const Fleet = dynamic(() => import("@/components/home/Fleet").then(m => ({ default: m.Fleet })));
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(m => ({ default: m.Testimonials })), { ssr: false });
const Team = dynamic(() => import("@/components/home/Team").then(m => ({ default: m.Team })));
const FAQ = dynamic(() => import("@/components/home/FAQ").then(m => ({ default: m.FAQ })));

export const metadata: Metadata = {
  title: "NIGOR 2Transport — Private Transfers Across Morocco",
  description:
    "Book fixed-price private airport transfers, city-to-city rides and private driver hire across Morocco. All-inclusive prices, professional drivers, 24/7 service.",
  keywords: [
    "Morocco private transfer",
    "CMN airport taxi",
    "Casablanca airport transfer",
    "transfert aéroport Casablanca",
    "taxi privé Maroc",
    "نقل خاص المغرب",
    "private driver Morocco",
  ],
  openGraph: {
    title: "NIGOR 2Transport — Private Transfers Across Morocco",
    description: "Fixed-price private transfers from CMN airport to any Moroccan city. Professional drivers, 24/7 service, all-inclusive pricing.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "NIGOR 2Transport Morocco — Private Transfer Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIGOR 2Transport — Private Transfers Across Morocco",
    description: "Fixed prices, professional drivers, 24/7. Airport transfers & city rides across Morocco.",
    images: ["https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsWrapper />
      <ServiceCards />
      <PopularRoutes />
      <HowItWorks />
      <Fleet />
      <Testimonials />
      <Team />
      <FAQ />
      <BlogTeaser />
    </>
  );
}
