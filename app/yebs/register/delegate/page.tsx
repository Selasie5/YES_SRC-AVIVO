import { Metadata } from "next";
import RegistrationForm, { RegistrationHeader } from "../../../../components/RegistrationForm";

export const metadata: Metadata = {
  title: "Delegate Registration | YEBS 2026",
  description: "Register as a delegate for the Youth Energy Bridge Summit 2026.",
};

export default function DelegateRegistrationPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-28 text-gray-900 font-[family-name:var(--font-inter-tight)] sm:pt-36 lg:pt-44">
      <div className="mx-auto max-w-3xl px-6">
        <RegistrationHeader type="delegate" />
        <RegistrationForm type="delegate" />
      </div>
    </main>
  );
}
