"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import type { SpeakerProfile } from "../data/speakers";
import { speakers } from "../data/speakers";

export default function YebsSpeakersSection() {
  const [activeSpeaker, setActiveSpeaker] = useState<SpeakerProfile | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeSpeaker ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSpeaker]);

  return (
    <>
      <section id="speakers" className="scroll-mt-32 bg-[#111111] py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-14 max-w-2xl"
          >
            <h2 className="text-4xl font-normal tracking-tight md:text-5xl font-[family-name:var(--font-inter-tight)]">
              Speakers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
              Sector leaders, hiring managers, and mentors sharing insight on where Ghana&apos;s energy industry is headed.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {speakers.map((speaker, index) => (
              <motion.button
                key={speaker.id}
                type="button"
                initial={{ filter: "blur(8px)", opacity: 0, y: 20 }}
                whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
                onClick={() => setActiveSpeaker(speaker)}
                className="group text-left"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded bg-gray-800">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                </div>
                <p className="text-sm font-semibold text-white md:text-base">{speaker.name}</p>
                <p className="mt-1 text-xs leading-snug text-gray-400 md:text-sm">{speaker.title}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeSpeaker && (
          <SpeakerModal
            speaker={activeSpeaker}
            onClose={() => setActiveSpeaker(null)}
            onSelectSpeaker={setActiveSpeaker}
            allSpeakers={speakers}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SpeakerModal({
  speaker,
  onClose,
  onSelectSpeaker,
  allSpeakers,
}: {
  speaker: SpeakerProfile;
  onClose: () => void;
  onSelectSpeaker: (speaker: SpeakerProfile) => void;
  allSpeakers: SpeakerProfile[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 md:items-center md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white text-gray-900 shadow-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h3 className="text-lg font-semibold">Speaker profile</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-[240px_1fr]">
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="contents"
          >
            <div className="relative aspect-square md:aspect-auto md:min-h-[280px]">
              <Image src={speaker.image} alt={speaker.name} fill className="object-cover grayscale" />
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm text-gray-500">YEBS 2026</p>
              <h4 className="mt-2 text-3xl font-normal tracking-tight font-[family-name:var(--font-inter-tight)]">
                {speaker.name}
              </h4>
              <p className="mt-2 text-base text-gray-600">{speaker.title}</p>
              <p className="mt-6 leading-relaxed text-gray-700">{speaker.bio}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {speaker.topics.map((topic) => (
                  <span key={topic} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-100 px-6 py-5 md:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-400">All speakers</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {allSpeakers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSpeaker(item)}
                className={`shrink-0 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  item.id === speaker.id
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
