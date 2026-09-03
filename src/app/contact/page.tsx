import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Contact & Collaboration — Mohammad Aariz Khan",
  description: "Get in touch for projects, full-stack software development, AI integrations, or freelance work.",
};

export default async function ContactPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "profile-1" },
  });

  const email = profile?.email || "contact@rizz.dev";

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
              LET'S WORK
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
              TOGETHER
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 max-w-4xl pt-3 font-normal leading-relaxed">
              Have an ambitious project in mind, need a full-stack engineer, or want to consult on generative AI integration? Reach out directly.
            </p>
          </div>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Direct Email Card */}
          <div className="lg:col-span-8 p-10 sm:p-14 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center">
                <Sparkles size={26} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Direct Email &amp; Inquiries
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                I respond quickly to project requests, hackathon invitations, and engineering opportunities. Send a message directly to my inbox:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <MagneticButton>
                <a
                  href={`mailto:${email}`}
                  className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-200 block shadow-lg"
                >
                  <Mail size={18} /> Send Direct Email ({email})
                </a>
              </MagneticButton>
              {profile?.github && (
                <MagneticButton>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 block"
                  >
                    <GithubIcon size={18} /> GitHub Profile
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Social Profiles Column */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-3 block group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LinkedinIcon size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">LinkedIn</h3>
                  <p className="text-xs text-zinc-500 font-mono">Connect professionally</p>
                </div>
              </a>
            )}

            {profile?.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-3 block group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TwitterIcon size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">Twitter / X</h3>
                  <p className="text-xs text-zinc-500 font-mono">Follow builds &amp; updates</p>
                </div>
              </a>
            )}

            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-3 block group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GithubIcon size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">GitHub</h3>
                  <p className="text-xs text-zinc-500 font-mono">Explore open source repos</p>
                </div>
              </a>
            )}
          </div>

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
