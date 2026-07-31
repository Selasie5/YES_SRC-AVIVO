import { Metadata } from "next";
import InsightsFeatured from "../../components/InsightsFeatured";
import InsightsGrid from "../../components/InsightsGrid";
import { featuredInsight, insightArticles } from "../../data/insights";

export const metadata: Metadata = {
  title: "Insights | Afrovivo International",
  description: "Sector intelligence, energy history, and workforce insights from Afrovivo International.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-28 text-gray-900 font-[family-name:var(--font-inter-tight)] sm:pt-36 lg:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <InsightsFeatured article={featuredInsight} />

        <div className="mt-16 md:mt-20">
          <InsightsGrid articles={insightArticles} />
        </div>
      </div>
    </main>
  );
}
