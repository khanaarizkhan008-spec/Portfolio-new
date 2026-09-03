import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Projects — Mohammad Aariz Khan",
  description: "Explore all featured work, full-stack applications, AI tools, and open source projects.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-28 pb-24 selection:bg-white/20 selection:text-white">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 min-h-[85vh] flex flex-col justify-between">
        
        {/* Top Back Navigation & Header */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
              ALL
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
              PROJECTS
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 max-w-4xl pt-3 font-normal leading-relaxed">
              A curated showcase of engineering builds, AI-powered systems, SaaS platforms, and hackathon prototypes.
            </p>
          </div>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="p-16 rounded-3xl bg-zinc-900/60 border border-white/10 text-center space-y-3">
            <p className="text-zinc-400 text-xl font-medium">Projects coming soon. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-white/30 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  {/* Thumbnail */}
                  <div className="w-full h-56 rounded-2xl overflow-hidden bg-zinc-800 relative border border-white/10">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
                        <Layers className="text-zinc-500" size={44} />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white text-zinc-950 font-black text-xs font-mono flex items-center gap-1 shadow-md">
                        <Sparkles size={12} /> Featured
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
                      {project.tags.split(",").map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-white text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-all"
                    >
                      Live Preview <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      Source Code <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} Mohammad Aariz Khan. All rights reserved.</p>
          <p className="text-zinc-600">Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </footer>

      </div>
    </main>
  );
}
