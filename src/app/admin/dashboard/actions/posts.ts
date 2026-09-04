"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const published = formData.get("published") === "on";

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const published = formData.get("published") === "on";

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/dashboard/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({ where: { id } });
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`);
  }
  revalidatePath("/admin/dashboard/posts");
}
