"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[url('/pexels-umaraffan499-87236.jpg')] bg-cover bg-center px-6 pb-24 pt-32 text-center text-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-inter-tight)] text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl"
        >
          Bridging Talent, Capital &amp; Opportunity Across Africa&apos;s Energy Sector
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base"
        >
          We connect industry, talent and opportunity across Africa&apos;s energy and natural resources sector — through workforce development, strategic communications, and business development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Link
            href="/contact"
            className="flex w-full justify-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 sm:w-auto sm:inline-flex"
          >
            Get in Touch
            <CaretRight weight="bold" size={14} />
          </Link>
          <Link
            href="/services"
            className="flex w-full justify-center gap-2 rounded border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:inline-flex"
          >
            Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}