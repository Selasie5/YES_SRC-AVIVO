"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const sections = [
  {
    title: "Our Story",
    content: [
      "Afrovivo International Ltd was founded on a simple observation: Africa's energy and natural resources sector has no shortage of ambition, capital, or opportunity — but it does have a persistent gap between the talent coming out of its universities and the companies trying to hire, train, and retain them. That gap costs everyone. Companies struggle to find sector-ready people. Graduates struggle to find a way in. And the industry as a whole moves slower than it should.",
      "Afrovivo was built to close that gap — starting in Ghana, with an ambition that extends across West Africa and beyond."
    ]
  },
  {
    title: "Our Mission",
    content: [
      "We connect industry, talent, and opportunity — helping organisations build stronger workforces, communicate more effectively with stakeholders, and develop the strategic partnerships that accelerate growth across Africa's energy and natural resources value chain."
    ]
  },
  {
    title: "Our Vision",
    content: [
      "To be Africa's most trusted business development, talent, and communications partner for the energy and natural resources sector — bridging the continent's youth to its most consequential industries."
    ]
  }
];

export default function AboutDialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      if (activeIndex !== 0) setActiveIndex(0);
    } else if (latest >= 0.33 && latest < 0.66) {
      if (activeIndex !== 1) setActiveIndex(1);
    } else {
      if (activeIndex !== 2) setActiveIndex(2);
    }
  });

  const handleDialClick = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    const targetScroll = containerTop + ((index * (containerHeight - windowHeight)) / 2);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-white text-gray-900">
      <div className="sticky top-0 h-screen w-full flex items-center px-6 overflow-hidden">

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: The Dial */}
          <div className="flex flex-col gap-8 justify-center z-10">
            {sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => handleDialClick(idx)}
                className="text-left group relative"
              >
                <span className={`block text-4xl md:text-5xl font-medium tracking-tight transition-all duration-500 font-[family-name:var(--font-inter-tight)] ${
                  activeIndex === idx ? "text-gray-900 translate-x-4" : "text-gray-300 hover:text-gray-500"
                }`}>
                  {sec.title}
                </span>
                {/* Active Indicator line with caret-bg */}
                {activeIndex === idx && (
                  <motion.div
                    layoutId="activeDialLine"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full rounded-full"
                    style={{
                      background: "url('/caret-bg.png') repeat-y center",
                      backgroundSize: "8px 8px",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center h-[400px] relative z-10 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                {sections[activeIndex].content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg leading-relaxed text-gray-600 font-[family-name:var(--font-inter-tight)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      </div>
    </section>
  );
}
