"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    bio: formData.get("bio") as string,
    profileImage: formData.get("profileImage") as string,
    github: formData.get("github") as string,
    linkedin: formData.get("linkedin") as string,
    twitter: formData.get("twitter") as string,
    email: formData.get("email") as string,
    location: (formData.get("location") as string) || "India • Available Worldwide",
    availability: (formData.get("availability") as string) || "AVAILABLE FOR HIRE & FREELANCE",
    resumeUrl: (formData.get("resumeUrl") as string) || "",
    yearsBuilding: parseInt(formData.get("yearsBuilding") as string) || 0,
    projectsShipped: parseInt(formData.get("projectsShipped") as string) || 0,
    hackathonsEntered: parseInt(formData.get("hackathonsEntered") as string) || 0,
  };

  await prisma.profile.upsert({
    where: { id: "profile-1" },
    update: data,
    create: { ...data, id: "profile-1" },
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/dashboard/profile");
  redirect("/admin/dashboard/profile");
}
