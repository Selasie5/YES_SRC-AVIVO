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

function DialContent({ activeIndex }: { activeIndex: number }) {
  return (
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
            className="text-base leading-relaxed text-gray-600 font-[family-name:var(--font-inter-tight)] md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

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
    setActiveIndex(index);

    if (window.innerWidth >= 1024 && containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const targetScroll = containerTop + ((index * (containerHeight - windowHeight)) / 2);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile / tablet: tabbed layout */}
      <section className="w-full bg-white px-6 py-20 text-gray-900 lg:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-6">
            {sections.map((sec, idx) => (
              <button
                key={sec.title}
                type="button"
                onClick={() => handleDialClick(idx)}
                className="relative text-left"
              >
                <span
                  className={`block text-2xl font-medium tracking-tight transition-all duration-300 font-[family-name:var(--font-inter-tight)] sm:text-3xl ${
                    activeIndex === idx ? "text-gray-900" : "text-gray-300"
                  }`}
                >
                  {sec.title}
                </span>
                {activeIndex === idx && (
                  <motion.div
                    layoutId="activeDialLineMobile"
                    className="absolute -left-3 top-1/2 h-full w-1 -translate-y-1/2 rounded-full"
                    style={{
                      background: "url('/caret-bg.png') repeat-y center",
                      backgroundSize: "8px 8px",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="mt-8 min-h-[200px]">
            <DialContent activeIndex={activeIndex} />
          </div>
        </div>
      </section>

      {/* Desktop: scroll-driven dial */}
      <section ref={containerRef} className="relative hidden h-[300vh] w-full bg-white text-gray-900 lg:block">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-6">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-24">
            <div className="z-10 flex flex-col justify-center gap-8">
              {sections.map((sec, idx) => (
                <button
                  key={sec.title}
                  type="button"
                  onClick={() => handleDialClick(idx)}
                  className="group relative text-left"
                >
                  <span
                    className={`block text-5xl font-medium tracking-tight transition-all duration-500 font-[family-name:var(--font-inter-tight)] ${
                      activeIndex === idx ? "translate-x-4 text-gray-900" : "text-gray-300 hover:text-gray-500"
                    }`}
                  >
                    {sec.title}
                  </span>
                  {activeIndex === idx && (
                    <motion.div
                      layoutId="activeDialLine"
                      className="absolute left-0 top-1/2 h-full w-1 -translate-y-1/2 rounded-full"
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

            <div className="relative z-10 flex h-[400px] max-w-xl flex-col justify-center">
              <DialContent activeIndex={activeIndex} />
            </div>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(800px,200vw)] w-[min(800px,200vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900/5 blur-[120px]" />
        </div>
      </section>
    </>
  );
}
