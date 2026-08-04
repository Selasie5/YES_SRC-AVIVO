"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react";

function FlipLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex overflow-hidden py-0.5"
    >
      <span className="relative flex items-center h-4 overflow-hidden">
        <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          <span className="flex items-center h-4 text-sm text-white/70">{text}</span>
        </span>
        <span className="absolute inset-0 flex flex-col translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
          <span className="flex items-center h-4 text-sm text-white">{text}</span>
        </span>
      </span>
    </Link>
  );
}

export default function CtaFooterSection() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#f97316] text-white md:sticky md:top-0"
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <filter id="noiseCta">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseCta)" />
        </svg>
      </div>

      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 bg-black/10 pointer-events-none"
        style={{
          maskImage: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
        }}
      />

      <div className="relative z-10">
        {/* CTA */}
        <div className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-16">
            <motion.div
              className="flex flex-col max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-[family-name:var(--font-inter-tight)] tracking-tight leading-tight">
                Let&apos;s build the bridge together.
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/80 font-[family-name:var(--font-inter-tight)] leading-relaxed max-w-xl">
                Whether you&apos;re hiring, communicating, or expanding — Afrovivo is the partner that understands both the sector and the people who power it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="shrink-0"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Start a Conversation
                <CaretRight weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Edge decorations */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-[url('/caret-bg.png')] bg-repeat-y bg-left opacity-50 sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-[url('/caret-bg.png')] bg-repeat-y bg-right opacity-50 sm:block" />

        {/* Footer */}
        <footer className="relative px-6 md:px-12 lg:px-24 py-12 md:py-16">
          {/* Border line between edge decorations */}
          <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-white/20 sm:left-16 sm:right-16" />
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
            <div className="flex flex-col gap-4 max-w-sm">
              <span className="text-xl md:text-2xl font-medium tracking-tight font-[family-name:var(--font-inter-tight)]">
                Afrovivo
              </span>
              <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
                Connecting industry, talent and opportunity across Africa&apos;s energy and natural resources sector.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap gap-8 md:gap-12 lg:gap-20">
              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                  Services
                </h4>
                <div className="flex flex-col gap-3">
                  <FlipLink href="/services#talent" text="Talent & Workforce" />
                  <FlipLink href="/services#communications" text="Stakeholder Engagement" />
                  <FlipLink href="/services#business-development" text="Business Development" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                  YEBS
                </h4>
                <div className="flex flex-col gap-3">
                  <FlipLink href="/yebs" text="About YEBS" />
                  <FlipLink href="/yebs#sponsor" text="Sponsor" />
                  <FlipLink href="/yebs#register" text="Register" />
                  <FlipLink href="/prospectus" text="Prospectus" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                  Company
                </h4>
                <div className="flex flex-col gap-3">
                  <FlipLink href="/about" text="About" />
                  <FlipLink href="/insights" text="Insights" />
                  <FlipLink href="/contact" text="Contact" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                  Legal
                </h4>
                <div className="flex flex-col gap-3">
                  <FlipLink href="/privacy" text="Privacy Policy" />
                  <FlipLink href="/terms" text="Terms of Service" />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-white/40 font-light">
            <span>&copy; 2026 Afrovivo International. All rights reserved.</span>
            <a
              href="https://forgestudios.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/70"
            >
              Powered by Forge Studios
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
