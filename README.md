# CMS Vitrine - Next.js, Prisma & Tailwind

Este é um projeto de um Sistema de Gerenciamento de Conteúdo (CMS) full-stack, construído com as tecnologias mais modernas do ecossistema JavaScript. O objetivo é criar uma plataforma robusta e vendável para pequenos negócios (como barbearias, restaurantes, estúdios, etc.) gerenciarem a presença online de suas vitrines.

**Acesse a versão de produção na Vercel:** [https://cms-vitrine.vercel.app/](https://cms-vitrine.vercel.app/ )

---

## 🚀 Funcionalidades Implementadas

-   **Painel de Administração Seguro:**
    -   Sistema de autenticação com email e senha.
    -   Sessões gerenciadas com NextAuth.js.
    -   Rotas do painel protegidas.
-   **Gerenciamento de Configurações Gerais (CRUD):**
    -   Formulário para editar informações globais do site (nome do negócio, telefone, endereço).
    -   Dados persistidos em um banco de dados PostgreSQL.
-   **Gerenciamento de Serviços (CRUD Completo):**
    -   Interface para Criar, Ler, Atualizar e Excluir serviços.
    -   Tabela interativa para visualização dos serviços cadastrados.
    -   Modal para criação e edição de itens.
-   **Página Pública Dinâmica:**
    -   A página inicial do site exibe as informações gerenciadas pelo administrador em tempo real.
    -   Renderização do lado do servidor (SSR) com Next.js para máxima performance e SEO.

---

## 🛠️ Tecnologias Utilizadas

-   **Framework:** [Next.js](https://nextjs.org/ ) (com App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/ )
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/ )
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/ ) (hospedado na Vercel Postgres)
-   **ORM:** [Prisma](https://www.prisma.io/ ) (com Prisma Accelerate para otimização serverless)
-   **Autenticação:** [NextAuth.js](https://next-auth.js.org/ )
-   **Criptografia de Senha:** [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js )
-   **Ícones:** [Lucide React](https://lucide.dev/ )
-   **Deploy:** [Vercel](https://vercel.com/ ) & [Netlify](https://www.netlify.com/ )

---

## 🏁 Como Rodar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/cms-vitrine.git
    cd cms-vitrine
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env.local` na raiz do projeto.
    -   Adicione as seguintes variáveis (substitua pelos seus valores ):
        ```env
        DATABASE_URL="sua_url_do_banco_de_dados_postgresql"
        NEXTAUTH_SECRET="sua_chave_secreta_gerada"
        PRISMA_DATABASE_URL="sua_url_do_prisma_accelerate" # Opcional para dev local, mas necessário para o build
        ```

4.  **Aplique as migrações do banco de dados:**
    ```bash
    npx prisma db push
    ```

5.  **Popule o banco com dados iniciais (seed):**
    ```bash
    npx prisma db seed
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

7.  Abra [http://localhost:3000](http://localhost:3000 ) no seu navegador. Para acessar o painel de administração, vá para `/login` e use as credenciais definidas no seu script de seed.

