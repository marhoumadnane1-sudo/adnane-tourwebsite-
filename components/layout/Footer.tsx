import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { CONTACT } from "@/lib/routes";

const services = [
  { label: "Airport Transfers", href: "/services#airport" },
  { label: "City to City", href: "/services#city-to-city" },
  { label: "Private Day Hire", href: "/services#day-hire" },
  { label: "Group Transfers", href: "/services#group" },
];

const quickLinks = [
  { label: "Book a Transfer", href: "/book" },
  { label: "Price Calculator", href: "/prices" },
  { label: "Popular Routes", href: "/#routes" },
  { label: "Our Fleet", href: "/#fleet" },
  { label: "Contact Us", href: "/contact" },
];

const airports = [
  "CMN — Casablanca Mohammed V",
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Price disclaimer banner */}
      <div className="bg-terracotta/90 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/90 text-sm font-medium">
            All prices are <strong>per vehicle</strong> — not per person. Fixed price includes tolls, fuel and taxes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-terracotta rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold">NIGOR 2Transport</div>
                <div className="text-[10px] font-medium tracking-widest text-gold uppercase">Premium Transfers</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Morocco's trusted private transfer service from Casablanca. Professional drivers, fixed prices, 24/7 availability.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-terracotta flex-shrink-0" />
                {CONTACT.email}
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-terracotta flex-shrink-0" />
                {CONTACT.address}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-terracotta rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-terracotta rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-terracotta rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#25D366] hover:bg-[#20BD5A] rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Airports */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Airports Served</h3>
            <ul className="space-y-2.5">
              {airports.map((a) => (
                <li key={a} className="text-white/50 text-sm">{a}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* License bar */}
      <div className="border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-xs font-semibold text-gold">
                Transport Touristique Agréé au Maroc
              </span>
            </div>
            <span className="text-xs text-white/30">
              Dossier N° {CONTACT.license} · {CONTACT.company}
            </span>
          </div>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} NIGOR 2Transport. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
