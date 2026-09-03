"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  FolderKanban, 
  Briefcase, 
  Wrench, 
  FileText, 
  Mail 
} from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home, routeHref: "/" },
    { name: "Projects", href: "/projects", icon: FolderKanban, routeHref: "/projects" },
    { name: "Experience", href: "/experience", icon: Briefcase, routeHref: "/experience" },
    { name: "Skills", href: "/skills", icon: Wrench, routeHref: "/skills" },
    { name: "Articles", href: "/blog", icon: FileText, routeHref: "/blog" },
    { name: "Contact", href: "/contact", icon: Mail, routeHref: "/contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)]">
      <nav 
        aria-label="Main Navigation"
        className="flex items-center gap-0.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 ring-1 ring-white/5 overflow-x-auto no-scrollbar"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.routeHref;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-label={item.name}
              className={`group relative flex items-center p-2 sm:p-3 rounded-full transition-all duration-300 shrink-0 ${
                isActive
                  ? "bg-white/15 text-white shadow-inner scale-105"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} className="sm:w-[18px] sm:h-[18px] shrink-0 transition-transform duration-200" />
              <div className="hidden sm:grid grid-rows-[1fr] transition-all duration-300 grid-cols-[0fr] group-hover:grid-cols-[1fr]">
                <span className="overflow-hidden whitespace-nowrap font-medium text-xs sm:text-sm pl-0 group-hover:pl-2 transition-all duration-300">
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
