import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "premium@cmhsports.com";
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Upsert user
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      name: "Premium Member",
      password: hashedPassword,
    },
  });

  console.log("Premium User created/updated:", user.id);

  // Upsert active subscription
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  
  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      status: 'ACTIVE',
      plan: 'MONTHLY',
      endDate
    },
    create: {
      userId: user.id,
      status: 'ACTIVE',
      plan: 'MONTHLY',
      startDate: new Date(),
      endDate
    }
  });

  // Create a dummy order if they don't have one
  const orderCount = await prisma.order.count({ where: { userId: user.id } });
  if (orderCount === 0) {
    await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: 15000,
        status: 'COMPLETED',
      }
    });
  }
  console.log("Done seeding premium user.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
