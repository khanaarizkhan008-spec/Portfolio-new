import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aarizz Khan — Developer & Builder",
  description: "B.Tech CS student building AI-powered tools, full-stack apps, and shipping hackathon projects.",
  openGraph: {
    title: "Rizz Khan — Developer & Builder",
    description: "B.Tech CS student building AI-powered tools, full-stack apps, and shipping hackathon projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col text-zinc-100 bg-[#09090b] selection:bg-amber-500/30 selection:text-amber-200">
        <NoiseOverlay />
        <CustomCursor />
        <ScrollProgressBar />
        <NavBar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
