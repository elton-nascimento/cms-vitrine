// src/app/(admin)/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen p-4">
      <header className="bg-gray-900 p-4 rounded shadow-md mb-4">
        <h1 className="text-xl font-semibold">CMS Vitrine - Admin</h1>
      </header>
      <main className="bg-gray-900 p-4 rounded shadow-md">
        {children}
      </main>
    </div>
  );
}
