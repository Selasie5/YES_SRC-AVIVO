"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PaperPlaneTilt, MapPin, EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("loading");
    setError("");

    const form = new FormData(formElement);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || null,
      organization: form.get("organisation"),
      helpTopic: selectedHelp || "Not specified",
      message: form.get("message"),
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Submission failed");
      }

      setStatus("success");
      formElement.reset();
      setSelectedHelp(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  return (
    <section className="min-h-screen bg-white px-6 pb-24 pt-28 sm:pt-36 lg:pt-44">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* ──────── Left Column ──────── */}
        <div className="flex flex-col justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-normal tracking-tight text-gray-900 font-[family-name:var(--font-inter-tight)] sm:text-4xl md:text-5xl"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          {status === "success" ? (
            <div className="py-12 text-center flex flex-col items-center justify-center h-full">
              <CheckCircle weight="fill" className="text-green-500 mb-4 h-16 w-16" />
              <h2 className="text-3xl font-normal text-gray-900 font-[family-name:var(--font-inter-tight)] tracking-tight">Message Sent</h2>
              <p className="mt-3 text-gray-600 max-w-sm mx-auto leading-relaxed text-sm">
                Thank you for reaching out. We will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter-tight)]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm font-[family-name:var(--font-inter-tight)]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter-tight)]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm font-[family-name:var(--font-inter-tight)]"
                />
              </div>

              {/* Phone (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2 font-[family-name:var(--font-inter-tight)]">
                  Phone <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
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
                  name="organisation"
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
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us a bit about what you need..."
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-sm resize-none font-[family-name:var(--font-inter-tight)]"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                <PaperPlaneTilt weight="bold" size={14} />
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}

