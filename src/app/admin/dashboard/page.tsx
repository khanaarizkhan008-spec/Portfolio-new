import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Wrench, 
  Mail, 
  User, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    postsCount,
    projectsCount,
    experiencesCount,
    educationCount,
    certificationsCount,
    skillsCount,
    messagesCount,
    profile
  ] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.experience.count({ where: { type: "work" } }),
    prisma.experience.count({ where: { type: "education" } }),
    prisma.certification.count(),
    prisma.skill.count(),
    prisma.contactMessage.count(),
    prisma.profile.findUnique({ where: { id: "profile-1" } }),
  ]);

  const cards = [
    {
      title: "Projects",
      count: projectsCount,
      desc: "Featured builds & open-source tools",
      href: "/admin/dashboard/projects",
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      title: "Experience & Roles",
      count: experiencesCount,
      desc: "Software engineering career history",
      href: "/admin/dashboard/experience",
      icon: Briefcase,
      color: "text-sky-400",
    },
    {
      title: "Education & Study",
      count: educationCount,
      desc: "University degrees & academic records",
      href: "/admin/dashboard/experience",
      icon: GraduationCap,
      color: "text-emerald-400",
    },
    {
      title: "Certifications",
      count: certificationsCount,
      desc: "Cloud, engineering & tech accreditations",
      href: "/admin/dashboard/certifications",
      icon: Award,
      color: "text-amber-400",
    },
    {
      title: "Skills & Tech Stack",
      count: skillsCount,
      desc: "Languages, frameworks & databases",
      href: "/admin/dashboard/skills",
      icon: Wrench,
      color: "text-purple-400",
    },
    {
      title: "Blog Articles",
      count: postsCount,
      desc: "Technical write-ups & guides",
      href: "/admin/dashboard/posts",
      icon: FileText,
      color: "text-rose-400",
    },
    {
      title: "Contact Inquiries",
      count: messagesCount,
      desc: "Incoming client & collaboration messages",
      href: "/admin/dashboard/messages",
      icon: Mail,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio CMS Overview</h1>
          <p className="text-sm text-gray-400">
            Welcome back, <span className="text-white font-medium">{profile?.name || "Admin"}</span>. Everything is synchronized with your live website.
          </p>
        </div>

        <Link
          href="/admin/dashboard/profile"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-mono"
        >
          <User size={14} />
          <span>Edit Profile &amp; Hero Settings</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="p-6 rounded-2xl bg-[#111] border border-white/10 hover:border-amber-500/50 hover:bg-[#151515] transition-all space-y-4 group shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${card.color}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-2xl font-black text-white font-mono">{card.count}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{card.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-medium text-gray-500 group-hover:text-white transition-colors pt-2 border-t border-white/5">
                <span>Manage entries</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
