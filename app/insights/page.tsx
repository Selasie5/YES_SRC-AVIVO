import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Afrovivo International",
  description: "Sector intelligence, energy history, and workforce insights from Afrovivo International.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">Insights</h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            Africa's energy sector moves fast, and the context behind it often gets lost. We publish short, sharp insight pieces — on Ghana's energy history, sector developments, and the state of the talent pipeline — to keep our clients, partners, and community informed.
          </p>
        </header>

        {/* Placeholder for Insight Cards Feed */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-blue-600 mb-2 block">Sector Intelligence</span>
              <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-inter-tight)]">The Future of Ghana's Energy Workforce</h3>
              <p className="text-gray-600 mb-4">An analysis of emerging skill requirements as the sector transitions.</p>
              <span className="text-gray-500 text-sm">Coming Soon</span>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-blue-600 mb-2 block">Energy History</span>
              <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-inter-tight)]">Upstream Evolution in West Africa</h3>
              <p className="text-gray-600 mb-4">Tracing the developmental milestones of the region's oil and gas discoveries.</p>
              <span className="text-gray-500 text-sm">Coming Soon</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
