const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true, email: true, name: true, role: true }
    })

    console.log('--- ADMIN USERS ---')
    if (admins.length === 0) {
        console.log('No admin users found.')
    } else {
        admins.forEach(u => console.log(`${u.email} (${u.name}) - ${u.role}`))
    }
    console.log('-------------------')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
