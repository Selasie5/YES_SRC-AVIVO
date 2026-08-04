"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CaretRight, CheckCircle } from "@phosphor-icons/react";
import confetti from "canvas-confetti";

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
    const formElement = event.currentTarget;
    setStatus("loading");
    setError("");

    const form = new FormData(formElement);
    const metadata: Record<string, any> = Object.fromEntries(
      [
        "linkedIn",
        "description",
        "experience",
        "skillsBuilding",
        "mainGoal",
        "whySelected",
        "physicalAttendance",
        "gradTraining",
        "fullyParticipate",
        "consentShare",
        "sponsorshipTier",
        "partnershipType",
      ]
        .map((key) => [key, form.get(key)?.toString() ?? ""])
        .filter(([, value]) => value)
    );

    if (type === "delegate") {
      metadata.sectors = form.getAll("sectors").map(String);
      metadata.opportunities = form.getAll("opportunities").map(String);
      metadata.valuableSessions = form.getAll("valuableSessions").map(String);
    }

    const payload = {
      type,
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      organization: form.get("organization") || form.get("universityOrg"),
      roleTitle: form.get("roleTitle") || form.get("programmeRole"),
      notes: form.get("notes"),
      metadata,
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
      formElement.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  }

  if (status === "success") {
    return <SuccessState />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {type === "delegate" ? (
        <>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Section 1: Basic Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Full Name" name="fullName" required />
              <Field label="Email Address" name="email" type="email" required />
              <Field label="Phone Number" name="phone" required />
              <Field label="LinkedIn Profile (optional)" name="linkedIn" type="url" />
              <Field label="University / Organisation" name="universityOrg" required />
              <Field label="Programme of Study / Job Role" name="programmeRole" required />
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Section 2: Background & Interest</h3>
            <SelectField label="Which best describes you?" name="description" options={["Student", "Graduate", "Young Professional", "Entrepreneur"]} required />
            <CheckboxGroup label="Which sector(s) are you most interested in?" name="sectors" options={["Oil & Gas", "Mining", "Energy (Power)", "Renewable / Climate", "Natural Resources", "Other"]} />
            <SelectField label="Do you have any experience in the energy or related sectors?" name="experience" options={["None", "Beginner (Courses / Interest)", "Intermediate (Internships / Projects)", "Advanced (Work Experience)"]} required />
            <div>
              <label htmlFor="skillsBuilding" className="mb-2 block text-sm font-medium text-gray-700">What skills or areas are you currently building?</label>
              <textarea id="skillsBuilding" name="skillsBuilding" rows={3} className="w-full rounded border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900" />
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Section 3: Opportunity Matching</h3>
            <CheckboxGroup label="What opportunities are you currently looking for?" name="opportunities" options={["Internships", "NSS Placement", "Full-time Jobs", "Mentorship"]} />
            <div>
              <label htmlFor="mainGoal" className="mb-2 block text-sm font-medium text-gray-700">What is your main goal for attending YEBS 2026?</label>
              <textarea id="mainGoal" name="mainGoal" rows={3} required className="w-full rounded border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900" />
            </div>
            <CheckboxGroup label="Which sessions would you find most valuable?" name="valuableSessions" options={["Renewable Energy Opportunities", "Career pathways in Oil & Gas", "Breaking into Mining", "Energy Entrepreneurship", "CV & Interview Workshops", "Networking with Industry Leaders"]} />
            <div>
              <label htmlFor="whySelected" className="mb-2 block text-sm font-medium text-gray-700">Why should you be selected as a delegate for YEBS 2026?</label>
              <textarea id="whySelected" name="whySelected" rows={4} required className="w-full rounded border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900" />
            </div>
            <SelectField label="Are you available to attend physically in Accra in August 2026?" name="physicalAttendance" options={["Yes", "No", "Maybe"]} required />
            <SelectField label="Would you like to be considered for the graduate training program?" name="gradTraining" options={["Yes", "No", "Other"]} required />
            <SelectField label="If selected, are you willing to fully participate in all summit activities?" name="fullyParticipate" options={["Yes", "No", "Maybe"]} required />
            <SelectField label="Do you consent to your information being shared with partner organisations for opportunities?" name="consentShare" options={["Yes", "No", "Maybe"]} required />
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Full name" name="fullName" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" />
            <Field label="Organisation" name="organization" />
            <Field label="Role / title" name="roleTitle" />
          </div>

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
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded bg-yellow-500 px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-yellow-400 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : content.submitLabel}
      </button>
    </form>
  );
}

function SuccessState() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#eab308', '#000000', '#ffffff', '#fbbf24']
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 text-center flex flex-col items-center justify-center"
    >
      <CheckCircle weight="fill" className="text-yellow-500 mb-4 h-16 w-16" />
      <h2 className="text-3xl font-normal text-gray-900 font-[family-name:var(--font-inter-tight)] tracking-tight">Registration received</h2>
      <p className="mt-3 text-gray-600 max-w-md mx-auto leading-relaxed">
        Thank you for registering. Our team will follow up with next steps shortly.
      </p>
      <Link href="/yebs" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-yellow-600 transition-colors">
        Back to YEBS <CaretRight size={14} weight="bold" />
      </Link>
    </motion.div>
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
        className="text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl md:text-5xl font-[family-name:var(--font-inter-tight)]"
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

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full rounded border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-900 bg-white"
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-start gap-2">
            <input
              type="checkbox"
              name={name}
              value={opt}
              className="mt-1 shrink-0 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

