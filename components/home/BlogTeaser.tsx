import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOG_ARTICLES, formatBlogDate } from "@/lib/blog";

export function BlogTeaser() {
  const articles = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-terracotta" />
              Conseils & Guides
              <span className="w-6 h-px bg-terracotta" />
            </span>
            <h2 className="section-title">Le Blog NIGOR 2Transport</h2>
            <p className="section-subtitle mt-2">
              Conseils pratiques pour voyager au Maroc en toute sérénité.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta/80 transition-colors whitespace-nowrap"
          >
            Voir tous les articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block bg-white rounded-2xl border border-sand-dark shadow-card hover:shadow-lg hover:border-terracotta/30 transition-all duration-200 overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-terracotta/70 uppercase tracking-wider bg-terracotta/8 px-2 py-0.5 rounded-full">
                    Transfert Maroc
                  </span>
                  <span className="text-xs text-charcoal/40">{formatBlogDate(article.date)}</span>
                </div>
                <h3 className="text-base font-bold text-charcoal group-hover:text-terracotta transition-colors leading-snug mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-2">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
