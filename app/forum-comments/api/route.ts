import { prisma } from "../../../src/lib/prisma";

export async function GET() {
    const comments = await prisma.comments.findMany()
    console.log(comments)
    return Response.json(comments)
}