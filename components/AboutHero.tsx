"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";

/* 
  Photo collage grid — 8 cells laid out in a mosaic pattern.
  We reuse the available images; replace with real photos when ready.
*/
const collageImages = [
  { src: "/hero-bg.jpg", alt: "Team presentation" },
  { src: "/pexels-a-darmel-7710084.jpg", alt: "Collaboration" },
  { src: "/mentors.jpg", alt: "Mentorship session" },
  { src: "/keynotes.jpg", alt: "Keynote speakers" },
  { src: "/delegates.jpg", alt: "Delegate networking" },
  { src: "/pexels-janzakelj-16862261.jpg", alt: "Energy industry" },
  { src: "/partners.jpeg", alt: "Partnership meeting" },
  { src: "/pexels-umaraffan499-87236.jpg", alt: "Business development" },
];

export default function AboutHero() {
  return (
    <section className="flex flex-col items-center justify-center overflow-hidden bg-white px-6 pb-24 pt-28 text-center sm:pt-36 lg:pt-48">
      {/* Hero Text */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-normal tracking-tight text-gray-900 font-[family-name:var(--font-inter-tight)] sm:text-4xl md:text-5xl"
        >
          Bridging Talent, Capital &amp; Opportunity Across Africa&apos;s Energy Sector
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mt-6"
        >
          We connect industry, talent and opportunity across Africa&apos;s energy and natural resources sector — through workforce development, strategic communications, and business development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-4 mt-8 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="bg-gray-900 text-white px-6 py-3 rounded text-sm font-semibold flex sm:inline-flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            Get in Touch
            <CaretRight weight="bold" size={14} />
          </Link>
          <Link
            href="/services"
            className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded text-sm font-semibold flex sm:inline-flex justify-center items-center hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Our Services
          </Link>
        </motion.div>
      </div>

      {/* Photo Collage Mosaic */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-12 w-full max-w-[1200px] sm:mt-20"
      >
        {/* Mobile: 2×2 grid */}
        <div className="grid h-[280px] grid-cols-2 gap-3 sm:hidden">
          {collageImages.slice(0, 4).map((img, i) => (
            <motion.div
              key={img.alt + i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-xl"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Desktop: mosaic */}
        <div className="hidden h-[420px] grid-cols-6 grid-rows-2 gap-3 sm:grid">
          {/* Col 1, Row 1 — small top-left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[0].src} alt={collageImages[0].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 2, Row 1–2 — tall */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[1].src} alt={collageImages[1].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 3–4, Row 1–2 — large center (spanning 2 cols, 2 rows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[2].src} alt={collageImages[2].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 5, Row 1 — small */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[3].src} alt={collageImages[3].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 6, Row 1 — small */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[4].src} alt={collageImages[4].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 1, Row 2 — small bottom-left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[5].src} alt={collageImages[5].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 5, Row 2 — small */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[6].src} alt={collageImages[6].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Col 6, Row 2 — small */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden"
          >
            <Image src={collageImages[7].src} alt={collageImages[7].alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
