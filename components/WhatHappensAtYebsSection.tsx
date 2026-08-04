import Image from "next/image";

const highlights = [
  {
    title: "Keynotes & Panels",
    description:
      "Energy sector leaders, policymakers, and entrepreneurs share insight on where Ghana's industry is headed — and what it takes to build a career inside it.",
    image: "/keynotes.jpg",
    gradient: "bg-gradient-to-b from-black/50 via-transparent to-black/60",
  },
  {
    title: "Employer Showcases",
    description:
      "Companies connect directly with vetted student and graduate talent — putting hiring organisations in the same room as the people they want to reach.",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    gradient: "bg-gradient-to-b from-black/50 via-transparent to-black/60",
  },
  {
    title: "Mentorship & Networking",
    description:
      "Rising professionals meet sector veterans in structured mentorship sessions — with networking built for outcomes, not just badges and business cards.",
    image: "/mentors.jpg",
    gradient: "bg-gradient-to-b from-black/50 via-transparent to-black/60",
  },
];

function YebsHighlightCard({
  title,
  description,
  image,
  gradient,
}: {
  title: string;
  description: string;
  image: string;
  gradient: string;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded border border-gray-100">
      <Image src={image} alt={title} fill className="absolute inset-0 z-0 object-cover" />
      <div className={`absolute inset-0 z-0 ${gradient}`} />

      <span className="relative z-10 inline-flex items-center p-8 pb-4 text-[1.35rem] font-medium text-white drop-shadow-md font-[family-name:var(--font-inter-tight)]">
        {title}
      </span>

      <div className="relative z-10 mt-auto p-6 pt-0">
        <div className="rounded bg-black/45 p-5 backdrop-blur-[2px]">
          <p className="text-sm font-medium leading-relaxed text-white/90 font-[family-name:var(--font-inter-tight)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhatHappensAtYebsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-sm text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)]">
          What happens at YEBS
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
          A full day of programming designed to connect talent and employers — with keynotes, showcases, mentorship, and networking that leads somewhere.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {highlights.map((highlight) => (
          <div key={highlight.title} className="flex-1">
            <div className="h-[260px] sm:h-[320px] md:h-[500px]">
              <YebsHighlightCard
                title={highlight.title}
                description={highlight.description}
                image={highlight.image}
                gradient={highlight.gradient}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
