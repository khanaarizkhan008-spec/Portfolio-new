import { prisma } from "@/lib/prisma";
import { updateCertification } from "@/app/admin/dashboard/actions/certifications";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = await prisma.certification.findUnique({
    where: { id },
  });

  if (!cert) {
    return <div className="p-4 text-center">Certification not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/dashboard/certifications" 
          className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Certification</h1>
      </div>

      <form 
        action={async (formData: FormData) => {
          "use server";
          await updateCertification(id, formData);
        }} 
        className="space-y-6 max-w-2xl"
      >
        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Certification Title</label>
            <input 
              name="title" 
              required 
              defaultValue={cert.title}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Issuer / Organization</label>
            <input 
              name="issuer" 
              required 
              defaultValue={cert.issuer}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Issue Date</label>
            <input 
              name="issueDate" 
              type="date" 
              required 
              defaultValue={cert.issueDate.toISOString().split("T")[0]}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Credential / Verification URL (Optional)</label>
            <input 
              name="credentialUrl" 
              defaultValue={cert.credentialUrl || ""}
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
            Update Certification
          </button>
        </div>
      </form>
    </div>
  );
}
