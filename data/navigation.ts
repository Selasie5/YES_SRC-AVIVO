import type { Icon } from "@phosphor-icons/react";
import {
  Briefcase,
  Buildings,
  CalendarBlank,
  ChartLineUp,
  FileText,
  GraduationCap,
  Handshake,
  House,
  Lightning,
  Medal,
  Megaphone,
  Microphone,
  Newspaper,
  Target,
  Users,
} from "@phosphor-icons/react";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon: Icon;
};

export type NavColumn = {
  title: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href: string;
  columns?: NavColumn[];
};

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    columns: [
      {
        title: "Company",
        links: [
          { label: "About Afrovivo", href: "/about", icon: House, description: "Our story, mission, and vision" },
          { label: "What guides us", href: "/about#guides", icon: Target, description: "Principles behind our work" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        title: "Business units",
        links: [
          { label: "Talent & Workforce", href: "/services#talent", icon: Users, description: "Pipelines, recruitment, readiness" },
          { label: "Corporate Communications", href: "/services#communications", icon: Megaphone, description: "ESG, media, stakeholder engagement" },
          { label: "Business Development", href: "/services#business-development", icon: Handshake, description: "Partnerships and market access" },
        ],
      },
    ],
  },
  {
    label: "YEBS",
    href: "/yebs",
    columns: [
      {
        title: "Summit",
        links: [
          { label: "Overview", href: "/yebs", icon: CalendarBlank, description: "Youth Energy Bridge Summit 2026" },
          { label: "Speakers", href: "/yebs#speakers", icon: Microphone, description: "Sector leaders and mentors" },
        ],
      },
      {
        title: "Register",
        links: [
          { label: "Delegate registration", href: "/yebs/register/delegate", icon: GraduationCap, description: "Students and young professionals" },
          { label: "Sponsor registration", href: "/yebs/register/sponsor", icon: Medal, description: "Organisations sponsoring YEBS" },
          { label: "Partner registration", href: "/yebs/register/partner", icon: Buildings, description: "Institutions and programmes" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    columns: [
      {
        title: "Research",
        links: [
          { label: "All articles", href: "/insights", icon: Newspaper, description: "Sector intelligence and analysis" },
          { label: "Talent pipeline", href: "/insights/ghana-energy-talent-pipeline-2026", icon: ChartLineUp, description: "2026 workforce outlook" },
        ],
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    columns: [
      {
        title: "Get in touch",
        links: [
          { label: "Contact us", href: "/contact", icon: FileText, description: "General enquiries" },
          { label: "Work with us", href: "/contact", icon: Briefcase, description: "Talent, comms, and BD" },
        ],
      },
    ],
  },
];
