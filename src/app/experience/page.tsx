import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience & Education — Mohammad Aariz Khan",
  description: "Career timeline, study experience, hackathons, open source contributions, and engineering milestones.",
};

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  const certifications = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-20 sm:pt-28 pb-24 selection:bg-white/20 selection:text-white overflow-x-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-12 sm:space-y-16 min-h-[85vh] flex flex-col justify-between">
        
        {/* Header */}
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
              WORK &amp;
            </h1>
            <h1 className="text-4xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
              STUDY TIMELINE
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-zinc-400 max-w-4xl pt-2 sm:pt-3 font-normal leading-relaxed">
              Interactive timeline of software engineering roles, university education, hackathon achievements, and technical leadership.
            </p>
          </div>
        </div>

        {/* Animated Experience & Study Timeline */}
        <ExperienceTimeline workExperiences={experiences} />

        {/* Dedicated Certifications Section */}
        <div className="space-y-8 sm:space-y-10 pt-8 sm:pt-10 border-t border-white/10">
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none break-words">
              CERTIFICATIONS &amp;
            </h2>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
              ACCREDITATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 sm:p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-3 sm:space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award size={20} />
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-400 font-mono pt-1">{cert.issuer}</p>
                </div>

                <p className="text-[11px] sm:text-xs text-zinc-500 font-mono">
                  Issued {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-10 sm:pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-mono text-center sm:text-left">
          <p>© {new Date().getFullYear()} Mohammad Aariz Khan. All rights reserved.</p>
          <p className="text-zinc-600">Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </footer>

      </div>
    </main>
  );
}
