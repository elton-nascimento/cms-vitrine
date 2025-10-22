// src/app/api/settings/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// FUNÇÃO GET: Para buscar as configurações
export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  // Busca a primeira (e única) entrada de configurações
  const settings = await prisma.settings.findFirst();

  // Se não houver configurações, retorna um objeto vazio
  if (!settings) {
    return NextResponse.json({});
  }

  return NextResponse.json(settings);
}

// FUNÇÃO POST: Para criar ou atualizar as configurações
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const data = await request.json();

  // Busca a primeira entrada de configurações
  const existingSettings = await prisma.settings.findFirst();

  let settings;
  if (existingSettings) {
    // Se já existem, atualiza
    settings = await prisma.settings.update({
      where: { id: existingSettings.id },
      data: {
        businessName: data.businessName,
        phone: data.phone,
        address: data.address,
      },
    });
  } else {
    // Se não existem, cria
    settings = await prisma.settings.create({
      data: {
        businessName: data.businessName,
        phone: data.phone,
        address: data.address,
      },
    });
  }

  return NextResponse.json(settings);
}
