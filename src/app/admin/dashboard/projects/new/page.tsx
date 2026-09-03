import { prisma } from "@/lib/prisma";
import { createProject, updateProject } from "@/app/admin/dashboard/actions/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectFormPage({ params }: { params: { id?: string } }) {
  const id = params.id;
  const project = id ? await prisma.project.findUnique({ where: { id } }) : null;
  const isEdit = !!id;

  if (isEdit && !project) {
    return <div className="p-4 text-center">Project not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/projects" className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit Project" : "Add New Project"}</h1>
      </div>

      <form 
        action={isEdit ? (async (formData: FormData) => {
          "use server";
          await updateProject(id!, formData);
          // Redirect to list page after update
        }) : createProject} 
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Project Title</label>
                <input 
                  name="title" 
                  required 
                  defaultValue={project?.title || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={4}
                  defaultValue={project?.description || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Tags (comma separated)</label>
                <input 
                  name="tags" 
                  defaultValue={project?.tags || ""} 
                  placeholder="Next.js, TypeScript, AI"
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Links & Assets</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Cover Image URL</label>
                <input 
                  name="coverImage" 
                  defaultValue={project?.coverImage || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Live Demo URL</label>
                <input 
                  name="liveUrl" 
                  defaultValue={project?.liveUrl || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">GitHub Repository URL</label>
                <input 
                  name="githubUrl" 
                  defaultValue={project?.githubUrl || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input 
                  type="checkbox" 
                  name="featured" 
                  id="featured"
                  defaultChecked={project?.featured} 
                  className="w-4 h-4 accent-amber-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">Mark as featured project</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            {isEdit ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
