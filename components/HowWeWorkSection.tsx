"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { howWeWorkSteps } from "../data/services";

const textReveal = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 24 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export default function HowWeWorkSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] md:block"
        aria-hidden
      >
        <div className="absolute right-[-6%] top-[20%] h-64 w-64 rounded-full bg-[#ff5c00]/10 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full text-[#ff5c00]/15"
          viewBox="0 0 600 800"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          <path
            d="M120 120 C260 220, 320 80, 480 180 S620 420, 520 620"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            d="M40 360 C180 280, 280 460, 420 380 S560 560, 480 720"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#faf7f2] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textReveal}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Our approach
          </p>
          <h2 className="mt-4 text-4xl font-normal tracking-tight text-gray-900 md:text-5xl font-[family-name:var(--font-inter-tight)]">
            How we work
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg font-[family-name:var(--font-inter-tight)]">
            Every engagement starts with understanding your actual need — not a generic package. Most
            of our clients start with one service and stay for more than one.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWorkSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textReveal}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="rounded border border-gray-200/80 bg-white/80 p-6 backdrop-blur-sm"
            >
              <span className="text-xs font-semibold text-[#78350f]">
                0{index + 1}
              </span>
              <h3 className="mt-2 text-xl font-medium text-gray-900 font-[family-name:var(--font-inter-tight)]">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 font-[family-name:var(--font-inter-tight)]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textReveal}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Start a conversation
            <CaretRight weight="bold" size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
