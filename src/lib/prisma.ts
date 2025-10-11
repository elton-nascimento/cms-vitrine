// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declara uma variável global para o cliente Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Evita criar múltiplas instâncias do PrismaClient em ambiente de desenvolvimento
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
