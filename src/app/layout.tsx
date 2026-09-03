import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
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
  title: "Mohammad Aariz Khan — Full-Stack Engineer & AI Developer",
  description: "Full-stack software engineer building AI-powered tools, scalable web apps, and shipping hackathon projects.",
  openGraph: {
    title: "Mohammad Aariz Khan — Full-Stack Engineer & AI Developer",
    description: "Full-stack software engineer building AI-powered tools, scalable web apps, and shipping hackathon projects.",
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
      <body className="min-h-full flex flex-col text-zinc-100 bg-[#09090b] selection:bg-white/20 selection:text-white">
        <NoiseOverlay />
        <ScrollProgressBar />
        <NavBar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
