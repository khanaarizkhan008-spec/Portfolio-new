"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;

  const count = await prisma.skill.count();

  await prisma.skill.create({
    data: {
      name,
      category,
      order: count,
    },
  });

  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}

export async function updateSkillOrder(id: string, newOrder: number) {
  await prisma.skill.update({
    where: { id },
    data: { order: newOrder },
  });

  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}
