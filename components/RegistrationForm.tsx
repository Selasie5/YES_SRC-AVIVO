"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";

type RegistrationType = "delegate" | "sponsor" | "partner";

const copy: Record<
  RegistrationType,
  { title: string; subtitle: string; submitLabel: string }
> = {
  delegate: {
    title: "Register as a Delegate",
    subtitle: "Join YEBS 2026 and put yourself in front of the companies hiring across Ghana's energy sector.",
    submitLabel: "Submit delegate registration",
  },
  sponsor: {
    title: "Sponsor YEBS 2026",
    subtitle: "Put your organisation in front of Ghana's most promising energy-sector talent.",
    submitLabel: "Submit sponsor registration",
  },
  partner: {
    title: "Partner with YEBS",
    subtitle: "Universities, agencies, and development organisations — extend your reach through the summit.",
    submitLabel: "Submit partner registration",
  },
};

export default function RegistrationForm({ type }: { type: RegistrationType }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const content = copy[type];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      type,
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      organization: form.get("organization"),
      roleTitle: form.get("roleTitle"),
      notes: form.get("notes"),
      metadata: Object.fromEntries(
        ["university", "fieldOfStudy", "graduationYear", "sponsorshipTier", "partnershipType"]
          .map((key) => [key, form.get(key)?.toString() ?? ""])
          .filter(([, value]) => value)
      ),
    };

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Registration failed");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Registration received</h2>
        <p className="mt-3 text-gray-600">
          Thank you for registering. Our team will follow up with next steps shortly.
        </p>
        <Link href="/yebs" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
          Back to YEBS <CaretRight size={14} weight="bold" />
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name" name="fullName" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" />
        <Field label="Organisation" name="organization" />
        <Field label="Role / title" name="roleTitle" />
      </div>

      {type === "delegate" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="University / institution" name="university" />
          <Field label="Field of study" name="fieldOfStudy" />
          <Field label="Expected graduation year" name="graduationYear" />
        </div>
      )}

      {type === "sponsor" && (
        <Field
          label="Sponsorship tier interest"
          name="sponsorshipTier"
          placeholder="Platinum, Gold, Silver, or Bronze"
        />
      )}

      {type === "partner" && (
        <Field
          label="Partnership type"
          name="partnershipType"
          placeholder="University, government, development organisation, etc."
        />
      )}

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-700">
          Additional notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full rounded border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : content.submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900"
      />
    </div>
  );
}

export function RegistrationHeader({ type }: { type: RegistrationType }) {
  const content = copy[type];
  return (
    <header className="mb-12 max-w-2xl">
      <motion.h1
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-normal tracking-tight text-gray-900 md:text-5xl font-[family-name:var(--font-inter-tight)]"
      >
        {content.title}
      </motion.h1>
      <motion.p
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="mt-4 text-lg leading-relaxed text-gray-600"
      >
        {content.subtitle}
      </motion.p>
    </header>
  );
}
