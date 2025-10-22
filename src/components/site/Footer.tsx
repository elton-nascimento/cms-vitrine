// src/components/site/Footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
