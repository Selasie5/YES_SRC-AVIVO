export type InsightArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  role: string;
  featured?: boolean;
  highlight?: string;
};

export const insights: InsightArticle[] = [
  {
    slug: "ghana-energy-talent-pipeline-2026",
    title: "The state of Ghana's energy talent pipeline: a 2026 outlook",
    excerpt:
      "Where hiring is heading across oil and gas, power, mining, and renewables — and what it means for graduates entering the sector this year.",
    date: "July 29, 2026",
    readTime: "6 min read",
    image: "/hero-bg.jpg",
    author: "Afrovivo Research",
    role: "Sector Intelligence",
    featured: true,
    highlight: "YEBS 2026",
  },
  {
    slug: "future-ghana-energy-workforce",
    title: "The future of Ghana's energy workforce",
    excerpt:
      "An analysis of emerging skill requirements as the sector transitions toward cleaner power and more complex upstream operations.",
    date: "July 17, 2026",
    readTime: "5 min read",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    author: "Afrovivo Research",
    role: "Workforce",
  },
  {
    slug: "upstream-evolution-west-africa",
    title: "Upstream evolution in West Africa",
    excerpt:
      "Tracing the developmental milestones of the region's oil and gas discoveries — and the talent implications at each stage.",
    date: "July 10, 2026",
    readTime: "7 min read",
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
    author: "Afrovivo Research",
    role: "Energy History",
  },
  {
    slug: "yebs-2026-preview",
    title: "What to expect at YEBS 2026",
    excerpt:
      "Employer showcases, mentorship, and networking built for outcomes — a preview of the summit programming ahead of August.",
    date: "June 28, 2026",
    readTime: "4 min read",
    image: "/hero-bg.jpg",
    author: "YEBS Team",
    role: "Events",
  },
  {
    slug: "sector-ready-graduates",
    title: "What sector-ready actually means for energy hires",
    excerpt:
      "Employers say they want industry-ready talent. We break down what that looks like in practice — beyond the buzzword.",
    date: "June 14, 2026",
    readTime: "5 min read",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    author: "Afrovivo Research",
    role: "Talent",
  },
  {
    slug: "esg-communications-energy",
    title: "ESG communications that hold up under scrutiny",
    excerpt:
      "How energy companies can tell credible sustainability stories to regulators, communities, and investors without overclaiming.",
    date: "May 30, 2026",
    readTime: "6 min read",
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
    author: "Afrovivo Research",
    role: "Communications",
  },
  {
    slug: "mining-renewables-talent-gaps",
    title: "Mining and renewables: where the talent gaps are widest",
    excerpt:
      "Two sub-sectors moving at different speeds — and the graduate skills mismatch holding both back.",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "/hero-bg.jpg",
    author: "Afrovivo Research",
    role: "Sector Intelligence",
  },
];

export const featuredInsight = insights.find((article) => article.featured)!;
export const insightArticles = insights.filter((article) => !article.featured);
