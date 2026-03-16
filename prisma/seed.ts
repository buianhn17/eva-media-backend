import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {

  const adminEmail = "admin@media.com"
  const adminPassword = "123456"

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {

    const hash = await bcrypt.hash(adminPassword, 10)

    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hash,
        role: Role.ADMIN
      }
    })

    console.log("Admin account created")
    console.log("Email:", adminEmail)
    console.log("Password:", adminPassword)

  } else {

    console.log("Admin already exists")

  }

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())