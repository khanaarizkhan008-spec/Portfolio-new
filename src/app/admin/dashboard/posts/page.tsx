import { prisma } from "@/lib/prisma";
import { createPost, updatePost, deletePost } from "../actions/posts";
import Link from "next/link";
import { Trash2, Plus, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
        <Link 
          href="/admin/dashboard/posts/new" 
          className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-600 transition-all"
        >
          <Plus size={18} />
          Write Post
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#111] border border-white/10 text-center space-y-4">
            <p className="text-gray-500">No posts yet. Share your knowledge with the world!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="p-4 rounded-xl bg-[#111] border border-white/10 flex items-center justify-between group hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                  <FileText size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{post.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      post.published ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/admin/dashboard/posts/${post.id}/edit`} 
                  className="px-3 py-1 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  Edit
                </Link>
                <form action={async () => {
                  "use server";
                  await deletePost(post.id);
                }}>
                  <button 
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
