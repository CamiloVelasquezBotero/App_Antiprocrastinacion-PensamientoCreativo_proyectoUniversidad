"use server"
import { prisma } from "../src/lib/prisma"
import { revalidatePath } from 'next/cache'

type createCommentProps = {
        name: string,
        comment: string
}

export async function createComment(data:createCommentProps) {
    if(!data) return console.log('Error al obtener los datos')
        
    try {
        await prisma.comments.create({
            data: {
                name: data.name, comment: data.comment
            }
        })

        revalidatePath('/forum-comments')
    } catch (error) {
        console.log('Erro al crear comentario en la db')
    }
}