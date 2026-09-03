import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostFormClient from "../PostFormClient";

export default async function NewPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/posts" className="p-2 rounded-lg bg-[#111] border border-white/10 text-gray-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Write New Post</h1>
      </div>
      <PostFormClient />
    </div>
  );
}
