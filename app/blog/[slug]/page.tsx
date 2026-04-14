import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, getArticleBySlug } from "@/lib/blog";
import { BlogArticleView } from "@/components/blog/BlogArticleView";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  // Default to English for metadata (SEO)
  const trans = article.translations.en ?? article.translations.fr;
  return {
    title: `${trans.title} | NIGOR 2Transport`,
    description: trans.description,
    keywords: trans.keywords,
    openGraph: {
      title: trans.title,
      description: trans.description,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.coverImage, width: 800, height: 450 }],
    },
  };
}

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return <BlogArticleView article={article} allArticles={BLOG_ARTICLES} />;
}
