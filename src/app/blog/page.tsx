import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Mohammad Aariz Khan",
  description: "Articles and insights on software engineering, AI systems, architecture, and building in public.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

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
              THOUGHTS &amp;
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
              ARTICLES
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 max-w-4xl pt-3 font-normal leading-relaxed">
              Writings on full-stack web architecture, artificial intelligence agents, developer workflows, and performance optimization.
            </p>
          </div>
        </div>

        {/* Articles List */}
        {posts.length === 0 ? (
          <div className="p-16 rounded-3xl bg-zinc-900/60 border border-white/10 text-center space-y-3">
            <p className="text-zinc-400 text-xl font-medium">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block p-8 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                  {/* Article Thumbnail Image */}
                  {post.coverImage && (
                    <div className="w-full md:w-72 h-52 md:h-44 rounded-2xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10 relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Article Text Content */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Clock size={14} /> 5 min read
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-zinc-200 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-base text-zinc-400 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-white pt-1 group-hover:translate-x-1 transition-transform">
                      Read full article <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
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
