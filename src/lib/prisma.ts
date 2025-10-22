// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Cliente Prisma padrão para desenvolvimento local e migrações
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;


// Cliente Prisma estendido com Accelerate para produção/serverless
const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

// Exporta o cliente correto dependendo do ambiente
// Em produção (na Vercel), usa o cliente com Accelerate.
// Em desenvolvimento, usa o cliente padrão.
export const db = process.env.NODE_ENV === 'production' ? prismaWithAccelerate : prisma;
