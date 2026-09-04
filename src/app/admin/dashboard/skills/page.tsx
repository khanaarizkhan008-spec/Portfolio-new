import { prisma } from "@/lib/prisma";
import SkillsManagerClient from "./SkillsManagerClient";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Skills & Tools</h1>
        <p className="text-sm text-gray-400">Manage technical skills, categorizations, and showcase order</p>
      </div>

      <SkillsManagerClient initialSkills={skills} />
    </div>
  );
}
