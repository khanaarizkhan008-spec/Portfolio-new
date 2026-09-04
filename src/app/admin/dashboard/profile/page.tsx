import { prisma } from "@/lib/prisma";
import { updateProfile } from "../actions/profile";
import {
  User,
  Code2,
  BriefcaseBusiness,
  Mail,
  Image as ImageIcon,
  CalendarDays,
  Rocket,
  Trophy,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "profile-1" },
  });

  if (!profile) {
    return <div className="p-4 text-center">Profile not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
      </div>

      <form action={updateProfile} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Identity</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </label>
                <input 
                  name="name" 
                  defaultValue={profile.name} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <BriefcaseBusiness size={16} />
                  Role / Title
                </label>
                <input 
                  name="role" 
                  defaultValue={profile.role} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <Code2 size={16} />
                  Bio
                </label>
                <textarea 
                  name="bio" 
                  defaultValue={profile.bio} 
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Socials & Contact</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  role="img"
                  aria-label="GitHub"
                  className="h-[18px] w-[18px] bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url(https://img.icons8.com/ios-filled/50/6b7280/github.png)" }}
                />
                <input 
                  name="github" 
                  defaultValue={profile.github || ""} 
                  placeholder="GitHub URL"
                  className="flex-1 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <span
                  role="img"
                  aria-label="LinkedIn"
                  className="h-[18px] w-[18px] bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url(https://img.icons8.com/ios-filled/50/6b7280/linkedin.png)" }}
                />
                <input 
                  name="linkedin" 
                  defaultValue={profile.linkedin || ""} 
                  placeholder="LinkedIn URL"
                  className="flex-1 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <span
                  role="img"
                  aria-label="X / Twitter"
                  className="h-[18px] w-[18px] bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url(https://img.icons8.com/ios-filled/50/6b7280/twitter.png)" }}
                />
                <input 
                  name="twitter" 
                  defaultValue={profile.twitter || ""} 
                  placeholder="X / Twitter URL"
                  className="flex-1 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                <input 
                  name="email" 
                  defaultValue={profile.email || ""} 
                  placeholder="Email Address"
                  className="flex-1 px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div className="space-y-2 mt-4">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Profile Image URL
                </label>
                <input 
                  name="profileImage" 
                  defaultValue={profile.profileImage || ""} 
                  className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-amber-500 border-b border-white/10 pb-2">Stats Row</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <CalendarDays size={16} />
                Years Building
              </label>
              <input 
                name="yearsBuilding" 
                type="number"
                defaultValue={profile.yearsBuilding} 
                className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Rocket size={16} />
                Projects Shipped
              </label>
              <input 
                name="projectsShipped" 
                type="number"
                defaultValue={profile.projectsShipped} 
                className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Trophy size={16} />
                Hackathons Entered
              </label>
              <input 
                name="hackathonsEntered" 
                type="number"
                defaultValue={profile.hackathonsEntered} 
                className="w-full px-4 py-2 rounded-lg bg-[#111] border border-white/10 text-white outline-none focus:border-amber-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
