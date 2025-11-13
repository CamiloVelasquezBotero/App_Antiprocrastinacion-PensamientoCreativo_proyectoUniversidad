import { prisma } from "../../../src/lib/prisma";

export const dynamic = 'force-dynamic'

export async function GET() {
    const comments = await prisma.comments.findMany({
        orderBy: {id : 'desc'}
    })
    return Response.json(comments)
}