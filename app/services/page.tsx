import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Afrovivo International",
  description: "Talent & workforce solutions, corporate communications, and business development for Africa's energy and natural resources sector.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Three Business Units. One Mission.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Afrovivo works across three connected service lines — because in the energy sector, talent, communications, and business development are rarely separate problems. A company hiring its next graduate cohort is often the same company that needs help telling its ESG story, or finding its next local partner. We built our business to serve all three needs, together.
          </p>
        </header>

        <div className="space-y-24">
          <section id="talent">
            <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-inter-tight)]">1. Talent & Workforce Solutions</h2>
            <p className="text-xl text-gray-700 mb-8">Africa's energy sector needs people who are ready on day one. We build the pipelines that get them there.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Services include:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Energy Talent Database</li>
                  <li>Graduate Recruitment</li>
                  <li>Internship & National Service Placement Programmes</li>
                  <li>Graduate Readiness Training</li>
                  <li>Corporate Graduate Programmes</li>
                  <li>Employer Branding</li>
                  <li>Executive Mentorship</li>
                  <li>Workforce Development Consulting</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Who it's for:</h3>
                <p className="text-gray-700">Oil & gas operators, IPPs, mining companies, EPC firms, and utilities looking to build a sector-ready, locally-compliant workforce.</p>
              </div>
            </div>
          </section>

          <section id="communications">
            <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-inter-tight)]">2. Corporate Communications & Stakeholder Engagement</h2>
            <p className="text-xl text-gray-700 mb-8">In a sector where trust is currency, how you communicate matters as much as what you build.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Services include:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Corporate Communications Strategy</li>
                  <li>ESG & Sustainability Communications</li>
                  <li>CSR Strategy</li>
                  <li>Internal Communications</li>
                  <li>Media Relations</li>
                  <li>Executive Thought Leadership</li>
                  <li>Crisis Communications Support</li>
                  <li>Annual Reports</li>
                  <li>Stakeholder Engagement</li>
                  <li>Corporate Events & Conferences</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Who it's for:</h3>
                <p className="text-gray-700">Energy companies, DFIs, and NGOs needing to communicate credibly with regulators, communities, media, and investors.</p>
              </div>
            </div>
          </section>

          <section id="business-development">
            <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-inter-tight)]">3. Business Development & Market Access</h2>
            <p className="text-xl text-gray-700 mb-8">We open the doors that take time, relationships, and local knowledge to open alone.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Services include:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Partnership Development</li>
                  <li>B2B Matchmaking</li>
                  <li>Market Entry Strategy</li>
                  <li>Investment Facilitation</li>
                  <li>Government & Institutional Engagement</li>
                  <li>Strategic Advisory</li>
                  <li>Sales Representation</li>
                  <li>Industry Forums & Networking Platforms</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Who it's for:</h3>
                <p className="text-gray-700">Local and international companies looking to enter, expand, or deepen their footprint in Ghana and West Africa's energy sector.</p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-24 bg-gray-900 text-white p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-inter-tight)]">How We Work</h2>
          <p className="text-xl mb-4 font-semibold text-gray-300">Diagnose → Design → Deliver → Deepen</p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Every engagement starts with understanding your actual need — not a generic package. We scope a clear proposal, deliver against it with a named account lead, and check in quarterly to see where else we can help. Most of our clients start with one service and stay for more than one.
          </p>
        </section>
      </div>
    </main>
  );
}
