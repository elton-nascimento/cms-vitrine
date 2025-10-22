// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
// 👇 MUDANÇA 1: Importando 'withAccelerate' em vez de 'PrismaAccelerate'
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  var prisma: PrismaClient | undefined;
}

const makePrismaClient = () => {
  const client = new PrismaClient();
  
  if (process.env.PRISMA_DATABASE_URL) {
    console.log("Prisma Accelerate is enabled.");
    // 👇 MUDANÇA 2: Usando a função 'withAccelerate()'
    return client.$extends(withAccelerate());
  }
  
  return client;
};

const prisma = globalThis.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
