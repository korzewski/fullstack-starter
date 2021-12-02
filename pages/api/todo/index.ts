import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/services/prisma'
import { ensureReqMethod } from '@/utils/api'
import type { TodoGetAllResponse } from '@/utils/api/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await ensureReqMethod(req, res, ['get'])

  const result: TodoGetAllResponse = await prisma.todo.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  res.json(result)
}
