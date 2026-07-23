"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row min-h-screen bg-[#111111] text-white overflow-hidden snap-start">
      {/* Spacers to maintain layout after image shrinks */}
      <div className="hidden md:block w-1/2" />
      <div className="hidden md:block w-1/2" />

      {/* Animated Image - starts full width, slides to right half */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "50%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="hidden md:block absolute top-0 right-0 h-full bg-[url('/hero-bg.png')] bg-cover bg-center"
      />

      {/* Mobile Image (no animation) */}
      <div className="md:hidden w-full h-[50vh] bg-[url('/hero-bg.png')] bg-cover bg-center" />

      {/* Text Content */}
      <div className="relative md:absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col justify-center px-4 md:px-8 lg:px-14 py-24 md:py-0 z-10">
        <motion.h1
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-5xl md:text-5xl font-normal font-[family-name:var(--font-inter-tight)] leading-tight mb-6 tracking-tight"
        >
          Connecting Industry, Talent & Opportunity.
        </motion.h1>

        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-sm md:text-base text-gray-300 font-[family-name:var(--font-inter-tight)] mb-8 max-w-lg leading-relaxed"
        >
          Afrovivo is Africa's business development, talent, and strategic communications partner for the energy and natural resources sector. We help organisations build stronger workforces, communicate with credibility, and forge the partnerships that accelerate growth.
        </motion.p>

        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap gap-4 font-[family-name:var(--font-inter-tight)]"
        >
          <Link href="/yebs" className="bg-white text-gray-900 px-6 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            Discover YEBS
            <CaretRight weight="regular" />
          </Link>
          {/* <Link href="/services" className="border border-white/20 text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
            Explore Our Services
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
}
