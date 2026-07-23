"use client";

import { useEffect, useRef, useState } from "react";
import { StampStack } from "stampstack";
import "stampstack/styles.css";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";

const items = [
  { id: "talent", label: "Talent & Workforce", bg: "from-amber-600 to-amber-800" },
  { id: "comms", label: "Communications", bg: "from-emerald-600 to-emerald-800" },
  { id: "bizdev", label: "Business Development", bg: "from-violet-600 to-violet-800" },
  { id: "yebs", label: "YEBS Summit", bg: "from-blue-600 to-blue-800" },
  { id: "energy", label: "Energy Sector", bg: "from-orange-500 to-orange-700" },
];

const frameColors = ["#d97706", "#059669", "#7c3aed", "#2563eb", "#ea580c"];

export default function AboutHero() {
  const [focusIndex, setFocusIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 lg:py-0">
      {/* Text Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-inter-tight)] tracking-tight leading-tight mb-6">
          About Afrovivo
        </h1>
        <p className="text-base md:text-lg text-gray-600 font-[family-name:var(--font-inter-tight)] leading-relaxed max-w-xl mb-8">
          We connect industry, talent and opportunity across Africa&apos;s energy and natural resources sector — through workforce development, strategic communications, and business development.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="bg-gray-900 text-white px-6 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Get in Touch
            <CaretRight weight="bold" />
          </Link>
          <Link
            href="/services"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded text-sm font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
          >
            Our Services
          </Link>
        </div>
      </div>

      {/* StampStack Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-[500px]">
          <StampStack
            items={items}
            initialIndex={0}
            cardWidth={260}
            onFocusChange={(i) => setFocusIndex(i)}
            frameColor={(item) => {
              const idx = items.findIndex((i) => i.id === item.id);
              return frameColors[idx];
            }}
            renderStamp={(item) => (
              <div
                className={`w-full h-full bg-gradient-to-br ${item.bg} flex items-center justify-center p-6`}
              >
                <span className="text-white text-lg font-semibold font-[family-name:var(--font-inter-tight)] text-center leading-snug">
                  {item.label}
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
