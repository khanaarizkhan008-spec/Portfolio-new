"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  User, 
  Wrench, 
  Award,
  Mail,
  GraduationCap,
  LogOut 
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/admin/dashboard/posts", icon: FileText },
  { name: "Projects", href: "/admin/dashboard/projects", icon: Briefcase },
  { name: "Experience & Study", href: "/admin/dashboard/experience", icon: GraduationCap },
  { name: "Certifications", href: "/admin/dashboard/certifications", icon: Award },
  { name: "Skills", href: "/admin/dashboard/skills", icon: Wrench },
  { name: "Inquiries", href: "/admin/dashboard/messages", icon: Mail },
  { name: "Profile", href: "/admin/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0f0f0f] flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-amber-500">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">Portfolio CMS</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive 
                    ? "bg-amber-500 text-black font-medium" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
