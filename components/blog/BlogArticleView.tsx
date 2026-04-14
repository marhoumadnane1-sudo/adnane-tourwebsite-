"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { getArticleTrans, formatBlogDate } from "@/lib/blog";
import { useTranslation } from "@/hooks/useTranslation";
import type { BlogArticle, BlogLang } from "@/lib/blog";
import type React from "react";

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

const BREADCRUMB: Record<BlogLang, { home: string; blog: string }> = {
  en: { home: "Home", blog: "Blog" },
  fr: { home: "Accueil", blog: "Blog" },
  ar: { home: "الرئيسية", blog: "المدونة" },
};

const CTA: Record<BlogLang, { label: string; sub: string; btn: string }> = {
  en: { label: "NIGOR 2Transport", sub: "Fixed price · Professional driver · Available 24/7", btn: "Book online" },
  fr: { label: "NIGOR 2Transport", sub: "Prix fixe · Chauffeur professionnel · Disponible 24h/24", btn: "Réserver en ligne" },
  ar: { label: "NIGOR 2Transport", sub: "سعر ثابت · سائق محترف · متاح 24/7", btn: "احجز عبر الإنترنت" },
};

const NAV_PREV: Record<BlogLang, string> = { en: "Previous article", fr: "Article précédent", ar: "المقال السابق" };
const NAV_NEXT: Record<BlogLang, string> = { en: "Next article", fr: "Article suivant", ar: "المقال التالي" };
const BACK_BLOG: Record<BlogLang, string> = { en: "Back to blog", fr: "Retour au blog", ar: "العودة إلى المدونة" };
const BOOK_TITLE: Record<BlogLang, string> = { en: "Book your transfer now", fr: "Réservez votre transfert maintenant", ar: "احجز رحلتك الآن" };

function renderContent(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="my-2" />);
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-bold text-charcoal mt-8 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-charcoal mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("#### ")) {
      elements.push(
        <h4 key={key++} className="text-lg font-bold text-charcoal mt-6 mb-2">
          {trimmed.slice(5)}
        </h4>
      );
    } else if (trimmed.startsWith("- **")) {
      const match = trimmed.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={key++} className="flex items-start gap-2 mb-1.5 text-charcoal/75">
            <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0" />
            <span><strong className="text-charcoal">{match[1]}</strong>{match[2]}</span>
          </li>
        );
      }
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="flex items-start gap-2 mb-1.5 text-charcoal/75">
          <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0" />
          <span>{trimmed.slice(2)}</span>
        </li>
      );
    } else if (trimmed.startsWith("✅")) {
      elements.push(
        <li key={key++} className="flex items-start gap-2 mb-2 text-charcoal/75">
          <span className="text-green-500 flex-shrink-0">✅</span>
          <span dangerouslySetInnerHTML={{ __html: trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
        </li>
      );
    } else if (trimmed.startsWith("**")) {
      const match = trimmed.match(/^\*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <p key={key++} className="text-charcoal/80 leading-relaxed mb-3">
            <strong className="text-charcoal">{match[1]}</strong>{match[2]}
          </p>
        );
      }
    } else if (trimmed.startsWith("|")) {
      // skip markdown table rows
    } else {
      const html = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p key={key++} className="text-charcoal/75 leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
  }

  return <div className="prose-custom">{elements}</div>;
}

interface Props {
  article: BlogArticle;
  allArticles: BlogArticle[];
}

export function BlogArticleView({ article, allArticles }: Props) {
  const { language, isRTL } = useTranslation();
  const lang = language as BlogLang;
  const trans = getArticleTrans(article, lang);

  const currentIdx = allArticles.findIndex((a) => a.slug === article.slug);
  const prev = allArticles[currentIdx + 1];
  const next = allArticles[currentIdx - 1];

  const prevTrans = prev ? getArticleTrans(prev, lang) : null;
  const nextTrans = next ? getArticleTrans(next, lang) : null;

  return (
    <main className="min-h-screen bg-cream pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-sm text-charcoal/40 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
          <Link href="/" className="hover:text-terracotta transition-colors">{BREADCRUMB[lang].home}</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-terracotta transition-colors">{BREADCRUMB[lang].blog}</Link>
          <span>/</span>
          <span className="text-charcoal/70 truncate max-w-[200px]">{trans.title}</span>
        </nav>

        {/* Cover image */}
        <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden mb-8">
          <Image
            src={article.coverImage}
            alt={trans.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
        </div>

        {/* Article header */}
        <header className="mb-8">
          <div className={`flex items-center gap-3 mb-4 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="text-xs font-semibold text-terracotta/70 uppercase tracking-wider bg-terracotta/8 px-2.5 py-1 rounded-full">
              {CATEGORY_LABEL[lang]}
            </span>
            <span className="flex items-center gap-1 text-xs text-charcoal/40">
              <Calendar className="w-3.5 h-3.5" />
              {formatBlogDate(article.date, lang)}
            </span>
            <span className="flex items-center gap-1 text-xs text-charcoal/40">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} {READ_TIME_LABEL[lang]}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
            {trans.title}
          </h1>
          <p className={`text-charcoal/60 text-lg leading-relaxed ${isRTL ? "border-r-4 border-l-0 pr-4" : "border-l-4 pl-4"} border-terracotta`}>
            {trans.description}
          </p>
        </header>

        {/* Article content */}
        <article className="bg-white rounded-2xl border border-sand-dark shadow-card p-6 sm:p-10 mb-8">
          {renderContent(trans.content)}
        </article>

        {/* CTA */}
        <div className="bg-charcoal rounded-2xl p-8 text-center mb-8">
          <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{CTA[lang].label}</p>
          <h2 className="text-2xl font-bold text-white mb-3">{BOOK_TITLE[lang]}</h2>
          <p className="text-white/60 mb-6 text-sm">{CTA[lang].sub}</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            {CTA[lang].btn}
            <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>

        {/* Article navigation */}
        <div className={`flex gap-4 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}>
          {prev && prevTrans && (
            <Link
              href={`/blog/${prev.slug}`}
              className="flex-1 min-w-0 group flex items-center gap-3 bg-white border border-sand-dark rounded-xl p-4 hover:border-terracotta/30 transition-all"
            >
              <ArrowLeft className={`w-4 h-4 text-charcoal/30 group-hover:text-terracotta flex-shrink-0 transition-colors ${isRTL ? "rotate-180" : ""}`} />
              <div className="min-w-0">
                <p className="text-xs text-charcoal/40 mb-0.5">{NAV_PREV[lang]}</p>
                <p className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors truncate">{prevTrans.title}</p>
              </div>
            </Link>
          )}
          {next && nextTrans && (
            <Link
              href={`/blog/${next.slug}`}
              className={`flex-1 min-w-0 group flex items-center justify-end gap-3 bg-white border border-sand-dark rounded-xl p-4 hover:border-terracotta/30 transition-all ${isRTL ? "" : "text-right"}`}
            >
              <div className="min-w-0">
                <p className="text-xs text-charcoal/40 mb-0.5">{NAV_NEXT[lang]}</p>
                <p className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors truncate">{nextTrans.title}</p>
              </div>
              <ArrowRight className={`w-4 h-4 text-charcoal/30 group-hover:text-terracotta flex-shrink-0 transition-colors ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          )}
        </div>

        {/* Back to blog */}
        <div className="mt-6 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-terracotta transition-colors">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            {BACK_BLOG[lang]}
          </Link>
        </div>

      </div>
    </main>
  );
}
