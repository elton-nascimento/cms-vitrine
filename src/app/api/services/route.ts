// src/app/api/services/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET: Listar todos os serviços
export async function GET() {
  try { // Adicionando um bloco try...catch para depuração
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // 👇👇👇 INÍCIO DA CORREÇÃO 👇👇👇
    // O Prisma retorna o campo 'price' como um objeto Decimal.
    // O JSON não sabe como serializar esse objeto.
    // Precisamos convertê-lo para um número antes de enviar a resposta.
    const serializableServices = services.map(service => ({
      ...service,
      price: service.price ? Number(service.price) : null,
    }));
    // 👆👆👆 FIM DA CORREÇÃO 👆👆👆

    return NextResponse.json(serializableServices);

  } catch (error) {
    console.error("Erro na API GET /api/services:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao buscar serviços." },
      { status: 500 }
    );
  }
}

// POST: Criar um novo serviço
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const data = await request.json();
  const newService = await prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
    },
  });

  return NextResponse.json(newService, { status: 201 });
}
