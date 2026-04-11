import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ServiceCards } from "@/components/home/ServiceCards";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { HowItWorks } from "@/components/home/HowItWorks";

const Fleet = dynamic(() => import("@/components/home/Fleet").then(m => ({ default: m.Fleet })));
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(m => ({ default: m.Testimonials })));
const Team = dynamic(() => import("@/components/home/Team").then(m => ({ default: m.Team })));
const FAQ = dynamic(() => import("@/components/home/FAQ").then(m => ({ default: m.FAQ })));

export const metadata: Metadata = {
  title: "NIGOR 2Transport — Private Transfers Across Morocco",
  description:
    "Book fixed-price private airport transfers, city-to-city rides and private driver hire across Morocco. All-inclusive prices, professional drivers, 24/7 service.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServiceCards />
      <PopularRoutes />
      <HowItWorks />
      <Fleet />
      <Testimonials />
      <Team />
      <FAQ />
    </>
  );
}
