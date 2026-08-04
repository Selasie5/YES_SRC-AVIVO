"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";

const guideItems = [
  {
    title: "Credibility",
    content: "Every engagement is delivered to a standard that stands up to scrutiny — from boards, from regulators, from international partners.",
    image: "/cse.jpg"
  },
  {
    title: "Bridge-Building",
    content: "We exist to connect, not to compete. Talent to employers. Companies to partners. Ideas to capital.",
    image: "/pexels-a-darmel-7710084.jpg"
  },
  {
    title: "Pan-African Ambition, Ghanaian Discipline",
    content: "Rooted in Ghanaian execution standards, building toward continental relevance.",
    image: "/pexels-janzakelj-16862261.jpg"
  },
  {
    title: "Youth as Infrastructure",
    content: "We treat young talent as core sector infrastructure — not a CSR afterthought, but a strategic necessity for energy security and industrial growth.",
    image: "/delegates.jpg"
  },
  {
    title: "Integrity in Advisory",
    content: "We give independent, conflict-aware advice, and we're transparent about our commercial relationships rather than pretending to a neutrality we don't have.",
    image: "/pexels-umaraffan499-87236.jpg"
  }
];

export default function WhatGuidesUsSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="mb-24 w-full">
      <h2 className="mb-12 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-5xl font-[family-name:var(--font-inter-tight)]">
        What Guides Us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

        {/* Left Column: Accordion */}
        <div className="flex flex-col">
          {guideItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const numStr = `0${idx + 1}.`;

            return (
              <div
                key={idx}
                className={`flex flex-col border-b border-gray-200 py-6 cursor-pointer select-none transition-colors ${isOpen ? "" : "hover:border-gray-300"}`}
                onClick={() => setOpenIndex(idx)}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-medium text-sm transition-colors duration-300 ${isOpen ? "text-[#78350f]" : "text-gray-400"}`}
                  >
                    {numStr}
                  </span>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <h3
                      className={`font-semibold text-lg md:text-xl transition-colors duration-300 font-[family-name:var(--font-inter-tight)] ${isOpen ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {item.title}
                    </h3>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#78350f]" : "text-gray-400"}`}
                    />
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 text-sm md:text-base leading-relaxed text-gray-600 font-[family-name:var(--font-inter-tight)] pl-9 pb-2">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Image */}
        <div className="relative min-h-[280px] w-full overflow-hidden rounded bg-gray-100 md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={guideItems[openIndex].image}
                alt={guideItems[openIndex].title}
                fill
                className="object-cover"
                priority={true}
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
