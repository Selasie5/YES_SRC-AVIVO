import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { insights } from "../../../data/insights";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return { title: "Insight | Afrovivo International" };

  return {
    title: `${article.title} | Afrovivo Insights`,
    description: article.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-white pb-24 pt-32 text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <article className="mx-auto max-w-3xl px-6">
        <Link
          href="/insights"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <CaretLeft size={14} weight="bold" />
          Back to Insights
        </Link>

        <p className="mb-4 text-sm text-gray-500">
          {article.date} &bull; {article.readTime}
        </p>

        <h1 className="mb-6 text-4xl font-normal leading-tight tracking-tight md:text-5xl">
          {article.title}
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-gray-600">{article.excerpt}</p>

        <div className="rounded border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
          Full article coming soon.
        </div>
      </article>
    </main>
  );
}
