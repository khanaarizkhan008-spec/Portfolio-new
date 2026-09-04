import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trash2, Plus, ArrowUp, ArrowDown, Award, ExternalLink, Calendar } from "lucide-react";
import { deleteCertification, moveCertification } from "../actions/certifications";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const certifications = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Certifications & Accreditations</h1>
          <p className="text-sm text-gray-400">Manage your licenses, badges, certificates, and credentials</p>
        </div>
        <Link 
          href="/admin/dashboard/certifications/new" 
          className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold flex items-center gap-2 hover:bg-amber-600 transition-all cursor-pointer"
        >
          <Plus size={18} />
          Add Certification
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {certifications.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#111] border border-white/10 text-center space-y-4">
            <p className="text-gray-500">No certifications found. Add your first accreditation!</p>
          </div>
        ) : (
          certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="p-4 rounded-xl bg-[#111] border border-white/10 flex items-center justify-between group hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <form action={async () => { "use server"; await moveCertification(cert.id, "up"); }}>
                    <button 
                      type="submit"
                      disabled={cert.order === 0}
                      className="p-1 text-gray-600 hover:text-white disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </form>
                  <form action={async () => { "use server"; await moveCertification(cert.id, "down"); }}>
                    <button 
                      type="submit"
                      className="p-1 text-gray-600 hover:text-white cursor-pointer"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </form>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{cert.title}</h3>
                    <span className="text-sm text-gray-400">— {cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Issued {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-amber-500 hover:underline flex items-center gap-1"
                      >
                        Verify link <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link 
                  href={`/admin/dashboard/certifications/${cert.id}/edit`} 
                  className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-300 hover:bg-white/15 hover:text-white transition-all font-medium"
                >
                  Edit
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteCertification(cert.id);
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
