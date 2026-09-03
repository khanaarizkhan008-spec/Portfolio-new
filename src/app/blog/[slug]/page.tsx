import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { marked } from "marked";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} — Mohammad Aariz Khan`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    return (
      <main className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4 p-8 rounded-3xl bg-zinc-900 border border-white/10 max-w-md">
          <p className="text-zinc-400 text-lg">Article not found.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-sm"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const html = await marked(post.content);

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-28 pb-24 selection:bg-amber-500/20 selection:text-amber-200">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>
        </div>

        {/* Title & Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-500/80">
              <Clock size={13} /> 5 min read
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-zinc-800 border border-white/10 shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Markdown Content */}
        <div
          className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-amber-400 prose-code:text-amber-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 space-y-6 pt-6 border-t border-white/10"
          dangerouslySetInnerHTML={{ __html: html as string }}
        />

        {/* Bottom Navigation */}
        <div className="pt-12 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 font-semibold text-sm transition-all duration-200 border border-white/10 hover:border-amber-500"
          >
            <ArrowLeft size={16} /> All Articles
          </Link>
        </div>

      </article>
    </main>
  );
}
