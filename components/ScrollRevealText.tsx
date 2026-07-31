"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollRevealText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const paragraphText =
    "Afrovivo exists to close that gap — connecting the continent's brightest young talent to its most consequential industries, and helping the companies driving that industry engage their people, their partners, and their public with clarity and credibility.";

  const words = paragraphText.split(" ");

  return (
    <section ref={sectionRef} className="relative bg-white px-6 py-20 md:py-40">
      <div className="max-w-5xl mx-auto">
        <p className="text-xl font-light leading-[1.25] tracking-tight font-[family-name:var(--font-inter-tight)] sm:text-2xl md:text-4xl lg:text-[3rem]">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = start + 0.04;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            return (
              <motion.span
                key={index}
                style={{ opacity }}
                className="inline-block mr-[0.25em] text-black"
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
