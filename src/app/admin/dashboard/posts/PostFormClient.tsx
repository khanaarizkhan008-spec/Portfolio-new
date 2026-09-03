"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MdEditor from "@uiw/react-md-editor";
import { createPost, updatePost } from "../actions/posts";

export default function PostFormClient({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    if (initialData) {
      await updatePost(initialData.id, formData);
    } else {
      await createPost(formData);
    }
    setLoading(false);
    router.push("/admin/dashboard/posts");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Post Title</label>
            <input 
              name="title" 
              required 
              defaultValue={initialData?.title || ""} 
              className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Slug (URL)</label>
            <input 
              name="slug" 
              defaultValue={initialData?.slug || ""} 
              placeholder="my-first-post"
              className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Excerpt</label>
            <textarea 
              name="excerpt" 
              required 
              rows={3}
              defaultValue={initialData?.excerpt || ""} 
              className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Cover Image URL</label>
            <input 
              name="coverImage" 
              defaultValue={initialData?.coverImage || ""} 
              className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input 
              type="checkbox" 
              name="published" 
              id="published"
              defaultChecked={initialData?.published} 
              className="w-4 h-4 accent-amber-500"
            />
            <label htmlFor="published" className="text-sm text-gray-300 cursor-pointer">Publish immediately</label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Content (Markdown)</label>
          <div className="border border-white/10 rounded-lg overflow-hidden bg-[#111]">
            <MdEditor 
              value={content} 
              onChange={(val) => setContent(val || "")} 
              preview="live"
              height={500}
              className="text-white"
            />
            <input type="hidden" name="content" value={content} />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Post" : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
