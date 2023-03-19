import prisma from "@/db";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  try {
    const response = await prisma.notes.update({
      where: { id: parseInt(id) },
      data: { ...data, updated_at: new Date() },
    });
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e: any) {
    return new Response((e as Error).message);
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").at(-1) || "";
  try {
    const response = await prisma.notes.delete({
      where: { id: parseInt(id) },
    });
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e: any) {
    return new Response((e as Error).message);
  }
}
