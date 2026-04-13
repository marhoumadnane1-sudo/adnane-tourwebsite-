import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES, formatBlogDate } from "@/lib/blog";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Conseils Transferts & Transport au Maroc | NIGOR 2Transport",
  description:
    "Conseils, guides et informations sur les transferts aéroport, navettes et transports privés au Maroc. Casablanca, Marrakech, Fès et toutes les villes.",
  keywords: [
    "blog transfert Maroc",
    "guide transport Maroc",
    "navette aéroport Casablanca",
    "transfert privé Maroc",
  ],
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-terracotta" />
            Conseils & Guides
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3">
            Le Blog NIGOR 2Transport
          </h1>
          <p className="text-charcoal/55 text-lg max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur les transferts, navettes et transports privés au Maroc.
          </p>
        </div>

        {/* Article list */}
        <div className="space-y-6">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block bg-white rounded-2xl border border-sand-dark shadow-card hover:shadow-lg hover:border-terracotta/30 transition-all duration-200 p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-semibold text-terracotta/70 uppercase tracking-wider bg-terracotta/8 px-2.5 py-1 rounded-full">
                      Transfert Maroc
                    </span>
                    <span className="flex items-center gap-1 text-xs text-charcoal/40">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime} min de lecture
                    </span>
                    <span className="text-xs text-charcoal/40">{formatBlogDate(article.date)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors mb-2 leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta transition-colors mt-1">
                  <ArrowRight className="w-4 h-4 text-charcoal/40 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-charcoal rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Prêt à réserver votre transfert ?
          </h2>
          <p className="text-white/60 mb-6">
            Prix fixe, chauffeur professionnel, disponible 24h/24 dans tout le Maroc.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            Réserver maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
