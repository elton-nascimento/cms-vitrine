// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Importe o provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMS Vitrine",
  description: "Gerencie o conteúdo do seu site facilmente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* Envolva os children */}
      </body>
    </html>
  );
}
