"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOG_ARTICLES, getArticleTrans, formatBlogDate } from "@/lib/blog";
import { useTranslation } from "@/hooks/useTranslation";
import type { BlogLang } from "@/lib/blog";

const SECTION_LABELS: Record<BlogLang, { tag: string; title: string; sub: string; cta: string }> = {
  en: {
    tag: "Tips & Guides",
    title: "The NIGOR 2Transport Blog",
    sub: "Practical tips for travelling in Morocco with peace of mind.",
    cta: "View all articles",
  },
  fr: {
    tag: "Conseils & Guides",
    title: "Le Blog NIGOR 2Transport",
    sub: "Conseils pratiques pour voyager au Maroc en toute sérénité.",
    cta: "Voir tous les articles",
  },
  ar: {
    tag: "نصائح وأدلة",
    title: "مدونة NIGOR 2Transport",
    sub: "نصائح عملية للسفر في المغرب بكل راحة واطمئنان.",
    cta: "عرض جميع المقالات",
  },
};

export function BlogTeaser() {
  const { language, isRTL } = useTranslation();
  const lang = language as BlogLang;
  const labels = SECTION_LABELS[lang];
  const articles = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-cream" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex items-end justify-between mb-10 gap-4 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}>
          <div>
            <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-terracotta" />
              {labels.tag}
              <span className="w-6 h-px bg-terracotta" />
            </span>
            <h2 className="section-title">{labels.title}</h2>
            <p className="section-subtitle mt-2">{labels.sub}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta/80 transition-colors whitespace-nowrap"
          >
            {labels.cta}
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const trans = getArticleTrans(article, lang);
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white rounded-2xl border border-sand-dark shadow-card hover:shadow-lg hover:border-terracotta/30 transition-all duration-200 overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={trans.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-xs font-semibold text-terracotta/70 uppercase tracking-wider bg-terracotta/8 px-2 py-0.5 rounded-full">
                      {lang === "ar" ? "نقل المغرب" : lang === "fr" ? "Transfert Maroc" : "Morocco Transfer"}
                    </span>
                    <span className="text-xs text-charcoal/40">{formatBlogDate(article.date, lang)}</span>
                  </div>
                  <h3 className="text-base font-bold text-charcoal group-hover:text-terracotta transition-colors leading-snug mb-2 line-clamp-2">
                    {trans.title}
                  </h3>
                  <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-2">
                    {trans.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
