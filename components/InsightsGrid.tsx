"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { InsightArticle } from "../data/insights";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardReveal = {
  hidden: { filter: "blur(8px)", opacity: 0, y: 24 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

function InsightCard({ article }: { article: InsightArticle }) {
  return (
    <motion.article variants={cardReveal}>
      <Link href={`/insights/${article.slug}`} className="group block">
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded bg-gray-100">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <p className="mb-3 text-sm text-gray-500">
          {article.date} &bull; {article.readTime}
        </p>

        <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-gray-600 font-[family-name:var(--font-inter-tight)]">
          {article.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
          {article.excerpt}
        </p>
      </Link>
    </motion.article>
  );
}

export default function InsightsGrid({ articles }: { articles: InsightArticle[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
    >
      {articles.map((article) => (
        <InsightCard key={article.slug} article={article} />
      ))}
    </motion.section>
  );
}
