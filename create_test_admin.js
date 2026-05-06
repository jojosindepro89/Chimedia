const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test_admin_debug@cmhsports.com' },
    update: { password: hash, role: 'ADMIN' },
    create: {
      email: 'test_admin_debug@cmhsports.com',
      name: 'test_admin_debug',
      password: hash,
      role: 'ADMIN'
    }
  });
  console.log('Created:', user);
}
main().finally(() => prisma.$disconnect());
