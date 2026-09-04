"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: FormData) {
  const name = formData.get("name") as string;
  const category = (formData.get("category") as string) || "General";

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

export async function updateSkill(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const category = (formData.get("category") as string) || "General";

  await prisma.skill.update({
    where: { id },
    data: {
      name,
      category,
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

export async function moveSkill(id: string, direction: "up" | "down") {
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) return;

  const currentOrder = skill.order;
  const targetOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;

  const other = await prisma.skill.findFirst({
    where: { order: targetOrder },
    orderBy: { order: "asc" },
  });

  if (!other) return;

  await prisma.skill.update({
    where: { id },
    data: { order: targetOrder },
  });

  await prisma.skill.update({
    where: { id: other.id },
    data: { order: currentOrder },
  });

  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}
