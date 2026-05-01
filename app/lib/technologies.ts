export interface Technology {
  name: string;
  description: string;
  url: string;
  category: "framework" | "language" | "library" | "tool" | "deployment" | "font";
}

export const technologies: Technology[] = [
  {
    name: "Next.js",
    description: "React framework for production-grade applications with App Router",
    url: "https://nextjs.org",
    category: "framework",
  },
  {
    name: "React",
    description: "JavaScript library for building user interfaces",
    url: "https://react.dev",
    category: "library",
  },
  {
    name: "TypeScript",
    description: "Typed superset of JavaScript for robust development",
    url: "https://www.typescriptlang.org",
    category: "language",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid styling",
    url: "https://tailwindcss.com",
    category: "library",
  },
  {
    name: "Vercel",
    description: "Edge computing platform for deploying serverless functions",
    url: "https://vercel.com",
    category: "deployment",
  },
  {
    name: "Geist Sans",
    description: "Modern sans-serif font by Vercel",
    url: "https://vercel.com/font",
    category: "font",
  },
  {
    name: "Geist Mono",
    description: "Monospace font by Vercel for code and technical content",
    url: "https://vercel.com/font",
    category: "font",
  },
  {
    name: "Geist Pixel Square",
    description: "Pixel-style font by Vercel for retro aesthetics",
    url: "https://vercel.com/font",
    category: "font",
  },
  {
    name: "Kanit",
    description: "Thai font from Google Fonts with multiple weights",
    url: "https://fonts.google.com/specimen/Kanit",
    category: "font",
  },
  {
    name: "Framer Motion",
    description: "Production-ready motion library for React animations and gestures",
    url: "https://motion.dev",
    category: "library",
  },
  {
    name: "anime.js",
    description: "Lightweight JavaScript animation library for fine-grained DOM effects",
    url: "https://animejs.com",
    category: "library",
  },
];
