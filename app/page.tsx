"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DiscordWidget from "./components/DiscordWidget";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.5,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center text-zinc-100 font-sans">
      <Navbar />
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-zinc-100 sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 md:gap-12">
        <motion.div
          className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center sm:items-start sm:text-left px-2 w-full sm:w-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="max-w-xs sm:max-w-sm md:max-w-md text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-7 sm:leading-8 md:leading-10 tracking-tight text-zinc-100 font-[family-name:var(--font-kanit)]"
            variants={fadeUpVariants}
          >
            Welcome! ยินดีต้อนรับ!
          </motion.h1>
          <motion.p
            className="max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-zinc-200 font-[family-name:var(--font-kanit)]"
            variants={fadeUpVariants}
          >
            Welcome to my personal website! But unfortunately, it's still a work in progress. Come back later!
          </motion.p>
          <motion.p
            className="max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-zinc-200 font-[family-name:var(--font-kanit)]"
            variants={fadeUpVariants}
          >
            เว็บไซต์ส่วนตัวยังอยู่ในระหว่างการพัฒนา โปรดกลับมาใหม่ในภายหลัง.
          </motion.p>
          <motion.p
            className="max-w-xs sm:max-w-sm md:max-w-md text-xs sm:text-sm md:text-base lg:text-xl leading-5 sm:leading-6 md:leading-7 lg:leading-8 text-zinc-600 dark:text-zinc-400"
            variants={fadeUpVariants}
          >
            <span className="font-[family-name:var(--font-geist-pixel-square)]">Visit my bio: </span><a href="https://haunt.gg/fumi" className="text-blue-500 hover:underline font-[family-name:var(--font-geist-pixel-square)]">Here</a>
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-md aspect-[340/220] shrink-0 mt-4 sm:mt-0"
          variants={slideInRightVariants}
          initial="hidden"
          animate="visible"
        >
          <Suspense
            fallback={
              <div className="w-full h-full rounded-lg bg-zinc-800/50 animate-pulse" />
            }
          >
            <DiscordWidget />
          </Suspense>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
