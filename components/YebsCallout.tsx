"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, CalendarBlank, CaretRight } from "@phosphor-icons/react";

const targetDate = new Date("2026-08-14T00:00:00").getTime();

function FlipButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center px-6 py-3 rounded text-sm font-semibold transition-colors bg-yellow-500 text-black hover:bg-yellow-400"
    >
      <div className="relative flex items-center h-5 overflow-hidden">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          <span className="flex items-center gap-2 h-5">
            {text} <CaretRight weight="bold" className="text-xs" />
          </span>
        </div>
        <div className="absolute inset-0 flex flex-col translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
          <span className="flex items-center gap-2 h-5">
            {text} <CaretRight weight="bold" className="text-xs" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function YebsCallout() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isSnapped, setIsSnapped] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.8) {
          setIsSnapped(true);
        } else {
          setIsSnapped(false);
        }
      },
      { threshold: [0, 0.2, 0.8, 1] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[url('/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg')] bg-cover bg-center text-white overflow-hidden snap-start"
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Top: Location & Date */}
      <div className="absolute top-8 left-6 right-6 md:left-12 md:right-12 z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={isSnapped ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <MapPin size={14} weight="light" className="text-white shrink-0" />
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={isSnapped ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="font-light font-[family-name:var(--font-inter-tight)] text-xs md:text-sm tracking-wide"
          >
            ISSER Conference Center, Accra
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={isSnapped ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <CalendarBlank size={14} weight="light" className="text-white shrink-0" />
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={isSnapped ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="font-light font-[family-name:var(--font-inter-tight)] text-xs md:text-sm tracking-wide"
          >
            14 August 2026
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={isSnapped ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="font-[family-name:var(--font-inter-tight)] text-xs md:text-sm font-light tracking-widest text-white/90"
          >
            ({String(timeLeft.days).padStart(2, "0")}D:{String(timeLeft.hours).padStart(2, "0")}H:{String(timeLeft.minutes).padStart(2, "0")}M:{String(timeLeft.seconds).padStart(2, "0")}S)
          </motion.span>
        </motion.div>
      </div>

      {/* Remove old position divs */}

      {/* Bottom: Heading, Subtext & Buttons */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-8 md:px-12 lg:px-24 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-3xl md:text-5xl font-normal font-[family-name:var(--font-inter-tight)] mb-4 tracking-tight leading-tight"
          >
            The Youth Energy Bridge Summit
          </motion.h2>

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-sm md:text-base text-gray-200 font-[family-name:var(--font-inter-tight)] mb-8 leading-relaxed max-w-2xl"
          >
            Our flagship platform, and the engine behind everything we do. YEBS brings together students, professionals, employers, and policymakers to build the talent pipeline powering Africa's energy future.
          </motion.p>

          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4 font-[family-name:var(--font-inter-tight)]"
          >
            <FlipButton href="/yebs#register" text="Register as a Delegate" />
            <Link
              href="/yebs#sponsor"
              className="group inline-flex items-center justify-center px-6 py-3 rounded text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-200"
            >
              <div className="relative flex items-center h-5 overflow-hidden">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  <span className="flex items-center gap-2 h-5">
                    Become a Sponsor <CaretRight weight="bold" className="text-xs" />
                  </span>
                </div>
                <div className="absolute inset-0 flex flex-col translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                  <span className="flex items-center gap-2 h-5">
                    Become a Sponsor <CaretRight weight="bold" className="text-xs" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
