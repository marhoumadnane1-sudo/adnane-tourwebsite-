import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LanguageDirectionSync } from "@/components/layout/LanguageDirectionSync";
import { MobileStickyBar } from "@/components/home/MobileStickyBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://nigor2transport.ma"),
  title: {
    default: "NIGOR 2Transport — Private Transfers Morocco",
    template: "%s | NIGOR 2Transport",
  },
  description:
    "Licensed private transfers across Morocco. Airport pickups CMN, city-to-city, day hire. Mercedes Vito, Sprinter, E-Class. Fixed prices 24/7.",
  keywords: [
    "Morocco transfer",
    "CMN airport transfer",
    "Casablanca airport taxi",
    "transfert aeroport Casablanca",
    "نقل مطار الدار البيضاء",
    "private driver Morocco",
    "taxi Marrakech",
    "transport touristique Maroc",
  ],
  authors: [{ name: "NIGOR 2Transport" }],
  creator: "NIGOR 2Transport",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_MA", "ar_MA"],
    url: "https://nigor2transport.ma",
    siteName: "NIGOR 2Transport",
    title: "NIGOR 2Transport — Private Transfers Morocco",
    description:
      "Licensed private transfers across Morocco. Fixed prices, professional drivers, 24/7.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "NIGOR 2Transport Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIGOR 2Transport — Private Transfers Morocco",
    description: "Licensed private transfers across Morocco. Fixed prices, 24/7.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') ?? '/';
  const isAdmin = pathname.startsWith('/admin');

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
              description:
                "Transport touristique privé agréé au Maroc. Transferts aéroport CMN, trajets ville à ville, location avec chauffeur.",
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
      <body className="min-h-screen bg-cream antialiased" suppressHydrationWarning>
        <LanguageDirectionSync />
        {!isAdmin && <Navbar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
        {!isAdmin && <MobileStickyBar />}
      </body>
    </html>
  );
}
