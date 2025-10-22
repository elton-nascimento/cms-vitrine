// src/app/api/settings/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // <-- VOLTOU A SER 'prisma'
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const settings = await prisma.settings.findFirst(); // <-- VOLTOU A SER 'prisma'

  return NextResponse.json(settings || {});
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const data = await request.json();

  const existingSettings = await prisma.settings.findFirst(); // <-- VOLTOU A SER 'prisma'

  let savedSettings;
  if (existingSettings) {
    savedSettings = await prisma.settings.update({ // <-- VOLTOU A SER 'prisma'
      where: { id: existingSettings.id },
      data: {
        businessName: data.businessName,
        phone: data.phone,
        address: data.address,
      },
    });
  } else {
    savedSettings = await prisma.settings.create({ // <-- VOLTOU A SER 'prisma'
      data: {
        businessName: data.businessName,
        phone: data.phone,
        address: data.address,
      },
    });
  }

  return NextResponse.json(savedSettings);
}
