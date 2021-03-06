import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/services/prisma'
import { requestHandler } from '@/utils/api'
import type { ExtendedSession, TodoAddParams } from '@/utils/api/types'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestHandler(req, res, {
    get: handleGet,
    post: handlePost,
  })
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as ExtendedSession
  const result = await prisma.todo.findMany({
    where: {
      userId: session.userId,
    }
  })

  res.json(result)
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as ExtendedSession
  const newTodo: TodoAddParams = req.body

  if (session?.userId !== newTodo.userId) {
    throw Error('Access denied')
  }

  const result = await prisma.todo.create({
    data: newTodo,
  })

  res.json(result)
}
