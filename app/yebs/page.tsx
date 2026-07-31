import { Metadata } from "next";
import YebsCallout from "../../components/YebsCallout";
import YebsPartnersSection from "../../components/YebsPartnersSection";
import WhyYebsSection from "../../components/WhyYebsSection";
import WhatHappensAtYebsSection from "../../components/WhatHappensAtYebsSection";
import YebsSpeakersSection from "../../components/YebsSpeakersSection";
import YebsAudienceSection from "../../components/YebsAudienceSection";

export const metadata: Metadata = {
  title: "YEBS | Youth Energy Bridge Summit — Afrovivo International",
  description: "YEBS 2026, 14 August, ISSER Conference Center, Accra. The summit connecting Ghana's youth talent to its energy sector.",
};

export default function YEBSPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <YebsCallout variant="page" />
      <YebsPartnersSection />
      <WhyYebsSection />

      <WhatHappensAtYebsSection />
      <YebsSpeakersSection />
      <YebsAudienceSection />
    </main>
  );
}
