"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { serviceUnits, type ServiceUnit } from "../data/services";

const textReveal = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
  exit: { filter: "blur(6px)", opacity: 0, y: -12 },
};

function unitFromHash(hash: string): ServiceUnit["id"] {
  if (hash === "communications") return "communications";
  if (hash === "business-development") return "business-development";
  return "talent";
}

export default function ServicesUnitsSection() {
  const [activeId, setActiveId] = useState<ServiceUnit["id"]>("talent");
  const [direction, setDirection] = useState(1);
  const active = serviceUnits.find((unit) => unit.id === activeId)!;

  const goToUnit = (id: ServiceUnit["id"]) => {
    setActiveId((current) => {
      const currentIndex = serviceUnits.findIndex((unit) => unit.id === current);
      const nextIndex = serviceUnits.findIndex((unit) => unit.id === id);
      setDirection(nextIndex >= currentIndex ? 1 : -1);
      return id;
    });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) goToUnit(unitFromHash(hash));
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-sm text-4xl font-normal tracking-tight text-gray-900 md:text-5xl font-[family-name:var(--font-inter-tight)]">
            What we deliver
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 md:text-base font-[family-name:var(--font-inter-tight)]">
            Each unit stands alone — but most clients start with one service and stay for more than
            one.
          </p>
        </div>

        <div className="relative mb-10 flex gap-1 border-b border-gray-200">
          {serviceUnits.map((unit) => {
            const isActive = activeId === unit.id;
            const Icon = unit.icon;
            return (
              <button
                key={unit.id}
                type="button"
                onClick={() => goToUnit(unit.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors font-[family-name:var(--font-inter-tight)] ${
                  isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon size={16} weight={isActive ? "fill" : "regular"} />
                {unit.shortTitle}
                {isActive && (
                  <motion.div
                    layoutId="servicesTabIndicator"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-gray-900"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {serviceUnits.map((unit) => (
          <div key={unit.id} id={unit.id} className="scroll-mt-32" aria-hidden={unit.id !== activeId} />
        ))}

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded bg-gray-100 lg:aspect-auto lg:min-h-[520px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={active.image} alt={active.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {active.number}
                  </span>
                  <p className="mt-1 text-lg font-medium text-white font-[family-name:var(--font-inter-tight)]">
                    {active.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={textReveal}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#78350f]">
                  {active.number}. {active.shortTitle}
                </p>
                <h3 className="mt-3 text-2xl font-normal leading-tight tracking-tight text-gray-900 md:text-3xl font-[family-name:var(--font-inter-tight)]">
                  {active.tagline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base font-[family-name:var(--font-inter-tight)]">
                  {active.description}
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 font-[family-name:var(--font-inter-tight)]">
                      Services include
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {active.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-start gap-2 text-sm text-gray-600 font-[family-name:var(--font-inter-tight)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded border border-gray-200 bg-gray-50 p-5">
                    <h4 className="text-sm font-semibold text-gray-900 font-[family-name:var(--font-inter-tight)]">
                      Who it&apos;s for
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 font-[family-name:var(--font-inter-tight)]">
                      {active.audience}
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-2 rounded bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
                >
                  Discuss {active.shortTitle.toLowerCase()}
                  <CaretRight weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
