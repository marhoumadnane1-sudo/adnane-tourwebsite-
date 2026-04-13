import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_ARTICLES, getArticleBySlug, formatBlogDate } from "@/lib/blog";
import { Clock, ArrowLeft, ArrowRight, Calendar } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | NIGOR 2Transport`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

function renderContent(content: string) {
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
    } else if (trimmed.startsWith("**")) {
      const match = trimmed.match(/^\*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <p key={key++} className="text-charcoal/80 leading-relaxed mb-3">
            <strong className="text-charcoal">{match[1]}</strong>{match[2]}
          </p>
        );
      }
    } else if (trimmed.startsWith("✅")) {
      elements.push(
        <li key={key++} className="flex items-start gap-2 mb-2 text-charcoal/75">
          <span className="text-green-500 flex-shrink-0">✅</span>
          <span dangerouslySetInnerHTML={{ __html: trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
        </li>
      );
    } else if (trimmed.startsWith("|")) {
      // skip table lines — render as a styled note instead
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

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const currentIdx = BLOG_ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = BLOG_ARTICLES[currentIdx + 1];
  const next = BLOG_ARTICLES[currentIdx - 1];

  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-charcoal/40 mb-8">
          <Link href="/" className="hover:text-terracotta transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-charcoal/70 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Cover image */}
        <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden mb-8">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
        </div>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold text-terracotta/70 uppercase tracking-wider bg-terracotta/8 px-2.5 py-1 rounded-full">
              Transfert Maroc
            </span>
            <span className="flex items-center gap-1 text-xs text-charcoal/40">
              <Calendar className="w-3.5 h-3.5" />
              {formatBlogDate(article.date)}
            </span>
            <span className="flex items-center gap-1 text-xs text-charcoal/40">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} min de lecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-charcoal/60 text-lg leading-relaxed border-l-4 border-terracotta pl-4">
            {article.description}
          </p>
        </header>

        {/* Article content */}
        <article className="bg-white rounded-2xl border border-sand-dark shadow-card p-6 sm:p-10 mb-8">
          {renderContent(article.content)}
        </article>

        {/* CTA */}
        <div className="bg-charcoal rounded-2xl p-8 text-center mb-8">
          <p className="text-white/60 text-sm uppercase tracking-wider mb-2">NIGOR 2Transport</p>
          <h2 className="text-2xl font-bold text-white mb-3">
            Réservez votre transfert maintenant
          </h2>
          <p className="text-white/60 mb-6 text-sm">
            Prix fixe · Chauffeur professionnel · Disponible 24h/24
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            Réserver en ligne
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Article navigation */}
        <div className="flex gap-4 flex-wrap">
          {prev && (
            <Link
              href={`/blog/${prev.slug}`}
              className="flex-1 min-w-0 group flex items-center gap-3 bg-white border border-sand-dark rounded-xl p-4 hover:border-terracotta/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-charcoal/30 group-hover:text-terracotta flex-shrink-0 transition-colors" />
              <div className="min-w-0">
                <p className="text-xs text-charcoal/40 mb-0.5">Article précédent</p>
                <p className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors truncate">{prev.title}</p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="flex-1 min-w-0 group flex items-center justify-end gap-3 bg-white border border-sand-dark rounded-xl p-4 hover:border-terracotta/30 transition-all text-right"
            >
              <div className="min-w-0">
                <p className="text-xs text-charcoal/40 mb-0.5">Article suivant</p>
                <p className="text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors truncate">{next.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-terracotta flex-shrink-0 transition-colors" />
            </Link>
          )}
        </div>

        {/* Back to blog */}
        <div className="mt-6 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-terracotta transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>

      </div>
    </main>
  );
}
