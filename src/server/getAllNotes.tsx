import prisma from "@/db";
import { cache } from "react";

export const getAllNotes = cache(async (searchText: string | undefined) => {
  "use server";
  return await prisma.notes.findMany({
    where: {
      title: {
        contains: searchText,
      },
    },
    orderBy: {
      id: "desc",
    },
  });
});

