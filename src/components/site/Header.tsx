// src/components/site/Header.tsx
import Link from 'next/link';

type HeaderProps = {
  businessName?: string;
};

export function Header({ businessName }: HeaderProps) {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300">
          {businessName || 'Meu Negócio'}
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:text-indigo-300">Início</Link>
          {/* Futuros links: <Link href="/servicos">Serviços</Link> */}
          {/* Futuros links: <Link href="/contato">Contato</Link> */}
        </nav>
      </div>
    </header>
  );
}
