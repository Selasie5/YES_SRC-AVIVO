"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";

const faqs = [
  {
    question: "What does Afrovivo do?",
    answer: "Afrovivo is Africa's business development, talent, and strategic communications partner for the energy and natural resources sector. We help organisations build stronger workforces, communicate with credibility, and forge the partnerships that accelerate growth."
  },
  {
    question: "Who does Afrovivo work with?",
    answer: "We work with companies across the energy and natural resources value chain — from upstream operators and service providers to regulatory bodies, investment firms, and educational institutions looking to bridge the talent gap."
  },
  {
    question: "What is the Youth Energy Bridge Summit (YEBS)?",
    answer: "YEBS is our flagship platform that brings together students, professionals, employers, and policymakers to build the talent pipeline powering Africa's energy future. It's where our client relationships begin and where the next generation of energy leaders are identified."
  },
  {
    question: "How can I partner with Afrovivo?",
    answer: "Reach out through our contact page or email us directly. We'll set up a consultation to understand your needs — whether it's talent acquisition, communications strategy, or business development support."
  },
  {
    question: "Does Afrovivo operate across all of Africa?",
    answer: "Our primary focus is Ghana and West Africa, but we work with partners and clients across the continent. Our team has deep experience in the region's energy sector and strong relationships spanning multiple markets."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Column */}
        <div className="w-full lg:w-1/3 flex items-start">

          <div>
            <h2 className="text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl md:text-5xl font-[family-name:var(--font-inter-tight)] leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-500 font-[family-name:var(--font-inter-tight)] leading-relaxed">
              Everything you need to know about Afrovivo.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/3 flex flex-col">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const numStr = `0${idx + 1}.`;

            return (
              <div
                key={idx}
                className={`flex flex-col border-b border-gray-200 py-5 cursor-pointer select-none transition-colors ${isOpen ? "" : "hover:border-gray-300"}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`font-medium text-sm md:text-base transition-colors duration-300 ${isOpen ? "text-primary" : "text-gray-400"}`}
                  >
                    {numStr}
                  </span>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <h3
                      className={`font-medium text-sm md:text-base transition-colors duration-300 font-[family-name:var(--font-inter-tight)] ${isOpen ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {faq.question}
                    </h3>
                    <CaretDown
                      size={16}
                      weight="bold"
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}`}
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
                      <div className="mt-3 text-sm md:text-base leading-relaxed text-gray-500 font-[family-name:var(--font-inter-tight)] pl-7 pb-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
