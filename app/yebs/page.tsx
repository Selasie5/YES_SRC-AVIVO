import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YEBS | Youth Energy Bridge Summit — Afrovivo International",
  description: "YEBS 2026, 14 August, ISSER Conference Center, Accra. The summit connecting Ghana's youth talent to its energy sector.",
};

export default function YEBSPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-inter-tight)] mb-4">The Youth Energy Bridge Summit</h1>
          <h2 className="text-2xl text-blue-800 font-semibold mb-8">Bridging Ghana's Youth to Its Energy Future</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            YEBS is more than an annual summit — it's the platform where Ghana's next generation of energy talent meets the companies, institutions, and mentors who can open the door for them. Students. Graduates. Employers. Policymakers. Investors. All in one room, once a year, building relationships that outlast the event itself.
          </p>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg inline-block">
            <h3 className="font-bold text-lg mb-2">YEBS 2026</h3>
            <p className="text-gray-700 flex items-center mb-1">📍 ISSER Conference Center, Accra</p>
            <p className="text-gray-700 flex items-center">📅 14 August 2026</p>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-inter-tight)]">Why YEBS Exists</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ghana's energy sector — oil and gas, power, mining, renewables — needs talent that understands the industry before it walks in the door. Ghana's students and graduates need a real way in, beyond sending CVs into the void. YEBS was built to close that distance directly: bringing employers and emerging talent face to face, and turning that first conversation into internships, mentorships, jobs, and — for the companies in the room — a pipeline they can keep coming back to.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-inter-tight)]">What Happens at YEBS</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">●</span>
              <p><strong className="text-gray-900">Keynotes & panels</strong> from energy sector leaders, policymakers, and entrepreneurs</p>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">●</span>
              <p><strong className="text-gray-900">Employer showcases</strong> connecting companies directly with vetted student and graduate talent</p>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">●</span>
              <p><strong className="text-gray-900">Mentorship sessions</strong> pairing rising professionals with sector veterans</p>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">●</span>
              <p><strong className="text-gray-900">Networking built for outcomes</strong> — not just badges and business cards, but real follow-through</p>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">●</span>
              <p><strong className="text-gray-900">Sector insight releases</strong> on Ghana's energy landscape, from upstream history to current opportunity</p>
            </li>
          </ul>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">For Sponsors</h3>
            <p className="text-gray-700 mb-6">
              Sponsoring YEBS puts your organisation in front of Ghana's most promising energy-sector talent — and starts a relationship with Afrovivo that extends well beyond the summit itself. Our sponsors don't just get a logo on a banner; they get first access to our talent database, priority consideration for our talent and communications services, and a seat at the table shaping how Ghana's energy workforce develops.
            </p>
            <p className="font-semibold text-gray-900">Sponsorship tiers: Platinum · Gold · Silver · Bronze</p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">For Delegates</h3>
            <p className="text-gray-700 mb-6">
              If you're a student, recent graduate, or young professional building a future in energy, YEBS is where that future gets a running start. Register to attend, get matched into our talent database, and put yourself in front of the companies actually hiring.
            </p>
          </div>
        </div>

        <section className="bg-blue-900 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-inter-tight)]">For Partners & Institutions</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            Universities, government agencies, and development organisations are core to what YEBS achieves. If you're building youth employment, workforce development, or energy-transition programming, let's talk about how YEBS can extend your reach.
          </p>
        </section>
      </div>
    </main>
  );
}
