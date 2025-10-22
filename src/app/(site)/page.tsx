// src/app/(site)/page.tsx

import prisma from '@/lib/prisma'; // <-- VOLTOU A SER 'prisma'
import { Phone, MapPin } from 'lucide-react';

async function getSettings() {
  const settings = await prisma.settings.findFirst(); // <-- VOLTOU A SER 'prisma'
  return settings;
}

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <section className="text-center">
      <div className="py-20">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          Bem-vindo a
        </h1>
        <h2 className="mt-4 text-6xl font-extrabold tracking-tight text-indigo-400 sm:text-7xl md:text-8xl">
          {settings?.businessName || 'Nome do Seu Negócio Aqui'}
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          A sua melhor opção na região. Qualidade e confiança que você pode ver.
        </p>
      </div>

      {(settings?.phone || settings?.address) && (
        <div className="mt-10 bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-4">Entre em Contato</h3>
          <div className="space-y-4">
            {settings.phone && (
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span className="text-lg">{settings.phone}</span>
              </div>
            )}
            {settings.address && (
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <span className="text-lg">{settings.address}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
