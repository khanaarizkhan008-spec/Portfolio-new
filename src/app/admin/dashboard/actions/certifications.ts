"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCertification(formData: FormData) {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const issueDate = new Date(formData.get("issueDate") as string);
  const credentialUrl = (formData.get("credentialUrl") as string) || null;

  const count = await prisma.certification.count();

  await prisma.certification.create({
    data: {
      title,
      issuer,
      issueDate,
      credentialUrl,
      order: count,
    },
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/certifications");
  redirect("/admin/dashboard/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const issueDate = new Date(formData.get("issueDate") as string);
  const credentialUrl = (formData.get("credentialUrl") as string) || null;

  await prisma.certification.update({
    where: { id },
    data: {
      title,
      issuer,
      issueDate,
      credentialUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/certifications");
  redirect("/admin/dashboard/certifications");
}

export async function deleteCertification(id: string) {
  await prisma.certification.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/certifications");
}

export async function moveCertification(id: string, direction: "up" | "down") {
  const cert = await prisma.certification.findUnique({ where: { id } });
  if (!cert) return;

  const currentOrder = cert.order;
  const targetOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;

  const other = await prisma.certification.findFirst({
    where: { order: targetOrder },
    orderBy: { order: "asc" },
  });

  if (!other) return;

  await prisma.certification.update({
    where: { id },
    data: { order: targetOrder },
  });

  await prisma.certification.update({
    where: { id: other.id },
    data: { order: currentOrder },
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/dashboard/certifications");
}
