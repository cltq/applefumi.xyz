"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useState, ReactElement } from "react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Test", path: "/test" },
];

const NAV_STYLES = {
  container:
    "w-full max-w-3xl rounded-2xl border border-white/10 bg-black/70 shadow-[0_0_50px_rgba(0,0,0,0.4)]",
  topBar: "flex items-center px-4 py-3 md:px-6 md:py-3",
  spacer: "flex-1",
};

interface NavLinkProps {
  nav: (typeof NAV_LINKS)[0];
  isActive: boolean;
  onClick: () => void;
}

function DesktopNavLink({ nav, isActive, onClick }: NavLinkProps): ReactElement {
  return (
    <button
      key={nav.path}
      onClick={onClick}
      className="relative text-sm font-medium transition-all duration-200"
    >
      <span className={isActive ? "text-white" : "text-white/60 hover:text-white"}>
        {nav.label}
      </span>
      <div
        className={`absolute -bottom-2 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-white transition-all duration-300 ${
          isActive ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
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
      className="flex items-center justify-center transition-transform duration-200"
      style={{
        transform: isHovered === "logo" ? "scale(1.08)" : "scale(1)",
      }}
      aria-label="Go to homepage"
    >
      <Image
        src="/favicon.ico"
        alt="Fumi logo"
        width={36}
        height={36}
        className="rounded-lg"
        priority
      />
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
        transform: isHovered === "haunt" ? "scale(1.08)" : "scale(1)",
      }}
      aria-label="Visit Haunt.gg profile"
    >
      <Image
        src="/hauntgg.png"
        alt="Haunt.gg logo"
        width={36}
        height={36}
        className="rounded-lg"
      />
    </button>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const activeLink = NAV_LINKS.find((item) => item.path === normalizedPath) || NAV_LINKS[0];

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
      console.error("Failed to fetch redirect URL:", error);
    }
  }, []);

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{
        top: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      <nav className={NAV_STYLES.container}>
        {/* TOP BAR */}
        <div className={NAV_STYLES.topBar}>
          {/* LEFT */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <NavbarLogo
              isHovered={isHovered}
              onClick={() => router.push("/")}
              onHoverEnter={() => setIsHovered("logo")}
              onHoverLeave={() => setIsHovered(null)}
            />
            <span
              className="text-xl font-bold tracking-tight text-white"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            >
              AppleFumi
            </span>
          </div>

          {/* SPACER */}
          <div className={NAV_STYLES.spacer} />

          {/* DESKTOP NAV */}
          <div className="flex items-center gap-8 mr-6">
            {NAV_LINKS.map((nav) => (
              <DesktopNavLink
                key={nav.path}
                nav={nav}
                isActive={activeLink.path === nav.path}
                onClick={() => router.push(nav.path)}
              />
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center">
            <HauntButton
              isHovered={isHovered}
              onClick={handleHauntClick}
              onHoverEnter={() => setIsHovered("haunt")}
              onHoverLeave={() => setIsHovered(null)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}