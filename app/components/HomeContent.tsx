"use client";

import { Suspense } from "react";

export default function HomeContent() {
  return (
    <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-zinc-100 sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 md:gap-12">
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
        className="w-full max-w-[340px] aspect-[340/192] shrink-0 mt-4 sm:mt-0 animate-slideInRight"
      >
        <Suspense
          fallback={
            <div className="w-full h-full rounded-lg bg-zinc-800/50 animate-pulse" />
          }
        >
          <DiscordWidget />
        </Suspense>
      </div>
    </main>
  );
}

function DiscordWidget() {
  return (
    <div className="relative w-full h-full" style={{ backgroundColor: "#1e1f22", borderRadius: "0.5rem", overflow: "hidden" }}>
      <iframe
        className="border-none"
        title="Discord user embed"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        style={{
          position: "absolute",
          top: 0,
          left: "-10px",
          width: "calc(100% + 20px)",
          height: "100%",
          backgroundColor: "transparent",
        }}
        src="https://widgets.vendicated.dev/user?id=969088519161139270&theme=dark&banner=true&full-banner=true&rounded-corners=false&discord-icon=true&badges=true&guess-nitro=true"
      />
    </div>
  );
}
