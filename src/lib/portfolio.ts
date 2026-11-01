/**
 * Central source of truth for all portfolio content.
 * Only verified, provided information lives here — no fabricated
 * links, clients, awards, or statistics.
 */

export const personalInfo = {
  name: "Aryan Mandavgode",
  firstName: "Aryan",
  title: "Full-Stack Developer | Founder of ARYONIX",
  headline: "Building digital experiences that make an impact.",
  intro:
    "I'm Aryan, a Computer Science Engineering student, Full-Stack Developer, and Founder of ARYONIX. I design and build modern websites, applications, and digital products.",
  email: "aryanmandavgode@gmail.com",
  location: "Pune, Maharashtra, India",
  shortLocation: "Pune, India",
  education: "B.Tech Computer Science Engineering",
  university: "Ajeenkya DY Patil University",
  educationDuration: "2024–2028",
  linkedin: "https://www.linkedin.com/in/aryan-mandavgode/",
  github: "https://github.com/aryanmandavgode-aryonix",
  company: "https://www.aryonix.in/",
  resumePath: "/resume-aryan-mandavgode.pdf",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export type SkillCategory = {
  title: string;
  icon: "code" | "server" | "database" | "tools" | "pen";
  featured?: boolean;
  skills: readonly string[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    title: "Frontend",
    icon: "code",
    featured: true,
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: "server",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: "database",
    skills: ["MongoDB", "SQL", "Prisma"],
  },
  {
    title: "Tools",
    icon: "tools",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
  },
  {
    title: "Design",
    icon: "pen",
    skills: ["UI/UX Design", "Responsive Design", "Web Design"],
  },
] as const;

export type Project = {
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
  href?: string;
  linkLabel?: string;
  status?: "In Development" | "Concept" | "Live";
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    title: "ARYONIX",
    description:
      "A digital development agency focused on websites, applications, software, and SaaS products.",
    image: "/images/project-aryonix-website.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    href: "https://www.aryonix.in/",
    linkLabel: "View Project",
    status: "Live",
    featured: true,
  },
  {
    title: "New Dimension",
    description:
      "A cinematic website redesign concept for New Dimension, an interior design studio in Nagpur — prepared by ARYONIX as a prospective-client demonstration.",
    image: "/images/project-new-dimension-website.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Concept",
  },
  {
    title: "Waffle Castle",
    description:
      "A premium homepage concept built for Waffle Castle Nagpur, featuring the store's real menu board, dishes, and location.",
    image: "/images/project-waffle-castle.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX Design"],
    status: "Concept",
  },
  {
    title: "Rockfold Fitness",
    description:
      "A cinematic single-page website concept for a fitness studio in Wagholi, Pune — built around bold typography and a premium visual identity.",
    image: "/images/project-rockfold-fitness.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    status: "Concept",
  },
  {
    title: "AgencyOS",
    description:
      "A SaaS concept designed to streamline agency operations, project management, clients, and workflows.",
    image: "/images/project-agencyos.png",
    tags: ["Next.js", "TypeScript", "Prisma", "REST APIs"],
    status: "In Development",
  },
  {
    title: "Elevate Fitness",
    description:
      "A modern fitness website concept with a premium visual identity and responsive experience.",
    image: "/images/project-elevate-fitness.png",
    tags: ["React", "Tailwind CSS", "UI/UX Design"],
    status: "Concept",
  },
  {
    title: "Fitniq",
    description:
      "A gym website development project focused on presenting fitness services and membership information.",
    image: "/images/project-fitniq.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Web Design"],
    status: "Live",
  },
] as const;

export const experience = [
  {
    role: "Founder & Full-Stack Developer",
    company: "ARYONIX",
    companyHref: "https://www.aryonix.in/",
    period: "December 2025 – Present",
    summary:
      "Building a digital development agency that helps businesses establish and grow their presence online.",
    points: [
      "Design and build websites and digital products for real business needs.",
      "Own frontend and backend development, from architecture to deployment.",
      "Lead UI/UX design decisions with a focus on clarity and usability.",
      "Work directly with clients to shape focused, practical digital solutions.",
    ],
  },
] as const;

export const education = {
  degree: "B.Tech Computer Science Engineering",
  university: "Ajeenkya DY Patil University",
  period: "2024–2028",
  summary:
    "Studying the foundations of computer science while applying them to real products — from coursework to shipping web applications with ARYONIX.",
} as const;
