// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Cria um cliente Prisma que já é estendido com o Accelerate.
const prismaClient = new PrismaClient().$extends(withAccelerate());

// Exporta o cliente, mas afirmando seu tipo como PrismaClient puro.
// Isso resolve os erros de tipo no build.
export default prismaClient as unknown as PrismaClient;

