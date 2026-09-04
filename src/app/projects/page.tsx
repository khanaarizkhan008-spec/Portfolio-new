import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectListClient from "@/components/ProjectListClient";

export const metadata: Metadata = {
  title: "Projects — Mohammad Aariz Khan",
  description: "Explore all featured work, full-stack applications, AI tools, and open source projects.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-20 sm:pt-28 pb-24 selection:bg-white/20 selection:text-white overflow-x-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-10 sm:space-y-12 min-h-[85vh] flex flex-col justify-between">
        
        {/* Top Back Navigation & Header */}
        <div className="space-y-4 sm:space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
              ALL
            </h1>
            <h1 className="text-4xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
              PROJECTS
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-zinc-400 max-w-4xl pt-2 sm:pt-3 font-normal leading-relaxed">
              A curated showcase of engineering builds, AI-powered systems, SaaS platforms, and hackathon prototypes.
            </p>
          </div>
        </div>

        {/* Interactive Search Bar & Project List */}
        <ProjectListClient projects={projects} />

        {/* Footer */}
        <footer className="pt-10 sm:pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-mono text-center sm:text-left">
          <p>© {new Date().getFullYear()} Mohammad Aariz Khan. All rights reserved.</p>
          <p className="text-zinc-600">Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </footer>

      </div>
    </main>
  );
}
