"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PaperPlaneTilt, MapPin, EnvelopeSimple } from "@phosphor-icons/react";
import Image from "next/image";

const helpOptions = [
  "Talent & Workforce",
  "Corporate Communications",
  "Business Development",
  "YEBS Sponsorship",
  "Consultation",
  "Other",
];

export default function ContactForm() {
  const [selectedHelp, setSelectedHelp] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-white px-6 pt-48 pb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* ──────── Left Column ──────── */}
        <div className="flex flex-col justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-5xl font-normal tracking-tight text-gray-900 font-[family-name:var(--font-inter-tight)]"
            >
              Let&apos;s Build the Bridge
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-sm md:text-base text-gray-500 leading-relaxed max-w-md font-[family-name:var(--font-inter-tight)]"
            >
              Whether you&apos;re hiring, communicating, expanding, or looking to get involved with YEBS — we&apos;d like to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={20} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">General enquiries</p>
                    <a href="mailto:info@afrovivo.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">info@afrovivo.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={20} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Sponsorship &amp; partnerships</p>
                    <a href="mailto:partners@afrovivo.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">partners@afrovivo.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={20} weight="bold" className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Talent &amp; recruitment</p>
                    <a href="mailto:talent@afrovivo.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">talent@afrovivo.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <MapPin size={20} weight="bold" className="text-gray-400 shrink-0" />
                <p className="text-sm font-semibold text-gray-900">Accra, Ghana</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 relative w-full aspect-[4/3] rounded overflow-hidden hidden lg:block"
          >
            <Image
              src="/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* ──────── Right Column: Form ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter-tight)]">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your full name"
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm font-[family-name:var(--font-inter-tight)]"
              />
            </div>

            {/* Organisation */}
            <div>
              <label htmlFor="organisation" className="block text-sm font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter-tight)]">
                Organisation
              </label>
              <input
                type="text"
                id="organisation"
                placeholder="Your company or organisation"
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm font-[family-name:var(--font-inter-tight)]"
              />
            </div>

            {/* What can we help with — Chip Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4 font-[family-name:var(--font-inter-tight)]">
                What can we help with?
              </label>
              <div className="flex flex-wrap gap-3">
                {helpOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedHelp(selectedHelp === option ? null : option)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 font-[family-name:var(--font-inter-tight)] ${
                      selectedHelp === option
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter-tight)]">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us a bit about what you need..."
                className="w-full px-4 py-4 border-2 border-gray-200 rounded bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm resize-none font-[family-name:var(--font-inter-tight)]"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full bg-gray-900 text-white px-6 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              Send Message
              <PaperPlaneTilt weight="bold" size={14} />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
