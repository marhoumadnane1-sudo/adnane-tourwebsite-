import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LanguageDirectionSync } from "@/components/layout/LanguageDirectionSync";
import { MobileStickyBar } from "@/components/home/MobileStickyBar";

export const metadata: Metadata = {
  title: {
    default: "NIGOR 2Transport — Private Transfers Across Morocco",
    template: "%s | NIGOR 2Transport",
  },
  description:
    "Book private airport transfers from Casablanca Mohammed V (CMN), city-to-city rides and day hire across Morocco. Fixed prices, professional drivers, 24/7 service.",
  keywords: [
    "Morocco transfer", "airport transfer Morocco", "Marrakech transfer",
    "Casablanca airport taxi", "private driver Morocco", "Morocco transport",
    "نقل المغرب", "transfert Maroc", "taxi aéroport Marrakech",
  ],
  openGraph: {
    title: "NIGOR 2Transport — Private Transfers Across Morocco",
    description: "Fixed-price private transfers from Casablanca Mohammed V Airport to all Moroccan cities. Professional drivers, 24/7 availability.",
    url: "https://nigor2transport.ma",
    siteName: "NIGOR 2Transport",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIGOR 2Transport — Private Transfers Across Morocco",
    description: "Fixed-price private transfers from Casablanca Mohammed V Airport to all Moroccan cities.",
  },
  robots: { index: true, follow: true },
  themeColor: "#B5451B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "NIGOR 2Transport",
              alternateName: "NIGOR 2Transport",
              description: "Transport touristique privé agréé au Maroc. Transferts aéroport CMN, trajets ville à ville, location avec chauffeur.",
              url: "https://nigor2transport.ma",
              telephone: "+212661659607",
              email: "nigor2.car@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ain Borja",
                addressLocality: "Casablanca",
                addressCountry: "MA",
              },
              hasCredential: "Dossier Transport Touristique N° 1754/T/2018",
              geo: { "@type": "GeoCoordinates", latitude: 31.791702, longitude: -7.09262 },
              priceRange: "$$",
              currenciesAccepted: "MAD, EUR",
              paymentAccepted: "Cash, Credit Card",
              openingHours: "Mo-Su 00:00-23:59",
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-cream antialiased"
        suppressHydrationWarning
      >
        <LanguageDirectionSync />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileStickyBar />
      </body>
    </html>
  );
}
