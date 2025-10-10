// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // A função authorize é onde validamos o usuário
      async authorize(credentials, req) {
        // IMPORTANTE: Esta é uma lógica de autenticação MOCK (falsa).
        // No futuro, vamos substituir isso por uma consulta ao banco de dados.
        if (credentials?.email === "admin@admin.com" && credentials?.password === "admin") {
          // Se a autenticação for bem-sucedida, retornamos um objeto de usuário.
          // O 'id' e 'name' são obrigatórios.
          return { id: "1", name: "Admin", email: "admin@admin.com" };
        }
        // Se as credenciais estiverem erradas, retornamos null.
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Diz ao NextAuth que nossa página de login customizada está em /login
  },
});

export { handler as GET, handler as POST };
