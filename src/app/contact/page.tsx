import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Collaboration — Mohammad Aariz Khan",
  description: "Get in touch for projects, full-stack software development, AI integrations, or freelance work.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "profile-1" },
  });

  const email = profile?.email || "khanaarizkhan008@gmail.com";

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
              LET'S WORK
            </h1>
            <h1 className="text-4xl xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
              TOGETHER
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-zinc-400 max-w-4xl pt-2 sm:pt-3 font-normal leading-relaxed">
              Have an ambitious project in mind, need a full-stack engineer, or want to consult on generative AI integration? Reach out directly.
            </p>
          </div>
        </div>

        {/* Interactive Contact Form Component */}
        <ContactForm email={email} />

        {/* Social Profiles Grid */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
            Connect &amp; Follow Online
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-2.5 sm:space-y-3 block group shadow-lg"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">LinkedIn</h3>
                  <p className="text-xs text-zinc-500 font-mono">Connect professionally</p>
                </div>
              </a>
            )}

            {profile?.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-2.5 sm:space-y-3 block group shadow-lg"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TwitterIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">Twitter / X</h3>
                  <p className="text-xs text-zinc-500 font-mono">Follow builds &amp; updates</p>
                </div>
              </a>
            )}

            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-7 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 space-y-2.5 sm:space-y-3 block group shadow-lg"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GithubIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">GitHub</h3>
                  <p className="text-xs text-zinc-500 font-mono">Explore open source repos</p>
                </div>
              </a>
            )}
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
