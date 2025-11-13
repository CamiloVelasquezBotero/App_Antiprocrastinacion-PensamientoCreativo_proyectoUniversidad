import { prisma } from "../../../src/lib/prisma";

export async function GET() {
    const comments = await prisma.comments.findMany()
    return Response.json(comments)
}