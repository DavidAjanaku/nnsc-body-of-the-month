import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const testPassword = await bcrypt.hash('password123', 10);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nnsc.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@nnsc.com',
      password: adminPassword,
      gender: 'MALE',
      role: 'ADMIN',
      goals: 'Manage the gym community',
      trainingDuration: '5 years',
      currentWeight: 90.0,
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@nnsc.com' },
    update: {},
    create: {
      name: 'David Ajanaku',
      email: 'test@nnsc.com',
      password: testPassword,
      gender: 'MALE',
      role: 'MEMBER',
      goals: 'Build muscle mass and increase strength',
      trainingDuration: '2 years',
      currentWeight: 85.5,
    },
  });

  console.log('✅ Created test user:', testUser.email);

  // Create initial measurement (3 months ago)
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  await prisma.measurement.create({
    data: {
      userId: testUser.id,
      date: threeMonthsAgo,
      weight: 82.0,
      chest: 98.0,
      arms: 35.0,
      waist: 85.0,
      thighs: 58.0,
      neck: 38.0,
      glutes: 95.0,
    },
  });

  // Create measurement (2 months ago)
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  await prisma.measurement.create({
    data: {
      userId: testUser.id,
      date: twoMonthsAgo,
      weight: 83.5,
      chest: 100.0,
      arms: 36.0,
      waist: 83.0,
      thighs: 59.0,
      neck: 38.5,
      glutes: 96.0,
    },
  });

  // Create measurement (1 month ago)
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  await prisma.measurement.create({
    data: {
      userId: testUser.id,
      date: oneMonthAgo,
      weight: 84.8,
      chest: 102.0,
      arms: 37.5,
      waist: 81.0,
      thighs: 60.0,
      neck: 39.0,
      glutes: 97.0,
    },
  });

  // Create current measurement
  await prisma.measurement.create({
    data: {
      userId: testUser.id,
      date: new Date(),
      weight: 85.5,
      chest: 104.0,
      arms: 38.5,
      waist: 79.0,
      thighs: 61.0,
      neck: 39.5,
      glutes: 98.0,
    },
  });

  console.log('✅ Created 4 measurements showing progress over time');

  // Create upcoming competition
  const nextCompetition = new Date();
  nextCompetition.setDate(1); // First day of current month
  nextCompetition.setMonth(nextCompetition.getMonth() + 1); // Next month
  nextCompetition.setHours(10, 0, 0, 0);

  const competition = await prisma.competition.create({
    data: {
      name: 'February Body of the Month',
      date: nextCompetition,
      status: 'UPCOMING',
    },
  });

  console.log('✅ Created upcoming competition:', competition.name);

  // Create some workout routines
  await prisma.workout.create({
    data: {
      title: 'Chest Day Destroyer',
      description: 'Intense chest workout to build mass and strength',
      bodyPart: 'CHEST',
      difficulty: 'INTERMEDIATE',
      content: `
1. Bench Press - 4 sets x 8-10 reps
2. Incline Dumbbell Press - 4 sets x 10-12 reps
3. Cable Flyes - 3 sets x 12-15 reps
4. Dips - 3 sets x 10-12 reps
5. Push-ups - 3 sets to failure
      `,
    },
  });

  await prisma.workout.create({
    data: {
      title: 'Leg Day Power',
      description: 'Build strong, powerful legs',
      bodyPart: 'LEGS',
      difficulty: 'ADVANCED',
      content: `
1. Squats - 5 sets x 5 reps (heavy)
2. Romanian Deadlifts - 4 sets x 8-10 reps
3. Leg Press - 4 sets x 12-15 reps
4. Walking Lunges - 3 sets x 20 steps
5. Leg Curls - 3 sets x 12-15 reps
6. Calf Raises - 4 sets x 15-20 reps
      `,
    },
  });

  await prisma.workout.create({
    data: {
      title: 'Back & Biceps Blast',
      description: 'Complete back and biceps workout',
      bodyPart: 'BACK',
      difficulty: 'INTERMEDIATE',
      content: `
1. Deadlifts - 4 sets x 6-8 reps
2. Pull-ups - 4 sets x 8-10 reps
3. Barbell Rows - 4 sets x 10-12 reps
4. Lat Pulldowns - 3 sets x 12-15 reps
5. Barbell Curls - 3 sets x 10-12 reps
6. Hammer Curls - 3 sets x 12-15 reps
      `,
    },
  });

  console.log('✅ Created 3 workout routines');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📧 Member Account:');
  console.log('   Email: test@nnsc.com');
  console.log('   Password: password123');
  console.log('\n👨‍💼 Admin Account:');
  console.log('   Email: admin@nnsc.com');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
