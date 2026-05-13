"use client";

import { Suspense } from "react";
import DiscordWidget from "./DiscordWidget";

export default function HomeContent() {
  return (
    <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-zinc-100 sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 md:gap-12 mx-auto">
      <div
        className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center sm:items-start sm:text-left px-2 w-full sm:w-auto animate-staggerFadeIn"
      >
        <h1
          className="max-w-xs sm:max-w-sm md:max-w-md text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-8 sm:leading-8 md:leading-10 tracking-tight text-white font-[family-name:var(--font-chakra-petch)] animate-fadeUp"
          style={{ textShadow: "0 0 30px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 80px rgba(255, 255, 255, 0.2)", animationDelay: "100ms" }}
        >
          Welcome! ยินดีต้อนรับ!
        </h1>
        <p
          className="max-w-xs sm:max-w-sm md:max-w-md text-base sm:text-sm md:text-lg leading-7 sm:leading-6 md:leading-8 text-zinc-200 font-[family-name:var(--font-chakra-petch)] animate-fadeUp"
          style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)", animationDelay: "180ms" }}
        >
          Welcome to my personal website! But unfortunately, it&apos;s still a work in progress. Come back later!
        </p>
        <p
          className="max-w-xs sm:max-w-sm md:max-w-md text-base sm:text-sm md:text-lg leading-7 sm:leading-6 md:leading-8 text-zinc-200 font-[family-name:var(--font-chakra-petch)] animate-fadeUp"
          style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)", animationDelay: "260ms" }}
        >
          เว็บไซต์ส่วนตัวยังอยู่ในระหว่างการพัฒนา โปรดกลับมาใหม่ในภายหลัง.
        </p>
        <p
          className="max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-xs md:text-base lg:text-xl leading-6 sm:leading-5 md:leading-7 lg:leading-8 text-zinc-400 animate-fadeUp"
          style={{ animationDelay: "340ms" }}
        >
          <span className="font-[family-name:var(--font-geist-pixel-square)]">Visit my bio: </span>
          <a href="https://haunt.gg/fumi" className="text-blue-500 hover:underline font-[family-name:var(--font-geist-pixel-square)]">Here</a>
        </p>
      </div>

      <div
        className="flex justify-center w-full sm:w-auto sm:flex-1 mt-4 sm:mt-0 animate-slideInRight"
      >
        <div
          className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[340/220] sm:aspect-[400/260] shrink-0"
        >
          <Suspense
            fallback={
              <div className="w-full h-full rounded-lg bg-zinc-800/50 animate-pulse" />
            }
          >
            <DiscordWidget />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
