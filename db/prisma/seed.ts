import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@gmail.com,'
  },
  {
    name: 'Bob',
    email: 'bob@gmail.com',
  }
]

async function main() {
  console.log(`Start seeding ...`)
  userData.forEach(async data => {
    const user = await prisma.user.create({ data })
    console.log(`Created user with id: ${user.id}`)
  })
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
