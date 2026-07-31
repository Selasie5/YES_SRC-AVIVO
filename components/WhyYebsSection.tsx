"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";

const textReveal = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 24 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

function FlipButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center rounded bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
    >
      <div className="relative flex h-5 items-center overflow-hidden">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          <span className="flex h-5 items-center gap-2">
            {text} <CaretRight weight="bold" className="text-xs" />
          </span>
        </div>
        <div className="absolute inset-0 flex translate-y-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
          <span className="flex h-5 items-center gap-2">
            {text} <CaretRight weight="bold" className="text-xs" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function WhyYebsSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] md:block"
        aria-hidden
      >
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-[#ff5c00]/10 blur-3xl" />
        <div className="absolute right-[8%] bottom-[12%] h-96 w-96 rounded-full bg-[#ff5c00]/8 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full text-[#ff5c00]/20"
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
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={textReveal}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-normal leading-[1.05] tracking-tight text-gray-900 md:text-6xl lg:text-7xl font-[family-name:var(--font-inter-tight)]"
        >
          Closing the gap between Ghana&apos;s youth and its energy sector.
        </motion.h2>

        <div className="mt-12 max-w-2xl space-y-6">
          {[
            "Ghana's energy sector — oil and gas, power, mining, renewables — needs talent that understands the industry before it walks in the door.",
            "Students and graduates need a real way in, beyond sending CVs into the void.",
            "YEBS was built to close that distance directly: bringing employers and emerging talent face to face, and turning that first conversation into internships, mentorships, jobs, and — for the companies in the room — a pipeline they can keep coming back to.",
          ].map((paragraph, index) => (
            <motion.p
              key={paragraph}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={textReveal}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 + index * 0.12 }}
              className="text-base leading-relaxed text-gray-600 md:text-lg font-[family-name:var(--font-inter-tight)]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={textReveal}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="mt-10"
        >
          <FlipButton href="/yebs/register/delegate" text="Register for YEBS 2026" />
        </motion.div>
      </div>
    </section>
  );
}
