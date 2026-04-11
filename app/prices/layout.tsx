import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Transfer Prices — Fixed Rates Morocco | NIGOR 2Transport",
  description:
    "Complete price list for private transfers in Morocco. CMN airport to major cities, city-to-city routes, and private day hire. All-inclusive per-vehicle pricing — no hidden fees.",
  keywords: [
    "Morocco transfer prices",
    "CMN airport transfer price",
    "Casablanca Marrakech transfer price",
    "taxi Maroc prix fixe",
    "transfert privé tarif Maroc",
    "prix voiture avec chauffeur Maroc",
    "سعر نقل خاص المغرب",
  ],
  openGraph: {
    title: "Transfer Prices Morocco — All-Inclusive Fixed Rates",
    description:
      "Transparent per-vehicle pricing for all Morocco private transfers. Tolls, fuel, and taxes already included.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Morocco private transfer pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Transfer Prices — Fixed All-Inclusive Rates",
    description: "Transparent per-vehicle pricing. No hidden fees — tolls, fuel, taxes included.",
  },
};

export default function PricesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
