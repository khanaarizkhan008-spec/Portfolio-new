import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, ExternalLink, ArrowLeft, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience — Mohammad Aariz Khan",
  description: "Career timeline, hackathons, open source contributions, and engineering milestones.",
};

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
              CAREER &amp;
            </h1>
            <h1 className="text-4xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
              EXPERIENCE
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-zinc-400 max-w-4xl pt-2 sm:pt-3 font-normal leading-relaxed">
              Timeline of software engineering roles, hackathon achievements, open source work, and technical leadership.
            </p>
          </div>
        </div>

        {/* Timeline */}
        {experiences.length === 0 ? (
          <div className="p-10 sm:p-16 rounded-3xl bg-zinc-900/60 border border-white/10 text-center space-y-3">
            <p className="text-zinc-400 text-lg sm:text-xl font-medium">Experience entries coming soon.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-zinc-800 pl-4 sm:pl-10 ml-2 sm:ml-4 space-y-8 sm:space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[23px] sm:-left-[47px] top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white ring-4 ring-[#09090b] group-hover:scale-125 transition-transform duration-200 shadow-xl" />

                <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 transition-all duration-300 space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-zinc-200 transition-colors">
                        {exp.role}
                      </h2>
                      <p className="text-sm sm:text-base font-semibold text-zinc-400 font-mono pt-0.5 sm:pt-1">{exp.org}</p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 font-mono bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10">
                        <Calendar size={13} />
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        —{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : exp.ongoing
                          ? "Present"
                          : ""}
                      </div>

                      {exp.url && (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${exp.org}`}
                          className="p-1.5 sm:p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

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
