import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const password = "AdminPassword2026!";
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const adminUser = await prisma.user.upsert({
        where: { email: "admin@cmhsports.com" },
        update: {
            password: hashedPassword,
            role: "ADMIN"
        },
        create: {
            name: "Super Admin",
            email: "admin@cmhsports.com",
            password: hashedPassword,
            role: "ADMIN"
        }
    });
    
    console.log("Admin user created/updated!");
    console.log("Email: admin@cmhsports.com");
    console.log("Password: " + password);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
