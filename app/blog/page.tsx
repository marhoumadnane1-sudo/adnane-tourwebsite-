import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog — Morocco Transfer Tips & Guides | NIGOR 2Transport",
  description:
    "Tips, guides and information on airport transfers, shuttles and private transport in Morocco. Casablanca, Marrakech, Fès and all cities.",
  keywords: [
    "blog transfert Maroc",
    "guide transport Maroc",
    "navette aéroport Casablanca",
    "transfert privé Maroc",
  ],
};

export default function BlogPage() {
  return <BlogList />;
}
