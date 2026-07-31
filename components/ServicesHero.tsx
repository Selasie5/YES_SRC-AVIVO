"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";

const textReveal = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export default function ServicesHero() {
  return (
    <section className="bg-white px-6 pt-48 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textReveal}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Business units
            </p>
            <h1 className="mt-4 text-5xl font-normal tracking-tight text-gray-900 md:text-6xl font-[family-name:var(--font-inter-tight)]">
              Our Services
            </h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={textReveal}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="max-w-xl"
          >
            <p className="text-base leading-relaxed text-gray-600 md:text-lg font-[family-name:var(--font-inter-tight)]">
              Three business units. One mission — connecting industry, talent, and opportunity across
              Africa&apos;s energy sector.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={textReveal}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-12 max-w-4xl text-sm leading-relaxed text-gray-500 md:text-base font-[family-name:var(--font-inter-tight)]"
        >
          Afrovivo works across three connected service lines — because in the energy sector, talent,
          communications, and business development are rarely separate problems. A company hiring its
          next graduate cohort is often the same company that needs help telling its ESG story, or
          finding its next local partner. We built our business to serve all three needs, together.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={textReveal}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Start a conversation
            <CaretRight weight="bold" size={14} />
          </Link>
          <a
            href="#talent"
            className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Explore services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
