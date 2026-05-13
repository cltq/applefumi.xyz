"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useState, ReactElement } from "react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Test", path: "/test" },
  { label: "Test2", path: "/testt" },
];

const NAV_STYLES = {
  container:
    "w-full max-w-2xl rounded-full border border-white/12 bg-black/70 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] font-[family-name:var(--font-geist)]",
  topBar: "flex items-center px-4 py-2 md:px-5 md:py-2",
  spacer: "flex-1",
};

interface NavLinkProps {
  nav: (typeof NAV_LINKS)[0];
  isActive: boolean;
  onClick: () => void;
}

function DesktopNavLink({
  nav,
  isActive,
  onClick,
}: NavLinkProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
        isActive
          ? "bg-white/[0.06] border border-white/10 text-white"
          : "text-white/60 hover:text-white hover:bg-white/[0.03]"
      }`}
    >
      {nav.label}
    </button>
  );
}

function NavbarLogo({
  isHovered,
  onClick,
  onHoverEnter,
  onHoverLeave,
}: {
  isHovered: string | null;
  onClick: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="flex items-center gap-2 transition-transform duration-200"
      style={{
        transform:
          isHovered === "logo"
            ? "scale(1.04)"
            : "scale(1)",
      }}
      aria-label="Go to homepage"
    >
      <Image
        src="/favicon.ico"
        alt="Fumi logo"
        width={32}
        height={32}
        className="rounded-full"
        priority
      />

      <span
        className="text-base md:text-lg font-bold tracking-tight text-white"
        style={{
          textShadow: `
            0 0 8px rgba(255,255,255,0.45),
            0 0 18px rgba(255,255,255,0.25),
            0 0 30px rgba(255,255,255,0.12)
          `,
        }}
      >
        AppleFumi
      </span>
    </button>
  );
}

function HauntButton({
  isHovered,
  onClick,
  onHoverEnter,
  onHoverLeave,
}: {
  isHovered: string | null;
  onClick: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
}): ReactElement {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="flex items-center justify-center transition-transform duration-200"
      style={{
        transform:
          isHovered === "haunt"
            ? "scale(1.08)"
            : "scale(1)",
      }}
      aria-label="Visit Haunt.gg profile"
    >
      <Image
        src="/hauntgg.png"
        alt="Haunt.gg logo"
        width={32}
        height={32}
        className="rounded-full"
      />
    </button>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isHovered, setIsHovered] =
    useState<string | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const normalizedPath =
    pathname?.replace(/\/$/, "") || "/";

  const activeLink =
    NAV_LINKS.find(
      (item) => item.path === normalizedPath
    ) || NAV_LINKS[0];

  const handleHauntClick = useCallback(async () => {
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
      console.error(
        "Failed to fetch redirect URL:",
        error
      );
    }
  }, []);

  const handleNavClick = useCallback(
    (path: string) => {
      router.push(path);
      setIsMobileMenuOpen(false);
    },
    [router]
  );

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{
        top: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      <nav
        className={`${NAV_STYLES.container} relative`}
      >
        {/* TOP BAR */}
        <div className={NAV_STYLES.topBar}>
          {/* LEFT */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <NavbarLogo
              isHovered={isHovered}
              onClick={() => router.push("/")}
              onHoverEnter={() =>
                setIsHovered("logo")
              }
              onHoverLeave={() =>
                setIsHovered(null)
              }
            />
          </div>

          {/* SPACER */}
          <div className={NAV_STYLES.spacer} />

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2 mr-4">
            {NAV_LINKS.map((nav) => (
              <DesktopNavLink
                key={nav.path}
                nav={nav}
                isActive={
                  activeLink.path === nav.path
                }
                onClick={() =>
                  router.push(nav.path)
                }
              />
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1">
            {/* MOBILE HAMBURGER */}
            <button
              onClick={() =>
                setIsMobileMenuOpen(
                  (prev) => !prev
                )
              }
              className="md:hidden relative flex items-center justify-center w-9 h-9"
              aria-label={
                isMobileMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-4 h-4">
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 rounded-full bg-white transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-45"
                      : "-translate-y-[5px]"
                  }`}
                />

                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 rounded-full bg-white transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-0"
                      : ""
                  }`}
                />

                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-4 rounded-full bg-white transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "-rotate-45"
                      : "translate-y-[5px]"
                  }`}
                />
              </div>
            </button>

            {/* HAUNT BUTTON */}
            <HauntButton
              isHovered={isHovered}
              onClick={handleHauntClick}
              onHoverEnter={() =>
                setIsHovered("haunt")
              }
              onHoverLeave={() =>
                setIsHovered(null)
              }
            />
          </div>
        </div>

        {/* MOBILE FLOATING MENU */}
        <div
          className={`md:hidden absolute left-0 top-[calc(100%+10px)] w-full rounded-3xl border border-white/10 bg-black/75 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-5 py-5 flex flex-col items-center">
            <div className="flex flex-col items-center gap-4 w-full">
              {NAV_LINKS.map((nav) => {
                const isActive =
                  activeLink.path === nav.path;

                return (
                  <button
                    key={nav.path}
                    onClick={() =>
                      handleNavClick(nav.path)
                    }
                    className={`w-full rounded-full px-4 py-2.5 text-center text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/[0.06] border border-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    {nav.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}