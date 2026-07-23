import { Metadata } from "next";
import Image from "next/image";
import AboutHero from "../../components/AboutHero";
import AboutDialSection from "../../components/AboutDialSection";
import WhatGuidesUsSection from "../../components/WhatGuidesUsSection";

export const metadata: Metadata = {
  title: "About Afrovivo | A Pan-African Business Services Company for the Energy Sector",
  description: "Learn about Afrovivo International's mission, vision, and the story behind Ghana's emerging bridge between energy industry and youth talent.",
};

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <AboutHero />
      <AboutDialSection />

      <div className="max-w-7xl mx-auto mt-24 px-6 pb-20">
        <WhatGuidesUsSection />

        <section className="mt-24">
          <h2 className="text-4xl md:text-5xl font-medium mb-8 font-[family-name:var(--font-inter-tight)] text-gray-900 tracking-tight">Where We're Headed</h2>
          <div className="relative w-full aspect-[16/9] rounded overflow-hidden mb-8 bg-gray-100">
            <Image
              src="/hero-bg.png"
              alt="Where We're Headed"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-4xl">
            Afrovivo's ambitions don't stop at business services. As we build credibility, relationships, and cash flow through YEBS and our core service lines, we're positioning for a longer-term role in energy trading, industrial services, and strategic investment across the continent — deliberately, and without getting ahead of ourselves.
          </p>
        </section>
      </div>
    </main>
  );
}
