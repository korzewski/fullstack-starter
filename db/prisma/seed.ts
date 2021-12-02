import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    Todo: {
      createMany: {
        data: [{ name: 'First task' }, { name: 'Second task' }],
      },
    },
  },
  {
    Todo: {
      createMany: {
        data: [{ name: 'Bobek run for president' }, { name: 'Czoko Rules' }, { name: 'Czoko on the space' }],
      },
    },
  },
]

async function main() {
  userData.forEach(async data => {
    await prisma.user.create({ data })
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
