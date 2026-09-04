import { createCertification } from "@/app/admin/dashboard/actions/certifications";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCertificationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/dashboard/certifications" 
          className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add Certification</h1>
      </div>

      <form action={createCertification} className="space-y-6 max-w-2xl">
        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Certification Title</label>
            <input 
              name="title" 
              required 
              placeholder="e.g. AWS Certified Solutions Architect – Associate" 
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Issuer / Organization</label>
            <input 
              name="issuer" 
              required 
              placeholder="e.g. Amazon Web Services / Meta" 
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Issue Date</label>
            <input 
              name="issueDate" 
              type="date" 
              required 
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Credential / Verification URL (Optional)</label>
            <input 
              name="credentialUrl" 
              placeholder="https://..." 
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Create Certification
          </button>
        </div>
      </form>
    </div>
  );
}
