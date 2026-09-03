import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Code2, 
  BriefcaseBusiness, 
  Mail, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowRight,
  ArrowDown,
  Flame, 
  Calendar,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  MapPin,
  FileDown,
  Award, 
  Star
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "@/components/SocialIcons";
import IntroMarquee from "@/components/IntroMarquee";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { StickyCard002, ProjectCardData } from "@/components/StickyCardProjects";

export default async function HomePage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "profile-1" },
  });

  const featuredProjects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
    take: 4,
  });

  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
    take: 3,
  });

  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  const recentPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 2,
  });

  const starredAchievements = await prisma.post.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" },
  });

  const certifications = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });

  const projectCards: ProjectCardData[] = featuredProjects.map((p) => ({
    id: p.id,
    image: p.coverImage || "",
    title: p.title,
    description: p.description,
    tags: p.tags,
    liveUrl: p.liveUrl || undefined,
    githubUrl: p.githubUrl || undefined,
  }));

  // Fallback profile if database is empty
  const activeProfile = profile || {
    id: "profile-1",
    name: "Mohammad Aariz Khan",
    role: "Full-Stack Software Engineer & AI Builder",
    bio: "Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.",
    profileImage: "/avatar.jpg",
    github: "https://github.com/rizz-khan",
    linkedin: "https://linkedin.com/in/rizz-khan",
    twitter: "https://x.com/rizz-khan",
    email: "contact@rizz.dev",
    yearsBuilding: 3,
    projectsShipped: 15,
    hackathonsEntered: 10,
  };

  return (
    <>
      <IntroMarquee />
      <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-24 pb-28 selection:bg-white/20 selection:text-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-36">
        
        {/* ======================================================= */}
        {/* 1. HERO SECTION (EXPANSIVE FULL SCREEN VIEWPORT) */}
        {/* ======================================================= */}
        <ScrollReveal>
          <section id="hero" className="min-h-[80vh] flex flex-col justify-center space-y-10 pt-4">
            
            {/* Live Availability Badge & Location */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-mono font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>AVAILABLE FOR HIRE &amp; FREELANCE</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 bg-zinc-900/90 px-4 py-2 rounded-xl border border-white/10">
                <MapPin size={15} className="text-zinc-400" />
                <span>India • Available Remote Worldwide</span>
              </div>
            </div>

            {/* Massive Two-Tone Typography (Full-Width Immersion) */}
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11.5rem] font-black tracking-tight text-white uppercase leading-[0.88]">
                MOHAMMAD
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11.5rem] font-black tracking-tight text-zinc-700 uppercase leading-[0.88] select-none">
                AARIZ KHAN
              </h1>
            </div>

            {/* Role & Expanded Bio */}
            <div className="space-y-4 max-w-5xl">
              <p className="text-sm sm:text-lg font-mono uppercase text-zinc-400 tracking-wider">
                {activeProfile.role}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 font-normal leading-relaxed">
                {activeProfile.bio || "Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products."}
              </p>
            </div>

            {/* Action Buttons & Social Links Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-xl"
              >
                <span>Explore Featured Work</span>
                <ArrowDown size={16} />
              </a>

              <a
                href="#contact"
                className="px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/15 transition-all duration-200 flex items-center gap-2"
              >
                <span>Let's Talk</span>
                <Sparkles size={16} />
              </a>

              {/* Social Icons Bar */}
              <div className="flex items-center gap-3 sm:ml-auto">
                {activeProfile.github && (
                  <MagneticButton>
                    <a
                      href={activeProfile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <GithubIcon size={20} />
                    </a>
                  </MagneticButton>
                )}
                {activeProfile.linkedin && (
                  <MagneticButton>
                    <a
                      href={activeProfile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <LinkedinIcon size={20} />
                    </a>
                  </MagneticButton>
                )}
                {activeProfile.twitter && (
                  <MagneticButton>
                    <a
                      href={activeProfile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter Profile"
                      className="p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <TwitterIcon size={20} />
                    </a>
                  </MagneticButton>
                )}
                {activeProfile.email && (
                  <MagneticButton>
                    <a
                      href={`mailto:${activeProfile.email}`}
                      aria-label="Send Email"
                      className="p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <Mail size={20} />
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>

            {/* Stats Row (Grand Large Counters) */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
                  +{activeProfile.yearsBuilding}
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase font-mono">
                  YEARS BUILDING
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
                  +{activeProfile.projectsShipped}
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase font-mono">
                  PROJECTS SHIPPED
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
                  +{activeProfile.hackathonsEntered > 0 ? activeProfile.hackathonsEntered : 10}
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase font-mono">
                  HACKATHONS &amp; AWARDS
                </p>
              </div>
            </div>

          </section>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* 2. FEATURED ACHIEVEMENTS SECTION */}
        {/* ======================================================= */}
        {starredAchievements.length > 0 && (
          <ScrollReveal delay={0.1}>
            <section id="achievements" className="space-y-10 scroll-mt-28">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <Star size={13} className="fill-white text-white" /> Key Highlight
                  </div>
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
                    KEY
                  </h2>
                  <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
                    ACHIEVEMENTS
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {starredAchievements.map((achievement) => (
                  <Link
                    key={achievement.id}
                    href={`/blog/${achievement.slug}`}
                    className="group block p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 transition-all duration-300 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                      {achievement.coverImage && (
                        <div className="w-full md:w-80 h-56 rounded-2xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10 relative">
                          <img
                            src={achievement.coverImage}
                            alt={achievement.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-white text-zinc-950 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-lg font-mono">
                            <Star size={12} className="fill-zinc-950 text-zinc-950" /> FEATURED
                          </div>
                        </div>
                      )}

                      <div className="space-y-4 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                          <Calendar size={14} />
                          {new Date(achievement.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-black text-white group-hover:text-zinc-300 transition-colors">
                          {achievement.title}
                        </h3>

                        <p className="text-sm sm:text-lg text-zinc-400 leading-relaxed line-clamp-2">
                          {achievement.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white pt-1 group-hover:translate-x-1 transition-transform">
                          Read Achievement Breakdown <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ======================================================= */}
        {/* 3. RECENT PROJECTS SECTION */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="projects" className="space-y-10 scroll-mt-28">
            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
                RECENT
              </h2>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
                PROJECTS
              </h2>
            </div>

            <div className="w-full">
              <StickyCard002 cards={projectCards} />
            </div>

            <div className="pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white hover:text-zinc-950 text-zinc-300 font-semibold text-sm sm:text-base transition-all duration-200 border border-white/10 hover:border-white group"
              >
                View All Projects 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* 4. WORK EXPERIENCE SECTION */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="experience" className="space-y-10 scroll-mt-28">
            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
                WORK
              </h2>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
                EXPERIENCE
              </h2>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-8 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                      <p className="text-base font-semibold text-zinc-400 font-mono">{exp.org}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 font-medium bg-white/5 px-4 py-1.5 rounded-full w-fit border border-white/10 font-mono">
                      <Calendar size={14} />
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      —{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : exp.ongoing
                        ? "Present"
                        : ""}
                    </div>
                  </div>
                  <p className="text-base text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications Sub-section */}
            {certifications.length > 0 && (
              <div className="space-y-6 pt-8 border-t border-white/10">
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight">
                  Certifications &amp; Accreditations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Award size={22} />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                          {cert.title}
                        </p>
                        <p className="text-sm font-semibold text-zinc-400 font-mono">{cert.issuer}</p>
                        <p className="text-xs text-zinc-500 font-mono">
                          Issued {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white hover:text-zinc-950 text-zinc-300 font-semibold text-sm sm:text-base transition-all duration-200 border border-white/10 hover:border-white group"
              >
                View Full Timeline &amp; Certifications 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* 5. SKILLS & TOOLS SECTION (LARGE RESPONSIVE GRID) */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="skills" className="space-y-10 scroll-mt-28">
            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
                PREMIUM
              </h2>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
                SKILLS &amp; TOOLS
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 text-zinc-300 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10 shrink-0">
                      <Cpu size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                        {skill.name}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono truncate">
                        {skill.category || "Technology"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                ["Next.js", "React", "TypeScript", "Python", "TailwindCSS", "Prisma", "PostgreSQL", "Docker", "FastAPI", "Node.js"].map((name) => (
                  <div
                    key={name}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 flex items-center gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 text-zinc-300 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10 shrink-0">
                      <Cpu size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                        {name}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono">Core Stack</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* 6. LATEST ARTICLES SECTION */}
        {/* ======================================================= */}
        {recentPosts.length > 0 && (
          <ScrollReveal delay={0.1}>
            <section id="articles" className="space-y-10 scroll-mt-28">
              <div className="space-y-1">
                <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
                  LATEST
                </h2>
                <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
                  ARTICLES
                </h2>
              </div>

              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block p-8 sm:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="space-y-3 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-base text-zinc-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all shrink-0 self-start sm:self-center">
                        <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white hover:text-zinc-950 text-zinc-300 font-semibold text-sm sm:text-base transition-all duration-200 border border-white/10 hover:border-white group"
                >
                  Read All Articles 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ======================================================= */}
        {/* 7. CONTACT / LET'S CONNECT SECTION */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="contact" className="space-y-10 scroll-mt-28">
            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none">
                LET'S WORK
              </h2>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none">
                TOGETHER
              </h2>
            </div>

            <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-bold text-white">
                  Have a project in mind or want to collaborate?
                </h3>
                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Whether you're looking to build an AI product, full-stack application, or high-converting platform, let's create something extraordinary.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <MagneticButton>
                  <a
                    href={`mailto:${activeProfile.email}`}
                    className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-200 block"
                  >
                    <Mail size={18} /> Send Direct Email
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={activeProfile.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200 block"
                  >
                    <GithubIcon size={18} /> View GitHub Repos
                  </a>
                </MagneticButton>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="pt-14 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} {activeProfile.name}. All rights reserved.</p>
          <p className="text-zinc-600">Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </footer>

      </div>
    </main>
    </>
  );
}
