"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createExperience(formData: FormData) {
  const org = formData.get("org") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
  const ongoing = formData.get("ongoing") === "on";
  const url = formData.get("url") as string;

  const count = await prisma.experience.count();

  await prisma.experience.create({
    data: {
      org,
      role,
      description,
      startDate,
      endDate,
      ongoing,
      url,
      order: count,
    },
  });

  revalidatePath("/admin/dashboard/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const org = formData.get("org") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
  const ongoing = formData.get("ongoing") === "on";
  const url = formData.get("url") as string;

  await prisma.experience.update({
    where: { id },
    data: {
      org,
      role,
      description,
      startDate,
      endDate,
      ongoing,
      url,
    },
  });

  revalidatePath("/admin/dashboard/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath("/admin/dashboard/experience");
}

export async function moveExperience(id: string, direction: "up" | "down") {
  const exp = await prisma.experience.findUnique({ where: { id } });
  if (!exp) return;

  const currentOrder = exp.order;
  const targetOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;

  const other = await prisma.experience.findFirst({
    where: { order: targetOrder },
    orderBy: { order: "asc" },
  });

  if (!other) return;

  await prisma.experience.update({
    where: { id },
    data: { order: targetOrder },
  });

  await prisma.experience.update({
    where: { id: other.id },
    data: { order: currentOrder },
  });

  revalidatePath("/admin/dashboard/experience");
}
