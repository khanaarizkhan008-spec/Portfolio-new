"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const coverImage = formData.get("coverImage") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const featured = formData.get("featured") === "on";

  const count = await prisma.project.count();

  await prisma.project.create({
    data: {
      title,
      description,
      tags,
      coverImage,
      liveUrl,
      githubUrl,
      featured,
      order: count,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/dashboard/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const coverImage = formData.get("coverImage") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const featured = formData.get("featured") === "on";

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      tags,
      coverImage,
      liveUrl,
      githubUrl,
      featured,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/dashboard/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/dashboard/projects");
}

export async function moveProject(id: string, direction: "up" | "down") {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return;

  const currentOrder = project.order;
  const targetOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;

  const other = await prisma.project.findFirst({
    where: { order: targetOrder },
    orderBy: { order: "asc" },
  });

  if (!other) return;

  await prisma.project.update({
    where: { id },
    data: { order: targetOrder },
  });

  await prisma.project.update({
    where: { id: other.id },
    data: { order: currentOrder },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/dashboard/projects");
}
