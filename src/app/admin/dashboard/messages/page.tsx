import { prisma } from "@/lib/prisma";
import { Mail, Trash2, Calendar, User, Reply, ExternalLink } from "lucide-react";
import { deleteContactMessage } from "../actions/messages";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Contact Messages &amp; Inquiries</h1>
          <p className="text-sm text-gray-400">
            Messages received through your portfolio contact form ({messages.length} total)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.length === 0 ? (
          <div className="p-16 rounded-2xl bg-[#111] border border-white/10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center mx-auto">
              <Mail size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white">No inquiries yet</h3>
            <p className="text-sm text-gray-500">
              When prospective clients or collaborators send a message, it will arrive here.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4 hover:border-amber-500/40 transition-all shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold font-mono">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <span>{msg.name}</span>
                    </h3>
                    <a
                      href={`mailto:${msg.email}?subject=Re:%20Portfolio%20Inquiry`}
                      className="text-xs font-mono text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      <Mail size={12} />
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <a
                    href={`mailto:${msg.email}?subject=Re:%20Inquiry%20from%20Portfolio&body=Hi%20${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!`}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-gray-200 hover:text-zinc-950 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Reply size={13} />
                    Reply
                  </a>

                  <form action={async () => {
                    "use server";
                    await deleteContactMessage(msg.id);
                  }}>
                    <button
                      type="submit"
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap bg-[#171717] p-4 rounded-xl border border-white/5 font-sans">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
