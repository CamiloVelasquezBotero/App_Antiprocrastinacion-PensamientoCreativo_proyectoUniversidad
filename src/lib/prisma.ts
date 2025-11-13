import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

/* Creando esta insntancia de Prisma, nos evitamos tener que estar creando varias aperturas de prisma en varios 
documentos, y abrirla una sola vez y llamarla */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma