"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CaretRight } from "@phosphor-icons/react";
import type { Partner } from "../db/schema";

function PartnerTile({ name, url, imageUrl, className }: { name: string; url: string; imageUrl?: string | null; className: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex aspect-[4/3] items-center justify-center rounded-lg bg-[#f3f3f3] px-4 transition-colors hover:bg-[#ebebeb]"
      aria-label={`Visit ${name} website`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${name} logo`}
          className="max-h-full max-w-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      ) : (
        <span className={`text-center text-[15px] text-gray-800 ${className}`}>{name}</span>
      )}
      <span className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 opacity-100 shadow-sm transition-all sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:text-gray-900">
        <ArrowUpRight size={14} weight="bold" />
      </span>
    </a>
  );
}

export default function YebsPartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data.partners ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="border-y border-gray-100 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-sm text-gray-400">Loading partners...</p>
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section className="border-y border-gray-100 bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center md:gap-16">
        <div>
          <p className="text-xl leading-snug text-gray-500 md:text-2xl md:leading-snug">
            Join the{" "}
            <span className="font-semibold text-gray-900">organisations partnering with YEBS</span>{" "}
            to connect Ghana&apos;s youth to its energy future.
          </p>
          <Link
            href="#sponsor"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            Become a partner
            <CaretRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {partners.map((partner) => (
            <PartnerTile
              key={partner.id}
              name={partner.name}
              url={partner.url}
              imageUrl={partner.imageUrl}
              className={partner.className ?? "font-semibold"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
