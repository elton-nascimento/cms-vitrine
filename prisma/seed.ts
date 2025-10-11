// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('admin123', 12); // Criptografa a senha 'admin123'

  const user = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {}, // Se o usuário já existir, não faz nada
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password, // Salva a senha criptografada
    },
  });

  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
