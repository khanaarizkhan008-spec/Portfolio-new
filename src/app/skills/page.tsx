import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Cpu, Terminal, Wrench, Database, Layers, Sparkles, Code2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills & Tech Stack — Mohammad Aariz Khan",
  description: "Comprehensive overview of technologies, frameworks, developer tools, and AI architectures.",
};

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category || "General")));

  const categoryIcons: Record<string, any> = {
    Framework: Layers,
    Library: Code2,
    Database: Database,
    Backend: Terminal,
    Language: Globe,
    AI: Sparkles,
    Design: Wrench,
    General: Cpu,
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-28 pb-24 selection:bg-white/20 selection:text-white">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-16 min-h-[85vh] flex flex-col justify-between">
        
        {/* Header */}
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
              TECHNICAL
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
              SKILLS &amp; TOOLS
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 max-w-4xl pt-3 font-normal leading-relaxed">
              Comprehensive suite of core programming languages, web frameworks, databases, cloud infrastructure, and generative AI systems.
            </p>
          </div>
        </div>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {skills.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["Next.js", "React", "TypeScript", "Python", "TailwindCSS", "Prisma", "PostgreSQL", "Figma", "Docker", "Go", "Git", "OpenAI"].map((name) => (
                <div
                  key={name}
                  className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Cpu size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                      {name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">Core Stack</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => {
                const IconComponent = categoryIcons[cat] || Cpu;
                const catSkills = skills.filter((s) => (s.category || "General") === cat);

                return (
                  <div
                    key={cat}
                    className="p-8 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6 hover:border-white/20 transition-colors shadow-2xl"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center">
                        <IconComponent size={22} />
                      </div>
                      <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                        {cat}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {catSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center justify-between group"
                        >
                          <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 font-semibold border border-white/10">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} Mohammad Aariz Khan. All rights reserved.</p>
          <p className="text-zinc-600">Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </footer>

      </div>
    </main>
  );
}
