import { Metadata } from "next";
import ServicesHero from "../../components/ServicesHero";
import ServicesUnitsSection from "../../components/ServicesUnitsSection";
import HowWeWorkSection from "../../components/HowWeWorkSection";

export const metadata: Metadata = {
  title: "Our Services | Afrovivo International",
  description:
    "Talent & workforce solutions, corporate communications, and business development for Africa's energy and natural resources sector.",
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <ServicesHero />
      <ServicesUnitsSection />
      <HowWeWorkSection />
    </main>
  );
}
