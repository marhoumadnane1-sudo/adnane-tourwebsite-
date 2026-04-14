"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { BLOG_ARTICLES, getArticleTrans, formatBlogDate } from "@/lib/blog";
import { useTranslation } from "@/hooks/useTranslation";
import type { BlogLang } from "@/lib/blog";

const CATEGORY_LABEL: Record<BlogLang, string> = {
  en: "Morocco Transfer",
  fr: "Transfert Maroc",
  ar: "نقل المغرب",
};

const READ_TIME_LABEL: Record<BlogLang, string> = {
  en: "min read",
  fr: "min de lecture",
  ar: "دقيقة قراءة",
};

const HEADER_LABEL: Record<BlogLang, string> = {
  en: "Tips & Guides",
  fr: "Conseils & Guides",
  ar: "نصائح وأدلة",
};

const HEADER_TITLE: Record<BlogLang, string> = {
  en: "The NIGOR 2Transport Blog",
  fr: "Le Blog NIGOR 2Transport",
  ar: "مدونة NIGOR 2Transport",
};

const HEADER_SUB: Record<BlogLang, string> = {
  en: "Everything you need to know about transfers and private transport in Morocco.",
  fr: "Tout ce que vous devez savoir sur les transferts, navettes et transports privés au Maroc.",
  ar: "كل ما تحتاج معرفته عن خدمات النقل والتحويل الخاص في المغرب.",
};

const CTA_TITLE: Record<BlogLang, string> = {
  en: "Ready to book your transfer?",
  fr: "Prêt à réserver votre transfert ?",
  ar: "هل أنت مستعد لحجز رحلتك؟",
};

const CTA_SUB: Record<BlogLang, string> = {
  en: "Fixed price, professional driver, available 24/7 across Morocco.",
  fr: "Prix fixe, chauffeur professionnel, disponible 24h/24 dans tout le Maroc.",
  ar: "سعر ثابت، سائق محترف، متاح على مدار الساعة في جميع أنحاء المغرب.",
};

const CTA_BTN: Record<BlogLang, string> = {
  en: "Book now",
  fr: "Réserver maintenant",
  ar: "احجز الآن",
};

export function BlogList() {
  const { language, isRTL } = useTranslation();
  const lang = language as BlogLang;

  return (
    <main className="min-h-screen bg-cream pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-terracotta text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-terracotta" />
            {HEADER_LABEL[lang]}
            <span className="w-6 h-px bg-terracotta" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3">
            {HEADER_TITLE[lang]}
          </h1>
          <p className="text-charcoal/55 text-lg max-w-2xl mx-auto">
            {HEADER_SUB[lang]}
          </p>
        </div>

        {/* Article list */}
        <div className="space-y-6">
          {BLOG_ARTICLES.map((article) => {
            const trans = getArticleTrans(article, lang);
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white rounded-2xl border border-sand-dark shadow-card hover:shadow-lg hover:border-terracotta/30 transition-all duration-200 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={trans.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-3 mb-3 flex-wrap ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                        <span className="text-xs font-semibold text-terracotta/70 uppercase tracking-wider bg-terracotta/8 px-2.5 py-1 rounded-full">
                          {CATEGORY_LABEL[lang]}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-charcoal/40">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime} {READ_TIME_LABEL[lang]}
                        </span>
                        <span className="text-xs text-charcoal/40">
                          {formatBlogDate(article.date, lang)}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors mb-2 leading-snug">
                        {trans.title}
                      </h2>
                      <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-2">
                        {trans.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta transition-colors mt-1">
                      <ArrowRight className={`w-4 h-4 text-charcoal/40 group-hover:text-white transition-colors ${isRTL ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-charcoal rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{CTA_TITLE[lang]}</h2>
          <p className="text-white/60 mb-6">{CTA_SUB[lang]}</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            {CTA_BTN[lang]}
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>

      </div>
    </main>
  );
}
