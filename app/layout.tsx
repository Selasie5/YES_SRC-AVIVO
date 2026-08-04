import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import CtaFooterSection from "../components/CtaFooterSection";
import { Analytics } from "@vercel/analytics/next"

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afrovivo International | Talent, Communications & Business Development for Africa's Energy Sector",
  description: "Afrovivo connects industry, talent and opportunity across Africa's energy and natural resources sector — through workforce development, strategic communications, and business development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <Navbar />
        {children}
        <Analytics />
        <CtaFooterSection />
      </body>
    </html>
  );
}
