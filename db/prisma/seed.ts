import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.TodoCreateInput[] = [
  {
    name: 'Prisma + PostgreSQL',
    checked: true,
  },
  {
    name: 'GraphQL',
  }
]

async function main() {
  console.log(`Start seeding ...`)
  userData.forEach(async data => {
    const result = await prisma.todo.create({ data })
    console.log(`Created todo with id: ${result.id} name: ${result.name}`)
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
