"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { technologies, type Technology } from "@/app/lib/technologies";

const categoryLabels: Record<Technology["category"], string> = {
  framework: "Framework",
  language: "Language",
  library: "Library",
  tool: "Tool",
  deployment: "Deployment",
  font: "Font",
};

interface TechnologiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const sectionContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function TechnologiesModal({ isOpen, onClose }: TechnologiesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const grouped = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<Technology["category"], Technology[]>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0, 0, 0, 0.6)" }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[24px] p-4 sm:p-6 md:p-8"
            style={{
              background: "rgba(10, 10, 10, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <motion.h2
                className="text-lg sm:text-xl md:text-2xl font-semibold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Technologies
              </motion.h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
                whileHover={{
                  scale: 1.15,
                  color: "rgba(255, 255, 255, 0.95)",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>
            <motion.div
              className="space-y-4 sm:space-y-6 md:space-y-8"
              variants={sectionContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(grouped).map(([category, techs]) => (
                <motion.section key={category} variants={sectionVariants}>
                  <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 opacity-50 uppercase tracking-wide">
                    {categoryLabels[category as Technology["category"]]}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {techs.map((tech, idx) => (
                      <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        custom={idx}
                      >
                        <Link
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:border-white/30"
                          style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            borderColor: "rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <h4 className="font-medium text-sm sm:text-base mb-1">{tech.name}</h4>
                          <p className="text-xs sm:text-sm opacity-50">{tech.description}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
