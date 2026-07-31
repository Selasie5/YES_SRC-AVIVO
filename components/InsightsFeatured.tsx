"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { InsightArticle } from "../data/insights";

const textReveal = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export default function InsightsFeatured({ article }: { article: InsightArticle }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link
        href={`/insights/${article.slug}`}
        className="group block overflow-hidden rounded bg-[#111111] text-white"
      >
        <div className="grid md:min-h-[420px] md:grid-cols-2">
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={textReveal}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="mb-6 text-sm text-gray-400"
              >
                {article.date} &bull; {article.readTime}
              </motion.p>

              <motion.h2
                initial="hidden"
                animate="visible"
                variants={textReveal}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
                className="max-w-lg text-3xl font-normal leading-tight tracking-tight md:text-4xl font-[family-name:var(--font-inter-tight)]"
              >
                {article.title}
              </motion.h2>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={textReveal}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-sm font-semibold">
                AV
              </div>
              <div>
                <p className="text-sm font-medium">{article.author}</p>
                <p className="text-sm text-gray-400">{article.role}</p>
              </div>
            </motion.div>
          </div>

          <div className="relative min-h-[240px] overflow-hidden bg-[#1a1a1a] md:min-h-full">
            <Image
              src={article.image}
              alt=""
              fill
              className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/80 via-transparent to-[#111111]/60" />

            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-400">Afrovivo Insights</p>
              <p className="max-w-xs text-2xl font-normal leading-snug tracking-tight md:text-3xl font-[family-name:var(--font-inter-tight)]">
                {article.title}
              </p>
              {article.highlight && (
                <p className="mt-6 text-4xl font-semibold tracking-tight text-yellow-500 md:text-5xl">
                  {article.highlight}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
