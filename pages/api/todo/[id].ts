import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/services/prisma'
import { getQueryParam, requestHandler } from '@/utils/api'
import type { TodoUpdateParams, ExtendedSession, TodoUpdateResponse } from '@/utils/api/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestHandler(req, res, {
    put: handlePut,
    delete: handleDelete,
  })
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as ExtendedSession
  const id = getQueryParam(req, 'id')
  const data: TodoUpdateParams = req.body

  const result = await prisma.todo.update({
    where: {
      id_userId: {
        id,
        userId: session.userId,
      },
    },
    data,
  })

  res.json(result)
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as ExtendedSession
  const id = getQueryParam(req, 'id')

  const todo = await prisma.todo.delete({
    where: {
      id_userId: {
        id,
        userId: session.userId,
      },
    },
  })

  res.json(todo)
}
