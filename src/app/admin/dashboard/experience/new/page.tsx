import { prisma } from "@/lib/prisma";
import { createExperience, updateExperience } from "@/app/admin/dashboard/actions/experience";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ExperienceFormPage({ params }: { params: { id?: string } }) {
  const id = params.id;
  const exp = id ? await prisma.experience.findUnique({ where: { id } }) : null;
  const isEdit = !!id;

  if (isEdit && !exp) {
    return <div className="p-4 text-center">Entry not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/experience" className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit Experience" : "Add New Entry"}</h1>
      </div>

      <form 
        action={isEdit ? (async (formData: FormData) => {
          "use server";
          await updateExperience(id!, formData);
        }) : createExperience} 
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Organization</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Organization / Institution Name</label>
                <input 
                  name="org" 
                  required 
                  defaultValue={exp?.org || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Role / Context</label>
                <input 
                  name="role" 
                  required 
                  defaultValue={exp?.role || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={6}
                  defaultValue={exp?.description || ""} 
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
                  defaultValue={exp?.startDate ? exp.startDate.toISOString().split('T')[0] : ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">End Date (Optional)</label>
                <input 
                  name="endDate" 
                  type="date" 
                  defaultValue={exp?.endDate ? exp.endDate.toISOString().split('T')[0] : ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 py-4">
                <input 
                  type="checkbox" 
                  name="ongoing" 
                  id="ongoing"
                  defaultChecked={exp?.ongoing} 
                  className="w-4 h-4 accent-amber-500"
                />
                <label htmlFor="ongoing" className="text-sm text-gray-300 cursor-pointer">Currently ongoing</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 block">External Link (URL)</label>
                <input 
                  name="url" 
                  defaultValue={exp?.url || ""} 
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
            {isEdit ? "Update Entry" : "Create Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
