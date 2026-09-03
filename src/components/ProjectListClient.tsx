"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, Layers, ArrowUpRight, ArrowUpDown } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string;
  coverImage?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  order: number;
}

type SortOption = "featured" | "newest" | "oldest" | "alpha";

export default function ProjectListClient({ projects }: { projects: ProjectItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Extract unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.tags) {
        p.tags.split(",").forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  // Filter & Sort projects
  const filteredProjects = useMemo(() => {
    const result = projects.filter((project) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.toLowerCase().includes(q);

      const matchesTag =
        selectedTag === "All" ||
        project.tags
          .toLowerCase()
          .split(",")
          .map((t) => t.trim())
          .includes(selectedTag.toLowerCase());

      return matchesQuery && matchesTag;
    });

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return a.order - b.order;
      }
      if (sortBy === "newest") {
        return a.order - b.order;
      }
      if (sortBy === "oldest") {
        return b.order - a.order;
      }
      if (sortBy === "alpha") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [projects, searchQuery, selectedTag, sortBy]);

  return (
    <div className="space-y-8 sm:space-y-10 w-full">
      
      {/* Search Bar, Sort Dropdown & Tag Filter Bar */}
      <div className="space-y-4">
        
        {/* Top Control Row: Search + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* Search Input Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-zinc-400">
              <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tech stack, or description..."
              className="w-full pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto shrink-0 font-mono">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <ArrowUpDown size={14} />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort projects"
              className="w-full sm:w-auto pl-9 pr-8 py-3 sm:py-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-white text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all cursor-pointer shadow-xl appearance-none"
            >
              <option value="featured" className="bg-zinc-900 text-white">Sort: Featured First</option>
              <option value="newest" className="bg-zinc-900 text-white">Sort: Newest First</option>
              <option value="oldest" className="bg-zinc-900 text-white">Sort: Oldest First</option>
              <option value="alpha" className="bg-zinc-900 text-white">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Filter Chips Bar */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 font-mono">
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white text-zinc-950 shadow-md"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Projects Grid / Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="p-10 sm:p-16 rounded-3xl bg-zinc-900/60 border border-white/10 text-center space-y-4">
          <p className="text-zinc-300 text-base sm:text-lg font-medium">
            No projects found matching &ldquo;<span className="text-white font-bold">{searchQuery || selectedTag}</span>&rdquo;
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
              setSortBy("featured");
            }}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-white/30 rounded-3xl p-5 sm:p-7 transition-all duration-300 shadow-2xl flex flex-col justify-between space-y-5 sm:space-y-6"
              >
                <div className="space-y-4 sm:space-y-5">
                  {/* Thumbnail */}
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-zinc-800 relative border border-white/10">
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
                      <div className="absolute top-3 right-3 px-2.5 sm:px-3 py-1 rounded-full bg-white text-zinc-950 font-black text-[11px] sm:text-xs font-mono flex items-center gap-1 shadow-md">
                        <Sparkles size={11} /> Featured
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
                      {project.tags.split(",").map((tag) => {
                        const trimmed = tag.trim();
                        return (
                          <button
                            key={trimmed}
                            onClick={() => setSelectedTag(trimmed)}
                            className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-md bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 font-medium transition-colors cursor-pointer"
                          >
                            {trimmed}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 sm:gap-3 pt-3 border-t border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-white text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-all"
                    >
                      Live Preview <ArrowUpRight size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      Source Code <GithubIcon size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}
