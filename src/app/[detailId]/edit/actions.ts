"use server";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateNote = async (data: FormData) => {
  const values = Array.from(data.values());
  const [ACTION_ID_or_id] = values;
  if (ACTION_ID_or_id.toString() === "") {
    values.splice(0, 1);
  }
  const [id, title, body] = values;
  await prisma.notes.update({
    where: {
      id: parseInt(id.toString()),
    },
    data: {
      title: title.toString(),
      body: body.toString(),
    },
  });
  revalidatePath(`/${id}/edit`);
  redirect(`/${id}`);
};
