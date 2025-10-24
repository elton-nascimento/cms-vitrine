// src/app/api/services/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface Params {
  params: { id: string };
}

// PUT: Atualizar um serviço existente
export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = params;
  const data = await request.json();
  const updatedService = await prisma.service.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
    },
  });

  return NextResponse.json(updatedService);
}

// DELETE: Remover um serviço
export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { id } = params;
  await prisma.service.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Serviço removido com sucesso' }, { status: 200 });
}
