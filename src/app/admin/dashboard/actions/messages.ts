"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/messages");
}
