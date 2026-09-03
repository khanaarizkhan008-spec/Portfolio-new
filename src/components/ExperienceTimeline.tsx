"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, ExternalLink, Sparkles, Building, Award } from "lucide-react";

export interface TimelineItem {
  id: string;
  type: "work" | "education";
  org: string;
  role: string;
  description: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  ongoing?: boolean;
  url?: string | null;
  location?: string;
  skills?: string[];
}

interface ExperienceTimelineProps {
  workExperiences: any[];
}

export default function ExperienceTimeline({ workExperiences }: ExperienceTimelineProps) {
  const [activeTab, setActiveTab] = useState<"all" | "work" | "education">("all");

  // Format database experiences as work type
  const formattedWork: TimelineItem[] = workExperiences.map((exp) => ({
    id: exp.id,
    type: "work" as const,
    org: exp.org,
    role: exp.role,
    description: exp.description,
    startDate: exp.startDate,
    endDate: exp.endDate,
    ongoing: exp.ongoing,
    url: exp.url,
  }));

  // Study & Education experiences
  const educationExperiences: TimelineItem[] = [
    {
      id: "edu-1",
      type: "education",
      org: "Bachelor of Technology (B.Tech)",
      role: "Computer Science & Engineering",
      description: "Focused on Autonomous AI Systems, High-Performance Distributed Systems, Data Structures & Algorithms, and Cloud Infrastructure. Actively leading developer communities and winning national collegiate hackathons.",
      startDate: new Date("2022-08-01"),
      endDate: null,
      ongoing: true,
      location: "India",
      skills: ["Data Structures", "Algorithms", "Operating Systems", "AI & ML", "Web Architecture"],
    },
    {
      id: "edu-2",
      type: "education",
      org: "Senior Secondary Education (XII)",
      role: "Physics, Chemistry & Mathematics (PCM) + CS",
      description: "Graduated with distinction in Science and Computer Science with specialization in Python, Database Systems, and Object-Oriented Programming principles.",
      startDate: new Date("2020-04-01"),
      endDate: new Date("2022-05-01"),
      ongoing: false,
      location: "India",
      skills: ["Mathematics", "Physics", "Computer Science", "Python"],
    },
  ];

  // Combine and sort chronologically (most recent first)
  const allItems: TimelineItem[] = [...formattedWork, ...educationExperiences].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  const filteredItems = allItems.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className="space-y-10 w-full">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 w-fit font-mono">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "all"
              ? "bg-white text-zinc-950 shadow-md"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Sparkles size={13} />
          <span>All Timeline ({allItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("work")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "work"
              ? "bg-white text-zinc-950 shadow-md"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase size={13} />
          <span>Work Experience ({formattedWork.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("education")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "education"
              ? "bg-white text-zinc-950 shadow-md"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <GraduationCap size={14} />
          <span>Study &amp; Education ({educationExperiences.length})</span>
        </button>
      </div>

      {/* Animated Timeline Container */}
      <div className="relative pl-6 sm:pl-12 ml-2 sm:ml-4 space-y-10">
        
        {/* Animated Glowing Vertical Track */}
        <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-white via-zinc-700 to-transparent" />

        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isWork = item.type === "work";
            const startDateStr = new Date(item.startDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
            const endDateStr = item.endDate
              ? new Date(item.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : item.ongoing
              ? "Present"
              : "";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -24, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Glowing Interactive Node Icon */}
                <div className="absolute -left-[31px] sm:-left-[55px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-950 border-2 border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-125 group-hover:border-white transition-transform duration-300 z-10">
                  {isWork ? (
                    <Briefcase size={13} className="text-zinc-200" />
                  ) : (
                    <GraduationCap size={14} className="text-white" />
                  )}
                  {item.ongoing && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                  )}
                </div>

                {/* Timeline Card */}
                <div className="p-6 sm:p-8 md:p-9 rounded-3xl bg-zinc-900/70 hover:bg-zinc-900 border border-white/10 hover:border-white/30 transition-all duration-300 space-y-4 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                  
                  {/* Card Header: Role, Org, Tag, and Date */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isWork
                              ? "bg-white/5 text-zinc-300 border-white/10"
                              : "bg-emerald-950/40 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          {isWork ? "Work Experience" : "Education & Study"}
                        </span>
                        {item.location && (
                          <span className="text-xs text-zinc-500 font-mono">
                            • {item.location}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-zinc-200 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-zinc-400 font-mono flex items-center gap-1.5">
                        <Building size={14} className="text-zinc-500" />
                        <span>{item.org}</span>
                      </p>
                    </div>

                    {/* Date Pill & External Link */}
                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 font-mono bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
                        <Calendar size={13} />
                        <span>{startDateStr} — {endDateStr}</span>
                      </div>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${item.org}`}
                          className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10 shrink-0"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills/Tags if available */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 font-mono">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-zinc-400 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

    </div>
  );
}
