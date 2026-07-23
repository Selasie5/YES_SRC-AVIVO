import Hero from "../components/Hero";
import ScrollRevealText from "../components/ScrollRevealText";
import WhatWeDoSection from "../components/WhatWeDoSection";
import YebsCallout from "../components/YebsCallout";
import WhyAfrovivoSection from "../components/WhyAfrovivoSection";
import FAQSection from "../components/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <Hero />

      <ScrollRevealText />

      <WhatWeDoSection />

      <YebsCallout />

      <WhyAfrovivoSection />

      <FAQSection />
    </main>
  );
}
