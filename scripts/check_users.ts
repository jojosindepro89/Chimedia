import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const users = await prisma.user.findMany()
  console.log("USERS IN DB:", users.map(u => ({ email: u.email, name: u.name, role: u.role })))
}

check().catch(console.error).finally(() => prisma.$disconnect())
