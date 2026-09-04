"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  Check, 
  Copy, 
  FileDown, 
  Terminal,
  ArrowUpRight
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";

export interface ProfileData {
  id?: string;
  name: string;
  role: string;
  bio: string;
  profileImage?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  email?: string | null;
  yearsBuilding?: number;
  projectsShipped?: number;
  hackathonsEntered?: number;
  location?: string;
  resumeUrl?: string;
}

const MONO_STACK_TAGS = ["Next.js", "React", "TypeScript", "Python", "AI / LLMs", "Node.js"];

export default function IntroProfileCard({ profile }: { profile: ProfileData }) {
  const [copied, setCopied] = useState(false);

  const email = profile.email || "khanaarizkhan008@gmail.com";
  const location = profile.location || "India • UTC+5:30";
  const resumeUrl = profile.resumeUrl || "#contact";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="relative w-full">
      {/* Main Handcrafted Dark Studio Card */}
      <div className="relative bg-[#0d0d11] text-zinc-100 rounded-[32px] p-6 sm:p-7 shadow-2xl border border-white/10 flex flex-col justify-between overflow-hidden">
        
        {/* Subtle Ambient Grain/Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* TOP BAR: Availability Dot & Location */}
        <div className="flex items-center justify-between gap-2 pb-5 mb-5 border-b border-white/10 text-xs font-mono">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>AVAILABLE FOR WORK</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-zinc-400 font-medium">
            <MapPin size={13} className="text-zinc-400" />
            <span>{location}</span>
          </div>
        </div>

        {/* PORTRAIT IMAGE */}
        <div className="relative w-full aspect-[4/4.6] rounded-[22px] overflow-hidden bg-zinc-900 border border-white/10 group">
          <img
            src={profile.profileImage || "/avatar.jpg"}
            alt={profile.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Overlay Tag */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} className="text-zinc-400" />
              <span>ENG // 2026</span>
            </span>
            <span className="text-zinc-400">STUDIO PORTFOLIO</span>
          </div>
        </div>

        {/* PROFILE HEADER & BIO */}
        <div className="mt-5 space-y-2 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {profile.name}
          </h1>

          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
            {profile.role}
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1 font-normal">
            {profile.bio || "Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products."}
          </p>
        </div>

        {/* TECH STACK CHIPS */}
        <div className="flex flex-wrap gap-1.5 pt-4 my-1">
          {MONO_STACK_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 text-[11px] font-mono border border-white/10 hover:border-white/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* SOCIAL LINKS & COPY EMAIL */}
        <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
              >
                <GithubIcon size={17} />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
              >
                <LinkedinIcon size={17} />
              </a>
            )}

            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
              >
                <TwitterIcon size={17} />
              </a>
            )}
          </div>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="relative px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono font-medium border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* PRIMARY ACTION BUTTONS */}
        <div className="pt-4 grid grid-cols-1 gap-2 w-full">
          <a
            href="#contact"
            className="w-full py-3.5 px-5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs text-center flex items-center justify-center gap-2 transition-all block shadow-md"
          >
            <Sparkles size={15} /> Let's Work Together
          </a>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target={resumeUrl.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="w-full py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs text-center flex items-center justify-center gap-2 border border-white/10 transition-all block"
            >
              <FileDown size={14} /> Download Resume / CV
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
