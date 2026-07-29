"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Buildings, CaretRight, GraduationCap, Medal, type Icon } from "@phosphor-icons/react";

type TabId = "partners" | "sponsors" | "delegates";

type Tab = {
  id: TabId;
  label: string;
  icon: Icon;
  hash: string;
  headline: string;
  description: string;
  cta: { href: string; label: string };
  image: string;
};

const tabs: Tab[] = [
  {
    id: "partners",
    label: "For Partners",
    icon: Buildings,
    hash: "partners",
    headline: "Extend your reach through Ghana's flagship energy talent platform.",
    description:
      "Universities, government agencies, and development organisations are core to what YEBS achieves. If you're building youth employment, workforce development, or energy-transition programming, YEBS can extend your reach.",
    cta: { href: "/contact", label: "Partner with us" },
    image: "/hero-bg.png",
  },
  {
    id: "sponsors",
    label: "For Sponsors",
    icon: Medal,
    hash: "sponsor",
    headline: "Put your organisation in front of Ghana's most promising energy talent.",
    description:
      "Sponsoring YEBS puts your organisation in front of Ghana's most promising energy-sector talent — and starts a relationship with Afrovivo that extends well beyond the summit itself.",
    cta: { href: "/contact", label: "Become a sponsor" },
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
  },
  {
    id: "delegates",
    label: "For Delegates",
    icon: GraduationCap,
    hash: "register",
    headline: "Start your energy career where the hiring actually happens.",
    description:
      "If you're a student, recent graduate, or young professional building a future in energy, YEBS is where that future gets a running start. Register to attend and put yourself in front of the companies actually hiring.",
    cta: { href: "/contact", label: "Register to attend" },
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
  },
];

function FlipButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center rounded bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
    >
      <div className="relative flex h-5 items-center overflow-hidden">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          <span className="flex h-5 items-center gap-2">
            {text} <CaretRight weight="bold" className="text-xs" />
          </span>
        </div>
        <div className="absolute inset-0 flex translate-y-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
          <span className="flex h-5 items-center gap-2">
            {text} <CaretRight weight="bold" className="text-xs" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function tabFromHash(hash: string): TabId {
  if (hash === "sponsor") return "sponsors";
  if (hash === "register") return "delegates";
  if (hash === "partners") return "partners";
  return "partners";
}

const textReveal = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
  exit: { filter: "blur(6px)", opacity: 0, y: -12 },
};

export default function YebsAudienceSection() {
  const [activeTab, setActiveTab] = useState<TabId>("partners");
  const [direction, setDirection] = useState(1);
  const active = tabs.find((tab) => tab.id === activeTab)!;

  const goToTab = (tabId: TabId) => {
    setActiveTab((current) => {
      const currentIndex = tabs.findIndex((tab) => tab.id === current);
      const nextIndex = tabs.findIndex((tab) => tab.id === tabId);
      if (nextIndex !== currentIndex) {
        setDirection(nextIndex > currentIndex ? 1 : -1);
      }
      return tabId;
    });
  };

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) goToTab(tabFromHash(hash));
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const selectTab = (tab: Tab) => {
    goToTab(tab.id);
    window.history.replaceState(null, "", `#${tab.hash}`);
  };

  return (
    <>
      <div id="partners" className="scroll-mt-32" aria-hidden />
      <div id="sponsor" className="scroll-mt-32" aria-hidden />
      <div id="register" className="scroll-mt-32" aria-hidden />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded bg-white">
            <div className="relative flex flex-wrap items-end bg-white pt-4 md:pt-6" role="tablist">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => selectTab(tab)}
                    role="tab"
                    aria-selected={isActive}
                    className={`relative flex items-center gap-2.5 px-4 py-3 md:gap-3 md:px-5 md:py-3.5 ${
                      isActive ? "z-10 text-gray-900" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="yebs-audience-tab-indicator"
                        className="absolute inset-0 bg-[#f3f1ed] shadow-[inset_0_3px_10px_rgba(0,0,0,0.06)]"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5 md:gap-3">
                      <Icon size={18} weight={isActive ? "fill" : "regular"} />
                      <span className={`text-sm md:text-base ${isActive ? "font-medium" : "font-normal"}`}>
                        {tab.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              className="grid overflow-hidden bg-[#f3f1ed] md:min-h-[520px] md:grid-cols-2"
            >
              <div className="flex flex-col justify-between p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-headline`}
                    initial={textReveal.initial}
                    animate={textReveal.animate}
                    exit={textReveal.exit}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                  >
                    <h2 className="max-w-lg text-3xl font-normal leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15] font-[family-name:var(--font-inter-tight)]">
                      {active.headline}
                    </h2>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-12 max-w-md space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${activeTab}-description`}
                      initial={textReveal.initial}
                      animate={textReveal.animate}
                      exit={textReveal.exit}
                      transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                      className="text-sm leading-relaxed text-gray-600 md:text-[15px]"
                    >
                      {active.description}
                    </motion.p>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-cta`}
                      initial={textReveal.initial}
                      animate={textReveal.animate}
                      exit={textReveal.exit}
                      transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
                    >
                      <FlipButton href={active.cta.href} text={active.cta.label} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden md:min-h-full">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    initial={{ x: direction >= 0 ? "100%" : "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: direction >= 0 ? "-100%" : "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
