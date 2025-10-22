// src/app/(site)/layout.tsx
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import prisma from '@/lib/prisma';

// Esta função busca os dados no servidor antes de renderizar o layout
async function getSettings() {
  const settings = await prisma.settings.findFirst();
  return settings;
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Header businessName={settings?.businessName || ''} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
