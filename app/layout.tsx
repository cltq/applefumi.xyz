import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { Kanit } from "next/font/google";
import Title from "@/components/Title";
import GridBackground from "@/components/GridBackground";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fumi",
  description: "Hi, I am Fumi - Developer",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://fumi.moocom.site"),
  openGraph: {
    title: "Fumi",
    description: "Hi, I am Fumi - Developer",
    url: "https://fumi.moocom.site",
    siteName: "Fumi",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Fumi - Celestia (cltq)",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fumi",
    description: "Hi, I am Fumi - Developer",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${kanit.variable}`}
    >
      <body className="relative min-h-screen text-white">
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
