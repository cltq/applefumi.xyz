"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Test", path: "/test" },
];

const navbarVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.1,
    },
  },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink =
    navLinks.find((item) => item.path === normalizedPath) || navLinks[0];

  return (
    <div
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        top: "1rem",
      }}
    >
      <motion.nav
        className="flex items-center gap-3 pointer-events-auto px-5 py-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo — left side */}
        <motion.button
          onClick={() => router.push("/")}
          className="cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image
            src="/favicon.ico"
            alt="logo"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-7 sm:h-7"
          />
        </motion.button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((nav) => {
            const isActive = activeLink.path === nav.path;
            return (
              <button
                key={nav.path}
                onClick={() => router.push(nav.path)}
                className="relative z-10 px-2.5 py-1 border-none outline-none cursor-pointer select-none rounded-md"
              >
                {/* Animated active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      boxShadow:
                        "0 0 0 1px rgba(255, 255, 255, 0.35), 0 0 10px rgba(255, 255, 255, 0.08)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 text-sm tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/60 font-normal hover:text-white/80"
                  }`}
                  style={{
                    textShadow: isActive
                      ? "0 0 16px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                >
                  {nav.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Haunt logo — right side */}
        <motion.button
          onClick={async () => {
            const win = window.open(
              "https://haunt.gg/fumi",
              "_blank",
              "noopener,noreferrer"
            );
            try {
              const response = await fetch("/api/s/haunt");
              const data = await response.json();
              if (data.url && win && !win.closed) {
                win.location.href = data.url;
              }
            } catch (error) {
              console.error("Failed to fetch redirect URL:", error);
            }
          }}
          className="cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image
            src="/hauntgg.png"
            alt="logo"
            width={25}
            height={25}
            className="w-5 h-5 sm:w-7 sm:h-7"
          />
        </motion.button>
      </motion.nav>
    </div>
  );
}
