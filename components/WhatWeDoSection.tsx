"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Talent Solutions",
    description: "From graduate recruitment to executive mentorship, we build pipelines that put the right people in front of employers.",
    image: "/hero-bg.png",
    gradient: "bg-gradient-to-b from-black/50 via-transparent to-black/10",
    link: "/services#talent",
  },
  {
    title: "Corporate Comms",
    description: "We help energy companies tell their story well — to regulators, communities, media, and investors.",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    gradient: "bg-gradient-to-b from-black/50 via-transparent to-black/10",
    link: "/services#communications",
  },
  {
    title: "Market Access",
    description: "We open doors. Partnership development, market entry strategy, and investment facilitation across West Africa.",
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
    gradient: "bg-gradient-to-b from-black/50 via-transparent to-black/10",
    link: "/services#business-development",
  },
];

export default function WhatWeDoSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <h2 className="text-5xl md:text-6xl font-normal font-[family-name:var(--font-inter-tight)] max-w-sm tracking-tight text-gray-900">
          What we do
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-xl">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We connect industry, talent, and opportunity — helping organisations build stronger workforces, communicate effectively, and develop strategic partnerships.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transition-all duration-500 ease-in-out ${hoveredIndex !== null && hoveredIndex !== index ? "flex-[0.6]" : ""
              } ${hoveredIndex === index ? "flex-[2]" : ""} ${hoveredIndex === null ? "flex-1" : ""
              }`}
          >
            <div className="h-[500px]">
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                gradient={service.gradient}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
