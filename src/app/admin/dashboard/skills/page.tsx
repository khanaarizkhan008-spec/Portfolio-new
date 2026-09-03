import { prisma } from "@/lib/prisma";
import { addSkill, deleteSkill } from "../actions/skills";
import { Trash2, Plus, GripVertical } from "lucide-react";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Skills & Tools</h1>
      </div>

      <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-6">
        <form action={addSkill} className="flex gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="name" 
              required 
              placeholder="Skill name (e.g. Next.js)" 
              className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
            <input 
              name="category" 
              placeholder="Category (e.g. Framework)" 
              className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>
          <button 
            type="submit" 
            className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-600 transition-all"
          >
            <Plus size={18} />
            Add
          </button>
        </form>

        <div className="space-y-3">
          {skills.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No skills added yet.</p>
          ) : (
            skills.map((skill) => (
              <div 
                key={skill.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-white/5 group hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <GripVertical size={18} className="text-gray-600 cursor-grab" />
                  <div>
                    <p className="font-medium text-white">{skill.name}</p>
                    {skill.category && (
                      <span className="text-xs text-gray-500">{skill.category}</span>
                    )}
                  </div>
                </div>

                <form action={async () => {
                  "use server";
                  await deleteSkill(skill.id);
                }}>
                  <button 
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
