"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { socialIcons } from "@/app/lib/social-icons";
import { socialLinks, type SocialLink } from "@/app/lib/social-links";
import { glassmorphism, glassmorphismBorderTop } from "@/app/lib/styles";
import TechnologiesModal from "./TechnologiesModal";

export default function Footer() {
  const year = new Date().getFullYear();
  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconsRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <footer
        className="w-full mt-auto py-[10px] sm:py-[14px] px-[10px] sm:px-[22px] animate-slideUp"
        style={{ ...glassmorphism, ...glassmorphismBorderTop, paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p
              className="text-sm sm:text-xs font-[family-name:var(--font-geist-pixel-square)]"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              &copy; {year} Fumi. All rights reserved.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs sm:text-[10px] font-[family-name:var(--font-geist-mono)] cursor-pointer transition-colors duration-200 hover:text-white/70"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              View all technologies
            </button>
          </div>
          <div ref={iconsRef} className="flex items-center gap-4">
            {links.map((social, index) => (
              <div
                key={social.label}
                className="animate-fadeUp hover:scale-[1.2] transition-transform duration-150"
                style={{ 
                  animationDelay: `${600 + index * 80}ms`,
                  filter: "drop-shadow(0 0 0 transparent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "drop-shadow(0 0 0 transparent)";
                }}
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
                  aria-label={`Visit ${social.label}`}
                >
                  <span className="sr-only">{social.label}</span>
                  {socialIcons[social.label.toLowerCase()]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </footer>
      <TechnologiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
