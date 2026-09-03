import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateProject } from "@/app/admin/dashboard/actions/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-400">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/projects"
          className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      </div>

      <form
        action={async (formData) => {
          "use server";
          await updateProject(project.id, formData);
        }}
        className="space-y-6 p-6 rounded-2xl bg-[#111] border border-white/10"
      >
        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Project Title</label>
          <input
            name="title"
            required
            defaultValue={project.title}
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Tags (comma-separated)</label>
          <input
            name="tags"
            defaultValue={project.tags || ""}
            placeholder="Next.js, AI, PostgreSQL"
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Cover Image URL</label>
          <input
            name="coverImage"
            defaultValue={project.coverImage || ""}
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Live URL</label>
          <input
            name="liveUrl"
            defaultValue={project.liveUrl || ""}
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">GitHub URL</label>
          <input
            name="githubUrl"
            defaultValue={project.githubUrl || ""}
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={project.featured}
            className="w-4 h-4 accent-amber-500"
          />
          <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
            Featured on home page
          </label>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}
