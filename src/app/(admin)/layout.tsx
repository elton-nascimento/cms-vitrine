// src/app/(admin)/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link"; // Importe o Link
import React from "react"; // Boa prática garantir que o React está no escopo

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <header className="bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">CMS Vitrine - Admin</h1>
          {/* 👇👇👇 NOVO MENU DE NAVEGAÇÃO 👇👇👇 */}
          <nav className="space-x-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white">Início</Link>
            <Link href="/dashboard/services" className="text-gray-300 hover:text-white">Serviços</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
