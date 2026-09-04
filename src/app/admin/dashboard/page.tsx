export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Blog Posts</p>
          <h3 className="text-2xl font-bold">Management</h3>
          <p className="text-xs text-gray-500 mt-2">Create and edit your technical articles</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Project Showcase</p>
          <h3 className="text-2xl font-bold">Showcase</h3>
          <p className="text-xs text-gray-500 mt-2">Manage your featured and all projects</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111] border border-white/10 shadow-sm">
          <p className="text-sm text-gray-400 mb-1">Profile Info</p>
          <h3 className="text-2xl font-bold">Identity</h3>
          <p className="text-xs text-gray-500 mt-2">Update your bio, stats, and socials</p>
        </div>
      </div>
    </div>
  );
}
