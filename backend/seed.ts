import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding dummy data...');

  const password = await bcrypt.hash('password123', 10);

  // Users
  const citizen = await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      name: 'Alice Citizen',
      email: 'citizen@example.com',
      password,
      role: 'CITIZEN',
      city: 'Springfield',
      ward: 'Ward 1',
      civicCredits: 100,
    },
  });

  const worker = await prisma.user.upsert({
    where: { email: 'worker@example.com' },
    update: {},
    create: {
      name: 'Bob Worker',
      email: 'worker@example.com',
      password,
      role: 'WORKER',
      city: 'Springfield',
      ward: 'Ward 1',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin Boss',
      email: 'admin@example.com',
      password,
      role: 'ADMIN',
      city: 'Springfield',
    },
  });

  // Collection Points
  await prisma.collectionPoint.create({
    data: {
      name: 'Downtown Recycling Center',
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Main St, Springfield',
      categories: 'Plastic,Paper,Glass',
      openingHours: 'Mon-Fri 8AM-5PM',
      capacity: 'High',
    },
  });

  // Rewards
  await prisma.reward.create({
    data: {
      name: 'Free Coffee',
      description: 'Get a free coffee at Local Cafe',
      creditsRequired: 50,
      stock: 100,
      partner: 'Local Cafe',
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
