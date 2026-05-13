import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { Chakra_Petch } from "next/font/google";
import Title from "@/components/Title";
import GridBackground from "@/components/GridBackground";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-chakra-petch",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fumi | Personal Website",
  description: "Welcome to my personal website. Explore my work, projects, and socials.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://applefumi.xyz"),
  openGraph: {
    title: "Fumi | Personal Website",
    description: "Welcome to my personal website. Explore my work, projects, and socials.",
    url: "https://applefumi.xyz",
    siteName: "Fumi",
    images: [
      {
        url: "https://applefumi.xyz/api/og",
        width: 1200,
        height: 630,
        alt: "Fumi - Welcome",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fumi | Personal Website",
    description: "Welcome to my personal website. Explore my work, projects, and socials.",
    images: ["https://applefumi.xyz/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${chakraPetch.variable}`}
    >
      <body className="relative min-h-screen text-white" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <GridBackground />
          <div className="relative z-10">
            <Title />
            <PageTransition>
              {children}
            </PageTransition>
          </div>
          <Analytics />
          <SpeedInsights />
      </body>
    </html>
  );
}
