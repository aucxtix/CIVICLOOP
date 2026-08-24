import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    {
      name: 'John Citizen',
      email: 'citizen@civicloop.com',
      password: hashedPassword,
      role: 'CITIZEN'
    },
    {
      name: 'Mike Worker',
      email: 'worker@civicloop.com',
      password: hashedPassword,
      role: 'WORKER'
    },
    {
      name: 'Admin Sarah',
      email: 'admin@civicloop.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  ];

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) {
      await prisma.user.create({ data: u });
    }
  }
  
  console.log('Database seeded with test users! Password for all is: password123');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
