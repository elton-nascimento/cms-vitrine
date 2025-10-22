// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  var prisma: PrismaClient | undefined;
}

const makePrismaClient = () => {
  const client = new PrismaClient();
  
  if (process.env.PRISMA_DATABASE_URL) {
    console.log("Prisma Accelerate is enabled.");
    return client.$extends(withAccelerate());
  }
  
  return client;
};

const prisma = globalThis.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// 👇👇👇 AQUI ESTÁ A CORREÇÃO 👇👇👇
// Exportamos o prisma, mas afirmamos seu tipo como PrismaClient para resolver a ambiguidade de tipos.
export default prisma as PrismaClient;
