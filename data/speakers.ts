export type SpeakerProfile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  topics: string[];
};

export const speakers: SpeakerProfile[] = [
  {
    id: "1",
    name: "Dr. Ama Mensah",
    title: "Director of Energy Policy, Ministry of Energy",
    bio: "Dr. Mensah leads national workforce planning initiatives across Ghana's power and petroleum sectors, with a focus on youth employment and energy transition readiness.",
    image: "/hero-bg.jpg",
    topics: ["Policy", "Workforce planning", "Energy transition"],
  },
  {
    id: "2",
    name: "Kwesi Owusu",
    title: "VP Human Resources, Tullow Ghana",
    bio: "Kwesi oversees graduate recruitment and early-career development programmes across upstream operations, building pipelines from universities into technical roles.",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    topics: ["Upstream", "Graduate hiring", "Mentorship"],
  },
  {
    id: "3",
    name: "Efua Boateng",
    title: "Head of Renewables, VRA",
    bio: "Efua drives VRA's renewable integration strategy and champions cross-sector talent programmes connecting engineering graduates to clean power projects.",
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
    topics: ["Renewables", "Engineering", "Clean power"],
  },
  {
    id: "4",
    name: "Michael Adjei",
    title: "CEO, Afrovivo International",
    bio: "Michael founded Afrovivo to close the distance between Ghana's emerging energy talent and the organisations that need them — YEBS is the flagship expression of that mission.",
    image: "/hero-bg.jpg",
    topics: ["YEBS", "Talent", "Industry partnerships"],
  },
  {
    id: "5",
    name: "Sarah Nkrumah",
    title: "ESG & Communications Lead, Newmont Africa",
    bio: "Sarah helps mining and energy companies communicate credibly on sustainability, community engagement, and the social licence to operate.",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    topics: ["ESG", "Communications", "Mining"],
  },
  {
    id: "6",
    name: "Daniel Kofi",
    title: "Graduate Programme Manager, GOIL",
    bio: "Daniel designs and runs GOIL's early-career programmes, connecting petroleum marketing talent with structured development pathways across retail and supply.",
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
    topics: ["Downstream", "Graduate programmes", "Retail energy"],
  },
  {
    id: "7",
    name: "Abena Osei",
    title: "Partner, ISSER Research",
    bio: "Abena researches labour market dynamics in Ghana's natural resource sectors and advises institutions on youth employment and skills development policy.",
    image: "/hero-bg.jpg",
    topics: ["Research", "Labour markets", "Policy"],
  },
  {
    id: "8",
    name: "James Tetteh",
    title: "Founder, Energy Talent Network",
    bio: "James builds community platforms for young energy professionals and connects early-career talent to mentors, internships, and sector insight.",
    image: "/two-women-sits-at-a-table-in-a-cafe-smiling-they-are-both-resting-their-chin-on-their-left-hand-and-they-both-have-their-hair-pulled-back-there-is-an-open-laptop-in-front-of-them-on-the-table-and-a-8aefc539.jpeg",
    topics: ["Community", "Internships", "Career development"],
  },
  {
    id: "9",
    name: "Nana Yaa Asare",
    title: "Head of Power Systems, ECG",
    bio: "Nana Yaa leads technical recruitment and training for Ghana's power distribution workforce, with emphasis on field-ready graduate engineers.",
    image: "/a-man-and-woman-are-sitting-on-a-couch-while-the-man-works-on-his-laptop-they-are-both-looking-at-the-laptop-while-the-woman-is-leaning-in-towards-the-man-they-are-both-wearing-casual-clothing-and-t-59c81072.jpg",
    topics: ["Power", "Engineering", "Training"],
  },
];
