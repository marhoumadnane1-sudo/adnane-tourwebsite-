import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us — NIGOR 2Transport Morocco",
  description:
    "Contact NIGOR 2Transport 24/7 for Morocco private transfers. Reach us by WhatsApp, phone, or email — we respond within minutes.",
  keywords: [
    "contact Morocco transfer",
    "WhatsApp Morocco taxi",
    "book private driver Morocco",
    "contact chauffeur Maroc",
    "تواصل مع سائق خاص المغرب",
  ],
  openGraph: {
    title: "Contact NIGOR 2Transport — Available 24/7",
    description:
      "Reach us by WhatsApp, phone, or email. We respond within minutes for all transfer inquiries in Morocco.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Contact NIGOR 2Transport Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact NIGOR 2Transport — 24/7 Morocco Transfers",
    description: "WhatsApp, phone, or email. We respond within minutes.",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
