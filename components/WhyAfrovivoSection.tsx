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
    image: "/hero-bg.png"
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
          className="flex items-center gap-4"
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
          <Link href="/contact" className="bg-black text-white px-6 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
            Start a Conversation
            <CaretRight weight="bold" />
          </Link>
        </motion.div>
      </div>

      {/* Cards Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {whyData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[90vw] md:min-w-[800px] lg:min-w-[950px] flex-shrink-0 snap-center flex flex-col md:flex-row rounded overflow-hidden h-auto md:h-[500px]"
          >
            {/* Left Content Half */}
            <div className={`${item.color} w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-between text-white relative`}>
              {/* Subtle pattern or grid overlay (like Mintlify screenshot) */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
              
              <div className="relative z-10">
                <span className="text-sm font-bold tracking-widest uppercase mb-12 inline-flex items-center gap-2 font-[family-name:var(--font-inter-tight)]">
                  <item.icon size={18} weight="light" className="text-white/80" />
                  {item.label}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-normal font-[family-name:var(--font-inter-tight)] mb-4 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-sm md:text-base text-white/90 font-[family-name:var(--font-inter-tight)] leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-12 md:mt-0">
                <Link href="/services" className="bg-white text-black px-6 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                  Learn more
                  <CaretRight weight="bold" />
                </Link>
              </div>
            </div>

            {/* Right Image Half */}
            <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover" 
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
