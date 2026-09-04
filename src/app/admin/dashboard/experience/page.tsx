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
            <p className="text-gray-500">No experience or education entries found. Document your journey!</p>
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
                      className="p-1 text-gray-600 hover:text-white disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </form>
                  <form action={async () => { "use server"; await moveExperience(exp.id, "down"); }}>
                    <button 
                      type="submit"
                      className="p-1 text-gray-600 hover:text-white cursor-pointer"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </form>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      exp.type === "education" 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      {exp.type === "education" ? "Education & Study" : "Work Experience"}
                    </span>
                    <h3 className="font-semibold text-white">{exp.org}</h3>
                    <span className="text-sm text-gray-400">— {exp.role}</span>
                    {exp.location && (
                      <span className="text-xs text-gray-500 font-mono">({exp.location})</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <Calendar size={12} />
                    {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} {exp.endDate ? `to ${new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : (exp.ongoing ? "to Present" : "")}
                  </div>

                  {exp.skills && (
                    <p className="text-xs text-gray-400 font-mono">
                      <span className="text-gray-500">Focus/Skills:</span> {exp.skills}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/admin/dashboard/experience/${exp.id}/edit`} 
                  className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-300 hover:bg-white/15 hover:text-white transition-all font-medium"
                >
                  Edit
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteExperience(exp.id);
                }}>
                  <button 
                    type="submit"
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
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
