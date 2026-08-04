"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CaretRight, CaretLeft, Target, ShareNetwork, Compass } from "@phosphor-icons/react";
import { useRef } from "react";

const whyData = [
  {
    id: 1,
    label: "EXPERTISE",
    icon: Target,
    title: "Sector-fluent.",
    description: "We speak the language of energy — technical, regulatory, and commercial — not generic business services.",
    color: "bg-[#E65C2B]",
    image: "/hero-bg.jpg"
  },
  {
    id: 2,
    label: "NETWORK",
    icon: ShareNetwork,
    title: "Relationship-led.",
    description: "Our work is built on real relationships across Ghana's energy ecosystem, not cold outreach.",
    color: "bg-[#059669]",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg"
  },
  {
    id: 3,
    label: "PURPOSE",
    icon: Compass,
    title: "Built to bridge.",
    description: "Every service we offer exists to connect someone to something: talent to opportunity, company to partner, idea to capital.",
    color: "bg-[#7C3AED]",
    image: "/home-office-users-attending-online-virtual-call-from-their-home.jpg"
  }
];

export default function WhyAfrovivoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 md:py-36 max-w-[1600px] mx-auto px-6 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-normal font-[family-name:var(--font-inter-tight)] tracking-tight text-gray-900 mb-4">
            Why choose Afrovivo?
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-[family-name:var(--font-inter-tight)] leading-relaxed">
            Partner with a team that understands the energy sector and the people who power it.
          </p>
        </motion.div>

        {/* Carousel Controls & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden flex-wrap items-center gap-3 sm:gap-4 md:flex"
        >
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <CaretLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <CaretRight size={20} className="text-gray-600" />
            </button>
          </div>
          <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:w-auto">
            Start a Conversation
            <CaretRight weight="bold" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 md:hidden"
      >
        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Start a Conversation
          <CaretRight weight="bold" />
        </Link>
      </motion.div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {whyData.map((item, index) => (
          <WhyCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Desktop: horizontal carousel */}
      <div
        ref={scrollRef}
        className="relative hidden gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:flex"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {whyData.map((item, index) => (
          <WhyCard key={item.id} item={item} index={index} variant="carousel" />
        ))}
      </div>
    </section>
  );
}

type WhyItem = (typeof whyData)[number];

function WhyCard({
  item,
  index,
  variant = "stack",
}: {
  item: WhyItem;
  index: number;
  variant?: "stack" | "carousel";
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={
        variant === "carousel"
          ? "flex h-auto min-h-[500px] w-[min(800px,calc(100vw-3rem))] shrink-0 snap-center flex-col overflow-hidden rounded md:min-w-[800px] md:flex-row"
          : "flex flex-col overflow-hidden rounded"
      }
    >
      <div
        className={`${item.color} relative flex w-full flex-col justify-between p-6 text-white sm:p-8 md:w-1/2 md:p-14`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10">
          <span className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest sm:mb-8 sm:text-sm font-[family-name:var(--font-inter-tight)]">
            <Icon size={18} weight="light" className="text-white/80" />
            {item.label}
          </span>

          <h3 className="mb-3 text-2xl font-normal leading-snug sm:text-3xl md:text-4xl font-[family-name:var(--font-inter-tight)]">
            {item.title}
          </h3>

          <p className="max-w-md text-sm leading-relaxed text-white/90 sm:text-base font-[family-name:var(--font-inter-tight)]">
            {item.description}
          </p>
        </div>

        <div className="relative z-10 mt-8 md:mt-10">
          <Link
            href="/services"
            className="flex sm:inline-flex justify-center items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100 w-full sm:w-auto"
          >
            Learn more
            <CaretRight weight="bold" />
          </Link>
        </div>
      </div>

      <div className="relative h-[220px] w-full shrink-0 sm:h-[280px] md:h-auto md:min-h-[500px] md:w-1/2">
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
      </div>
    </motion.div>
  );
}
