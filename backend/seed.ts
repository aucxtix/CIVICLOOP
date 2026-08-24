import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding comprehensive dummy data for CivicLoop...');

  const password = await bcrypt.hash('password123', 10);

  // =========================================
  // 1. USERS
  // =========================================
  console.log('Seeding Users...');
  const citizen1 = await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: { civicCredits: 1250 },
    create: {
      name: 'Alice Citizen',
      email: 'citizen@example.com',
      password,
      role: 'CITIZEN',
      city: 'Springfield',
      ward: 'Ward 1',
      civicCredits: 1250,
      avatar: 'https://i.pravatar.cc/150?u=alice'
    },
  });

  const citizen2 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password,
      role: 'CITIZEN',
      city: 'Springfield',
      ward: 'Ward 2',
      civicCredits: 400,
      avatar: 'https://i.pravatar.cc/150?u=john'
    },
  });

  const worker1 = await prisma.user.upsert({
    where: { email: 'worker@example.com' },
    update: {},
    create: {
      name: 'Bob Worker',
      email: 'worker@example.com',
      password,
      role: 'WORKER',
      city: 'Springfield',
      ward: 'Ward 1',
      avatar: 'https://i.pravatar.cc/150?u=bob'
    },
  });

  const worker2 = await prisma.user.upsert({
    where: { email: 'mike@example.com' },
    update: {},
    create: {
      name: 'Michael Scott',
      email: 'mike@example.com',
      password,
      role: 'WORKER',
      city: 'Springfield',
      ward: 'Ward 3',
      avatar: 'https://i.pravatar.cc/150?u=mike'
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
      avatar: 'https://i.pravatar.cc/150?u=admin'
    },
  });

  // =========================================
  // 2. COLLECTION POINTS (Hotspots)
  // =========================================
  console.log('Seeding Collection Points...');
  await prisma.collectionPoint.deleteMany();
  await prisma.collectionPoint.createMany({
    data: [
      {
        name: 'Downtown Recycling Center',
        latitude: 40.7128,
        longitude: -74.0060,
        address: '123 Main St, Springfield',
        categories: 'Plastic,Paper,Glass',
        openingHours: 'Mon-Fri 8AM-5PM',
        capacity: 'High',
      },
      {
        name: 'Westside E-Waste Dropoff',
        latitude: 40.7200,
        longitude: -74.0100,
        address: '45 Tech Blvd, Springfield',
        categories: 'E-Waste,Batteries',
        openingHours: 'Weekends 10AM-4PM',
        capacity: 'Medium',
      },
      {
        name: 'Greenfield Composting Hub',
        latitude: 40.7050,
        longitude: -74.0150,
        address: '88 Nature Way, Springfield',
        categories: 'Organic',
        openingHours: '24/7',
        capacity: 'High',
      }
    ]
  });

  // =========================================
  // 3. REWARDS
  // =========================================
  console.log('Seeding Rewards...');
  await prisma.reward.deleteMany();
  const rewards = await prisma.reward.createMany({
    data: [
      { name: '$5 Transit Pass', description: 'Get a free $5 pass for City Transit', creditsRequired: 500, stock: 100, partner: 'City Transit' },
      { name: 'Free Coffee', description: 'Get a free coffee at Local Cafe', creditsRequired: 200, stock: 50, partner: 'Local Cafe' },
      { name: 'Reusable Water Bottle', description: 'Premium eco-friendly bottle', creditsRequired: 1200, stock: 20, partner: 'EcoStore' },
      { name: 'Museum Entry Ticket', description: 'One free adult entry', creditsRequired: 800, stock: 10, partner: 'City Museum' },
      { name: 'Grocery Discount 10%', description: '10% off your next purchase', creditsRequired: 600, stock: 200, partner: 'FreshFoods Market' },
    ]
  });

  // =========================================
  // 4. VEHICLES
  // =========================================
  console.log('Seeding Vehicles...');
  await prisma.vehicle.deleteMany();
  await prisma.vehicle.createMany({
    data: [
      { vehicleId: 'V-001', modelAndPlate: 'Volvo FL Electric (MH 01 EA 1234)', status: 'Active', capacity: '80% Full', location: 'Zone 4A', driverId: worker1.id },
      { vehicleId: 'V-002', modelAndPlate: 'Tata Ultra E.9 (MH 02 EB 5678)', status: 'Idle', capacity: '0% Full', location: 'Depot' },
      { vehicleId: 'V-003', modelAndPlate: 'Ashok Leyland Boss (MH 03 EC 9012)', status: 'Maintenance', capacity: '- Full', location: 'Garage' },
      { vehicleId: 'V-004', modelAndPlate: 'Volvo FL Electric (MH 01 EA 3456)', status: 'Active', capacity: '45% Full', location: 'Zone 2B', driverId: worker2.id },
    ]
  });

  // =========================================
  // 5. REPORTS / TASKS
  // =========================================
  console.log('Seeding Reports...');
  await prisma.report.deleteMany();
  
  // Pending Tasks (Queue)
  await prisma.report.create({
    data: {
      citizenId: citizen1.id,
      imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80',
      description: 'Large pile of cardboard boxes on the sidewalk',
      category: 'Paper',
      aiConfidence: 0.95,
      latitude: 40.7130,
      longitude: -74.0050,
      address: 'Near 50th Street Station',
      status: 'REPORTED',
      priority: 'NORMAL'
    }
  });

  await prisma.report.create({
    data: {
      citizenId: citizen2.id,
      imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=800&q=80',
      description: 'Dumped electronics and wires',
      category: 'E-Waste',
      aiConfidence: 0.88,
      latitude: 40.7180,
      longitude: -74.0090,
      address: 'Alley behind Tech Park',
      status: 'REPORTED',
      priority: 'HIGH'
    }
  });

  // Active Tasks (Worker 1)
  await prisma.report.create({
    data: {
      citizenId: citizen2.id,
      workerId: worker1.id,
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
      description: 'Plastic bottles scattered in the park',
      category: 'Plastic',
      aiConfidence: 0.92,
      latitude: 40.7150,
      longitude: -74.0100,
      address: 'Central Park South',
      status: 'EN_ROUTE',
      priority: 'NORMAL'
    }
  });

  // Completed / Verified (For Admin Dashboard & Citizen History)
  await prisma.report.create({
    data: {
      citizenId: citizen1.id,
      workerId: worker2.id,
      imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1585935431665-27a9be87ab5b?w=800&q=80', // Clean street
      description: 'Organic waste spillage',
      category: 'Organic',
      aiConfidence: 0.99,
      latitude: 40.7110,
      longitude: -74.0030,
      address: 'Farmer Market Square',
      status: 'VERIFIED',
      priority: 'HIGH',
      civicTrustScore: 100
    }
  });

  // =========================================
  // 6. TRANSACTIONS
  // =========================================
  console.log('Seeding Transactions...');
  await prisma.transaction.deleteMany();
  await prisma.transaction.createMany({
    data: [
      { userId: citizen1.id, amount: 50, type: 'EARN_REPORT', description: 'Reported Organic waste spillage' },
      { userId: citizen1.id, amount: 50, type: 'EARN_VERIFY', description: 'Verified Cleanup Reward' },
      { userId: citizen1.id, amount: 200, type: 'EARN_BONUS', description: 'Weekly Activity Bonus' },
      { userId: citizen1.id, amount: -200, type: 'SPEND_REWARD', description: 'Redeemed: Free Coffee' },
    ]
  });

  // =========================================
  // 7. AUDIT LOGS
  // =========================================
  console.log('Seeding Audit Logs...');
  await prisma.auditLog.deleteMany();
  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: 'VERIFIED_REPORT', metadata: '{"reportId": "sample", "score": 100}' },
      { userId: worker1.id, action: 'ACCEPTED_TASK', metadata: '{"taskId": "sample"}' },
      { userId: admin.id, action: 'CREATED_REWARD', metadata: '{"rewardName": "Free Coffee"}' },
      { userId: admin.id, action: 'ASSIGNED_VEHICLE', metadata: '{"vehicleId": "V-001", "driverId": "worker1"}' }
    ]
  });

  console.log('✅ Comprehensive Seeding Completed Successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
