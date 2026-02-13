const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'user@example.com';
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        const user = await prisma.user.create({
            data: {
                email,
                name: 'Demo User',
                role: 'USER',
                password: 'password123', // In a real app, this should be hashed
                subscription: {
                    create: {
                        plan: 'MONTHLY',
                        startDate: new Date(),
                        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                        status: 'ACTIVE'
                    }
                }
            },
        });
        console.log(`Created user: ${user.email}`);
    } else {
        console.log(`User already exists: ${existingUser.email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
