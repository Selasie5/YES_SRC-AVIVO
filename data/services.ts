import type { Icon } from "@phosphor-icons/react";
import { Handshake, Megaphone, Users } from "@phosphor-icons/react";

export type ServiceUnit = {
  id: "talent" | "communications" | "business-development";
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: Icon;
  image: string;
  services: string[];
  audience: string;
};

export const serviceUnits: ServiceUnit[] = [
  {
    id: "talent",
    number: "01",
    title: "Talent & Workforce Solutions",
    shortTitle: "Talent",
    tagline: "Africa's energy sector needs people who are ready on day one.",
    description:
      "We build the pipelines that get them there — from graduate recruitment and internship placement to executive mentorship and workforce consulting.",
    icon: Users,
    image: "/hero-bg.jpg",
    services: [
      "Energy Talent Database",
      "Graduate Recruitment",
      "Internship & National Service Placement Programmes",
      "Graduate Readiness Training",
      "Corporate Graduate Programmes",
      "Employer Branding",
      "Executive Mentorship",
      "Workforce Development Consulting",
    ],
    audience:
      "Oil & gas operators, IPPs, mining companies, EPC firms, and utilities looking to build a sector-ready, locally-compliant workforce.",
  },
  {
    id: "communications",
    number: "02",
    title: "Corporate Communications & Stakeholder Engagement",
    shortTitle: "Communications",
    tagline: "In a sector where trust is currency, how you communicate matters as much as what you build.",
    description:
      "We help energy companies tell their story credibly — to regulators, communities, media, and investors.",
    icon: Megaphone,
    image:
      "/cse.jpg",
    services: [
      "Corporate Communications Strategy",
      "ESG & Sustainability Communications",
      "CSR Strategy",
      "Internal Communications",
      "Media Relations",
      "Executive Thought Leadership",
      "Crisis Communications Support",
      "Annual Reports",
      "Stakeholder Engagement",
      "Corporate Events & Conferences",
    ],
    audience:
      "Energy companies, DFIs, and NGOs needing to communicate credibly with regulators, communities, media, and investors.",
  },
  {
    id: "business-development",
    number: "03",
    title: "Business Development & Market Access",
    shortTitle: "Market Access",
    tagline: "We open the doors that take time, relationships, and local knowledge to open alone.",
    description:
      "Partnership development, market entry strategy, and investment facilitation across Ghana and West Africa's energy sector.",
    icon: Handshake,
    image:
      "/market-access.jpg",
    services: [
      "Partnership Development",
      "B2B Matchmaking",
      "Market Entry Strategy",
      "Investment Facilitation",
      "Government & Institutional Engagement",
      "Strategic Advisory",
      "Sales Representation",
      "Industry Forums & Networking Platforms",
    ],
    audience:
      "Local and international companies looking to enter, expand, or deepen their footprint in Ghana and West Africa's energy sector.",
  },
];

export const howWeWorkSteps = [
  { label: "Diagnose", description: "Understand your actual need — not a generic package." },
  { label: "Design", description: "Scope a clear proposal with defined outcomes." },
  { label: "Deliver", description: "Execute with a named account lead on every engagement." },
  { label: "Deepen", description: "Check in quarterly to see where else we can help." },
];
