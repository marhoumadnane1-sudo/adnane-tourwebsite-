import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ServiceCards } from "@/components/home/ServiceCards";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Fleet } from "@/components/home/Fleet";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Team } from "@/components/home/Team";

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
