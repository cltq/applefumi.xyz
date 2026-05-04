"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { socialIcons } from "@/app/lib/social-icons";
import { socialLinks, type SocialLink } from "@/app/lib/social-links";
import { glassmorphism, glassmorphismBorderTop } from "@/app/lib/styles";
import TechnologiesModal from "./TechnologiesModal";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const fetchLinks = useCallback(async () => {
    try {
      const responses = await Promise.all(
        socialLinks.map((link) => fetch(link.href))
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      setLinks(
        data.map((item, i) => ({
          label: socialLinks[i].label,
          href: item.url,
        }))
      );
    } catch {
      // Keep fallback links on error
    }
  }, []);

  useEffect(() => {
    // Defer fetch until after initial paint, with Safari fallback
    let cleanup: () => void;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = requestIdleCallback(() => fetchLinks(), { timeout: 2000 });
      cleanup = () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => fetchLinks(), 2000);
      cleanup = () => clearTimeout(id);
    }
    return cleanup;
  }, [fetchLinks]);

  // Staggered icon entrance animation with anime.js
  useEffect(() => {
    if (hasAnimated.current || !iconsRef.current) return;
    const icons = iconsRef.current.querySelectorAll("[data-social-icon]");
    if (icons.length === 0) return;
    hasAnimated.current = true;

    animate(icons, {
      opacity: [0, 1],
      translateY: [12, 0],
      scale: [0.8, 1],
      delay: stagger(80, { start: 600 }),
      duration: 500,
      ease: "outCubic",
    });
  }, [links]);

  return (
    <>
      <motion.footer
        className="w-full mt-auto py-[10px] sm:py-[14px] px-[10px] sm:px-[22px]"
        style={{ ...glassmorphism, ...glassmorphismBorderTop, paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p
              className="text-sm sm:text-xs font-[family-name:var(--font-geist-pixel-square)]"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              &copy; {year} Fumi. All rights reserved.
            </p>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="text-xs sm:text-[10px] font-[family-name:var(--font-geist-mono)] cursor-pointer"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
              whileHover={{
                color: "rgba(255, 255, 255, 0.7)",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              View all technologies
            </motion.button>
          </div>
          <div ref={iconsRef} className="flex items-center gap-4">
            {links.map((social) => (
              <motion.div
                key={social.label}
                data-social-icon
                style={{ opacity: 0 }}
                whileHover={{
                  scale: 1.2,
                  filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 sm:p-2 rounded-full transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                  }}
                >
                  {socialIcons[social.label.toLowerCase()]}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>
      <TechnologiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
