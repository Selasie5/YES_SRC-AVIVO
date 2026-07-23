import { Metadata } from "next";
import AboutHero from "../../components/AboutHero";

export const metadata: Metadata = {
  title: "About Afrovivo | A Pan-African Business Services Company for the Energy Sector",
  description: "Learn about Afrovivo International's mission, vision, and the story behind Ghana's emerging bridge between energy industry and youth talent.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <AboutHero />

        <div className="max-w-4xl mx-auto mt-16">
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Afrovivo International Ltd was founded on a simple observation: Africa's energy and natural resources sector has no shortage of ambition, capital, or opportunity — but it does have a persistent gap between the talent coming out of its universities and the companies trying to hire, train, and retain them. That gap costs everyone. Companies struggle to find sector-ready people. Graduates struggle to find a way in. And the industry as a whole moves slower than it should.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Afrovivo was built to close that gap — starting in Ghana, with an ambition that extends across West Africa and beyond.
          </p>
        </section>

        <section className="mb-16 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">Our Vision</h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            To be Africa's most trusted business development, talent, and communications partner for the energy and natural resources sector — bridging the continent's youth to its most consequential industries.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We connect industry, talent, and opportunity — helping organisations build stronger workforces, communicate more effectively with stakeholders, and develop the strategic partnerships that accelerate growth across Africa's energy and natural resources value chain.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 font-[family-name:var(--font-inter-tight)]">What Guides Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Credibility</h3>
              <p className="text-gray-600">Every engagement is delivered to a standard that stands up to scrutiny — from boards, from regulators, from international partners.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Bridge-Building</h3>
              <p className="text-gray-600">We exist to connect, not to compete. Talent to employers. Companies to partners. Ideas to capital.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Pan-African Ambition, Ghanaian Discipline</h3>
              <p className="text-gray-600">Rooted in Ghanaian execution standards, building toward continental relevance.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Youth as Infrastructure</h3>
              <p className="text-gray-600">We treat young talent as core sector infrastructure — not a CSR afterthought, but a strategic necessity for energy security and industrial growth.</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">Integrity in Advisory</h3>
              <p className="text-gray-600">We give independent, conflict-aware advice, and we're transparent about our commercial relationships rather than pretending to a neutrality we don't have.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">Where We're Headed</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Afrovivo's ambitions don't stop at business services. As we build credibility, relationships, and cash flow through YEBS and our core service lines, we're positioning for a longer-term role in energy trading, industrial services, and strategic investment across the continent — deliberately, and without getting ahead of ourselves.
          </p>
        </section>
      </div>
      </div>
    </main>
  );
}
