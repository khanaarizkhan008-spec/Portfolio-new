"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const type = (formData.get("type") as string) || "work";
  const org = formData.get("org") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
  const ongoing = formData.get("ongoing") === "on";
  const url = (formData.get("url") as string) || null;
  const location = (formData.get("location") as string) || null;
  const skills = (formData.get("skills") as string) || null;

  const count = await prisma.experience.count();

  await prisma.experience.create({
    data: {
      type,
      org,
      role,
      description,
      startDate,
      endDate,
      ongoing,
      url,
      location,
      skills,
      order: count,
    },
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/experience");
  redirect("/admin/dashboard/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const type = (formData.get("type") as string) || "work";
  const org = formData.get("org") as string;
  const role = formData.get("role") as string;
  const description = formData.get("description") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
  const ongoing = formData.get("ongoing") === "on";
  const url = (formData.get("url") as string) || null;
  const location = (formData.get("location") as string) || null;
  const skills = (formData.get("skills") as string) || null;

  await prisma.experience.update({
    where: { id },
    data: {
      type,
      org,
      role,
      description,
      startDate,
      endDate,
      ongoing,
      url,
      location,
      skills,
    },
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/experience");
  redirect("/admin/dashboard/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/experience");
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

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/experience");
}
