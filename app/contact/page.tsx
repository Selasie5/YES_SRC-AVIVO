import { Metadata } from "next";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Afrovivo International | Let's Build the Bridge",
  description: "Get in touch with Afrovivo International for talent, communications, and business development support in Africa's energy sector.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-gray-900 font-[family-name:var(--font-inter-tight)]">
      <ContactForm />
    </main>
  );
}
