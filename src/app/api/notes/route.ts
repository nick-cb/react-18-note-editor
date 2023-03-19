import prisma from "@/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const response = await prisma.notes.create({
      data: { ...data, created_at: new Date(), updated_at: new Date() },
    });
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e: any) {
    return new Response((e as Error).message);
  }
}
