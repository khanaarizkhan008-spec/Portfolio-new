import { prisma } from "@/lib/prisma";
import { createExperience, updateExperience } from "@/app/admin/dashboard/actions/experience";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({
    where: { id },
  });

  if (!exp) {
    return <div className="p-4 text-center">Entry not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/experience" className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
      </div>

      <form 
        action={async (formData: FormData) => {
          "use server";
          await updateExperience(id, formData);
        }} 
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Entry Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Entry Type</label>
                <select 
                  name="type" 
                  defaultValue={exp.type || "work"} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all cursor-pointer"
                >
                  <option value="work">Work Experience</option>
                  <option value="education">Education & Study</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Organization / School / Institution</label>
                <input 
                  name="org" 
                  required 
                  defaultValue={exp.org} 
                  placeholder="e.g. Google / Stanford University"
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Role / Degree / Context</label>
                <input 
                  name="role" 
                  required 
                  defaultValue={exp.role} 
                  placeholder="e.g. Senior Software Engineer / B.Tech Computer Science"
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Location (Optional)</label>
                <input 
                  name="location" 
                  defaultValue={exp.location || ""} 
                  placeholder="e.g. San Francisco, CA / India / Remote"
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Skills / Focus Areas (comma-separated tags)</label>
                <input 
                  name="skills" 
                  defaultValue={exp.skills || ""} 
                  placeholder="e.g. Distributed Systems, Next.js, AI, Algorithms"
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={5}
                  defaultValue={exp.description} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Timeline & Links</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Start Date</label>
                <input 
                  name="startDate" 
                  type="date" 
                  required 
                  defaultValue={exp.startDate.toISOString().split('T')[0]} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">End Date (Optional)</label>
                <input 
                  name="endDate" 
                  type="date" 
                  defaultValue={exp.endDate ? exp.endDate.toISOString().split('T')[0] : ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 py-4">
                <input 
                  type="checkbox" 
                  name="ongoing" 
                  id="ongoing"
                  defaultChecked={exp.ongoing} 
                  className="w-4 h-4 accent-amber-500"
                />
                <label htmlFor="ongoing" className="text-sm text-gray-300 cursor-pointer">Currently ongoing</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">External Link (URL)</label>
                <input 
                  name="url" 
                  defaultValue={exp.url || ""} 
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            Update Entry
          </button>
        </div>
      </form>
    </div>
  );
}
