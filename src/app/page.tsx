import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  ArrowDown, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Star, 
  Cpu, 
  Award,
  Layers,
  CheckCircle2,
  Terminal,
  Mail
} from "lucide-react";
import { StickyCard002 } from "@/components/StickyCardProjects";
import MagneticButton from "@/components/MagneticButton";
import ScrollReveal from "@/components/ScrollReveal";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/SocialIcons";
import IntroMarquee from "@/components/IntroMarquee";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactForm from "@/components/ContactForm";
import { FileText } from "lucide-react";
import RollingNumber from "@/components/RollingNumber";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await prisma.profile.findUnique({
    where: { id: "profile-1" },
  });

  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
    take: 6,
  });

  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  const certifications = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });

  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  const starredAchievements = await prisma.post.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const recentPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // Transform projects for StickyCard component
  const projectCards = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    tags: p.tags,
    image: p.coverImage || "/placeholder-project.jpg",
    liveUrl: p.liveUrl || undefined,
    githubUrl: p.githubUrl || undefined,
  }));

  const activeProfile = profile || {
    name: "Mohammad Aariz Khan",
    role: "Full-Stack Software Engineer & AI Builder",
    bio: "Obsessed with creating high-performance software, autonomous AI systems, and elegant digital products. 3+ years building and shipping across modern stacks.",
    profileImage: "/avatar.jpg",
    github: "https://github.com/khanaarizkhan008-spec",
    linkedin: "https://linkedin.com/in/rizz-khan",
    twitter: "https://x.com/rizz-khan",
    email: "khanaarizkhan008@gmail.com",
    location: "India • Available Worldwide",
    availability: "AVAILABLE FOR HIRE & FREELANCE",
    resumeUrl: "",
    yearsBuilding: 3,
    projectsShipped: 15,
    hackathonsEntered: 10,
  };

  const nameParts = (activeProfile.name || "Mohammad Aariz Khan").trim().split(" ");
  const firstName = nameParts[0] || "Mohammad";
  const lastName = nameParts.slice(1).join(" ") || "Aariz Khan";

  return (
    <>
      <IntroMarquee name={activeProfile.name} role={activeProfile.role} />
      <main className="min-h-screen bg-[#09090b] text-zinc-100 pt-20 sm:pt-28 pb-24 selection:bg-white/20 selection:text-white overflow-x-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 space-y-24 sm:space-y-32 lg:space-y-40">
        
        {/* ======================================================= */}
        {/* 1. HERO SECTION (EXPANSIVE FULL SCREEN VIEWPORT) */}
        {/* ======================================================= */}
        <ScrollReveal>
          <section id="hero" className="min-h-[75vh] sm:min-h-[82vh] flex flex-col justify-center space-y-8 sm:space-y-10 pt-2 sm:pt-4">
            
            {/* Live Availability Badge & Location */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-mono font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="truncate">{activeProfile.availability || "AVAILABLE FOR HIRE & FREELANCE"}</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 bg-zinc-900/90 px-3.5 py-1.5 rounded-xl border border-white/10">
                <MapPin size={14} className="text-zinc-400 shrink-0" />
                <span className="truncate">{activeProfile.location || "India • Available Worldwide"}</span>
              </div>
            </div>

            {/* Massive Responsive Two-Tone Typography */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11.5rem] font-black tracking-tight text-white uppercase leading-[0.9] break-words">
                {firstName}
              </h1>
              <h1 className="text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11.5rem] font-black tracking-tight text-zinc-700 uppercase leading-[0.9] select-none break-words">
                {lastName}
              </h1>
            </div>

            {/* Role & Expanded Bio */}
            <div className="space-y-3 sm:space-y-4 max-w-5xl">
              <p className="text-xs sm:text-base md:text-lg font-mono uppercase text-zinc-400 tracking-wider">
                {activeProfile.role}
              </p>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 font-normal leading-relaxed">
                {activeProfile.bio || "Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products."}
              </p>
            </div>

            {/* Action Buttons & Social Links Row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Explore Featured Work</span>
                <ArrowDown size={16} />
              </a>

              <a
                href="#contact"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/15 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Let's Talk</span>
                <Sparkles size={16} />
              </a>

              <a
                href={activeProfile.resumeUrl || `mailto:${activeProfile.email}?subject=Resume%20Request%20-%20${encodeURIComponent(activeProfile.name)}`}
                target={activeProfile.resumeUrl ? "_blank" : undefined}
                rel={activeProfile.resumeUrl ? "noopener noreferrer" : undefined}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/10 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FileText size={15} />
                <span>Resume / CV</span>
              </a>

              {/* Social Icons Bar */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 sm:ml-auto pt-2 sm:pt-0">
                {activeProfile.github && (
                  <MagneticButton>
                    <a
                      href={activeProfile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="p-3 sm:p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <GithubIcon size={18} />
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
                      className="p-3 sm:p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <LinkedinIcon size={18} />
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
                      className="p-3 sm:p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <TwitterIcon size={18} />
                    </a>
                  </MagneticButton>
                )}
                {activeProfile.email && (
                  <MagneticButton>
                    <a
                      href={`mailto:${activeProfile.email}`}
                      aria-label="Send Email"
                      className="p-3 sm:p-3.5 rounded-2xl bg-zinc-900 text-zinc-300 hover:bg-white hover:text-zinc-950 border border-white/10 transition-all block"
                    >
                      <Mail size={18} />
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>

            {/* Stats Row (Horizontal Counters Across All Viewports) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-10 border-t border-white/10">
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
                  +<RollingNumber value={activeProfile.yearsBuilding || 0} />
                </p>
                <p className="text-[9px] xs:text-[11px] sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase font-mono truncate">
                  YEARS BUILDING
                </p>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
                  +<RollingNumber value={activeProfile.projectsShipped || 0} />
                </p>
                <p className="text-[9px] xs:text-[11px] sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase font-mono truncate">
                  PROJECTS SHIPPED
                </p>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
                  +<RollingNumber value={activeProfile.hackathonsEntered > 0 ? activeProfile.hackathonsEntered : 10} />
                </p>
                <p className="text-[9px] xs:text-[11px] sm:text-sm font-semibold tracking-wider text-zinc-500 uppercase font-mono truncate">
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
            <section id="achievements" className="space-y-8 sm:space-y-10 scroll-mt-24">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <Star size={13} className="fill-white text-white" /> Key Highlight
                  </div>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
                    KEY
                  </h2>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
                    ACHIEVEMENTS
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {starredAchievements.map((achievement) => (
                  <Link
                    key={achievement.id}
                    href={`/blog/${achievement.slug}`}
                    className="group block p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 transition-all duration-300 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
                      {achievement.coverImage && (
                        <div className="w-full md:w-80 h-48 sm:h-56 rounded-2xl overflow-hidden bg-zinc-800 shrink-0 border border-white/10 relative">
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

                      <div className="space-y-3 sm:space-y-4 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                          <Calendar size={14} />
                          {new Date(achievement.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white group-hover:text-zinc-300 transition-colors">
                          {achievement.title}
                        </h3>

                        <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed line-clamp-2">
                          {achievement.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-bold text-white pt-1 group-hover:translate-x-1 transition-transform">
                          Read Achievement Breakdown <ArrowRight size={16} />
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
          <section id="projects" className="space-y-8 sm:space-y-10 scroll-mt-24">
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
                RECENT
              </h2>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
                PROJECTS
              </h2>
            </div>

            <div className="w-full">
              <StickyCard002 cards={projectCards} />
            </div>

            <div className="pt-2 sm:pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white hover:text-zinc-950 text-zinc-300 font-semibold text-xs sm:text-base transition-all duration-200 border border-white/10 hover:border-white group"
              >
                View All Projects 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* 4. WORK & STUDY EXPERIENCE TIMELINE */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="experience" className="space-y-8 sm:space-y-10 scroll-mt-24">
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
                WORK &amp;
              </h2>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
                STUDY EXPERIENCE
              </h2>
            </div>

            <ExperienceTimeline workExperiences={experiences} />

            {/* Certifications Sub-section */}
            {certifications.length > 0 && (
              <div className="space-y-6 pt-6 sm:pt-8 border-t border-white/10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                  Certifications &amp; Accreditations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 flex items-start gap-3.5 sm:gap-4 group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Award size={20} />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                          {cert.title}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-zinc-400 font-mono">{cert.issuer}</p>
                        <p className="text-[11px] sm:text-xs text-zinc-500 font-mono">
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
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white hover:text-zinc-950 text-zinc-300 font-semibold text-xs sm:text-base transition-all duration-200 border border-white/10 hover:border-white group"
              >
                View Full Timeline &amp; Certifications 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* 5. SKILLS & TOOLS SECTION (RESPONSIVE GRID) */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="skills" className="space-y-8 sm:space-y-10 scroll-mt-24">
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
                PREMIUM
              </h2>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
                SKILLS &amp; TOOLS
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 text-zinc-300 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10 shrink-0">
                      <Cpu size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                        {skill.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-zinc-500 font-mono truncate">
                        {skill.category || "Technology"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                ["Next.js", "React", "TypeScript", "Python", "TailwindCSS", "Prisma", "PostgreSQL", "Docker", "FastAPI", "Node.js"].map((name) => (
                  <div
                    key={name}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200 flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 text-zinc-300 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10 shrink-0">
                      <Cpu size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white group-hover:text-zinc-200 transition-colors truncate">
                        {name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-zinc-500 font-mono">Core Stack</p>
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
            <section id="articles" className="space-y-8 sm:space-y-10 scroll-mt-24">
              <div className="space-y-1">
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
                  LATEST
                </h2>
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
                  ARTICLES
                </h2>
              </div>

              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block p-6 sm:p-8 md:p-9 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                      <div className="space-y-2.5 sm:space-y-3 flex-1">
                        <p className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all shrink-0 self-start sm:self-center">
                        <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white hover:text-zinc-950 text-zinc-300 font-semibold text-xs sm:text-base transition-all duration-200 border border-white/10 hover:border-white group"
                >
                  Read All Articles 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ======================================================= */}
        {/* 7. CONTACT / LET'S CONNECT SECTION */}
        {/* ======================================================= */}
        <ScrollReveal delay={0.1}>
          <section id="contact" className="space-y-8 sm:space-y-10 scroll-mt-24">
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase leading-none break-words">
                LET'S WORK
              </h2>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-zinc-700 uppercase leading-none select-none break-words">
                TOGETHER
              </h2>
            </div>

            <ContactForm email={activeProfile.email || "contact@rizz.dev"} />
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="pt-10 sm:pt-14 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-mono text-center sm:text-left">
          <p>© {new Date().getFullYear()} {activeProfile.name}. All rights reserved.</p>
          <p className="text-zinc-600">Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </footer>

      </div>
    </main>
    </>
  );
}
