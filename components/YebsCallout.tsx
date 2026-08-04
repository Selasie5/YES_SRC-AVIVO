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
      className="group inline-flex w-full items-center justify-center rounded bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400 sm:w-auto"
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

type YebsCalloutProps = {
  variant?: "landing" | "page";
};

export default function YebsCallout({ variant = "landing" }: YebsCalloutProps) {
  const registerHref = variant === "page" ? "/yebs/register/delegate" : "/yebs/register/delegate";
  const sponsorHref = variant === "page" ? "/yebs/register/sponsor" : "/yebs/register/sponsor";
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
    if (variant === "page") {
      setIsSnapped(true);
      return;
    }

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
  }, [variant]);

  return (
    <section
      id={variant === "landing" ? "yebs" : undefined}
      ref={sectionRef}
      className={`relative flex flex-col min-h-[100dvh] w-full bg-[url('/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg')] bg-cover bg-center text-white overflow-hidden ${variant === "landing" ? "snap-start" : ""}`}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {variant === "landing" && (
        <div className="absolute top-8 left-4 right-4 z-10 flex flex-col gap-3 sm:left-6 sm:right-6 md:left-12 md:right-12 md:flex-row md:items-center md:justify-between md:gap-2">
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
      )}

      <div className="relative z-10 w-full flex-1 flex flex-col justify-end px-8 md:px-12 lg:px-24 pb-16 md:pb-24 pt-32">
        <div className="max-w-3xl">
          {variant === "page" && (
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
              animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
            >
              <span className="flex items-center gap-2 font-light font-[family-name:var(--font-inter-tight)] text-xs md:text-sm tracking-wide text-white/90">
                <MapPin size={14} weight="light" className="shrink-0" />
                ISSER Conference Center, Accra
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2 font-light font-[family-name:var(--font-inter-tight)] text-xs md:text-sm tracking-wide text-white/90">
                <CalendarBlank size={14} weight="light" className="shrink-0" />
                14 August 2026
                <span className="font-light tracking-widest text-white/75">
                  ({String(timeLeft.days).padStart(2, "0")}D:{String(timeLeft.hours).padStart(2, "0")}H:{String(timeLeft.minutes).padStart(2, "0")}M:{String(timeLeft.seconds).padStart(2, "0")}S)
                </span>
              </span>
            </motion.div>
          )}

          <motion.h2
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: variant === "page" ? 0.65 : 0.7 }}
            className="text-3xl md:text-5xl font-normal font-[family-name:var(--font-inter-tight)] mb-4 tracking-tight leading-tight"
          >
            The Youth Energy Bridge Summit
          </motion.h2>

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: variant === "page" ? 0.85 : 0.9 }}
            className="text-sm md:text-base text-gray-200 font-[family-name:var(--font-inter-tight)] mb-8 leading-relaxed max-w-2xl"
          >
            Our flagship platform, and the engine behind everything we do. YEBS brings together students, professionals, employers, and policymakers to build the talent pipeline powering Africa's energy future.
          </motion.p>

          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={isSnapped ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: variant === "page" ? 1.05 : 1.1 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <FlipButton href={registerHref} text="Register as a Delegate" />
            <Link
              href={sponsorHref}
              className="group inline-flex w-full items-center justify-center rounded bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200 sm:w-auto"
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
