import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trash2, Plus, ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { deleteExperience, moveExperience } from "../actions/experience";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Experience & Timeline</h1>
        <Link 
          href="/admin/dashboard/experience/new" 
          className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-600 transition-all"
        >
          <Plus size={18} />
          Add Entry
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {experiences.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#111] border border-white/10 text-center space-y-4">
            <p className="text-gray-500">No experience entries found. Document your journey!</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="p-4 rounded-xl bg-[#111] border border-white/10 flex items-center justify-between group hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <form action={async () => { "use server"; await moveExperience(exp.id, "up"); }}>
                    <button 
                      type="submit"
                      disabled={exp.order === 0}
                      className="p-1 text-gray-600 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </form>
                  <form action={async () => { "use server"; await moveExperience(exp.id, "down"); }}>
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
                    <h3 className="font-medium text-white">{exp.org}</h3>
                    <span className="text-sm text-gray-400">— {exp.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    {new Date(exp.startDate).toLocaleDateString()} {exp.endDate ? `to ${new Date(exp.endDate).toLocaleDateString()}` : (exp.ongoing ? "Present" : "")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/admin/dashboard/experience/${exp.id}/edit`} 
                  className="px-3 py-1 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  Edit
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteExperience(exp.id);
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
