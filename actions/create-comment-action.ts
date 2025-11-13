"use server"
import { prisma } from "../src/lib/prisma"


export async function createComment(data) {
    if(!data) return console.log('Error al obtener los datos')
        
    try {
        await prisma.comments.create({
            data: {
                name: data.name, comment: data.comment
            }
        })
    } catch (error) {
        console.log('Erro al crear comentario en la db')
    }
}