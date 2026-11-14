import type { Metadata, Viewport } from "next";
import { Fredoka, Space_Grotesk, Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModeProvider } from "@/context/ModeContext";
import { SoundProvider } from "@/context/SoundContext";
import { NarrationProvider } from "@/context/NarrationContext";
import { StickerProvider } from "@/context/StickerContext";
import ModeGate from "@/components/ModeGate";
import StickerBookModal from "@/components/kids/StickerBookModal";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#04060B",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://last-words1.vercel.app"),
  title: "LAST WORDS | NASA Space Apps Challenge 2026",
  description: "Every machine NASA left behind said something before it went quiet. An interactive storytelling journey across the Moon, Mars, and deep space for all ages.",
  keywords: ["NASA", "Space Apps", "Surveyor 3", "Apollo ALSEP", "Opportunity", "InSight", "Ingenuity", "Pioneer 10", "Voyager 1"],
  authors: [{ name: "NASA Space Apps Challenge 2026 Team" }],
  openGraph: {
    title: "LAST WORDS | The Final Transmissions of NASA's Left-Behind Machines",
    description: "Every machine NASA left behind said something before it went quiet. Meet 8 historic explorers on the Moon, Mars, and deep space.",
    siteName: "LAST WORDS",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "LAST WORDS - NASA Space Apps Challenge 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAST WORDS | NASA Space Apps Challenge 2026",
    description: "Every machine NASA left behind said something before it went quiet.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params?: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <html
      lang="en"
      data-mode="kids"
      className={`${fredoka.variable} ${spaceGrotesk.variable} ${atkinson.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cosmic-background selection:bg-[#5BE3C0]/30 selection:text-white">
        <ModeProvider>
          <SoundProvider>
            <NarrationProvider>
              <StickerProvider>
                <Navbar />
                <main id="main-content" className="flex-1 focus:outline-none">
                  {children}
                </main>
                <Footer />
                <ModeGate />
                <StickerBookModal />
              </StickerProvider>
            </NarrationProvider>
          </SoundProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
