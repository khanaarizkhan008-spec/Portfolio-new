import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trash2, Plus, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { deleteProject, moveProject } from "../actions/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Project Showcase</h1>
        <Link 
          href="/admin/dashboard/projects/new" 
          className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-600 transition-all"
        >
          <Plus size={18} />
          Add Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#111] border border-white/10 text-center space-y-4">
            <p className="text-gray-500">No projects found. Start by adding your first build!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id} 
              className="p-4 rounded-xl bg-[#111] border border-white/10 flex items-center justify-between group hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <form action={async () => { "use server"; await moveProject(project.id, "up"); }}>
                    <button 
                      type="submit"
                      disabled={project.order === 0}
                      className="p-1 text-gray-600 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </form>
                  <form action={async () => { "use server"; await moveProject(project.id, "down"); }}>
                    <button 
                      type="submit"
                      className="p-1 text-gray-600 hover:text-white"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </form>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-500 font-bold uppercase tracking-wider">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/admin/dashboard/projects/${project.id}/edit`} 
                  className="p-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  Edit
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteProject(project.id);
                }}>
                  <button 
                    type="submit"
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
