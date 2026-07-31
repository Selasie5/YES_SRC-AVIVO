import { Metadata } from "next";
import RegistrationForm, { RegistrationHeader } from "../../../../components/RegistrationForm";

export const metadata: Metadata = {
  title: "Partner Registration | YEBS 2026",
  description: "Register as a partner institution for the Youth Energy Bridge Summit 2026.",
};

export default function PartnerRegistrationPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32 text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <div className="mx-auto max-w-3xl px-6">
        <RegistrationHeader type="partner" />
        <RegistrationForm type="partner" />
      </div>
    </main>
  );
}
