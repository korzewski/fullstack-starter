import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/services/prisma'
import { getQueryParam, requestHandler } from '@/utils/api'
import type { TodoUpdateParams, TodoGetResponse, ExtendedSession } from '@/utils/api/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestHandler(req, res, {
    get: handleGet,
    put: handlePut,
  })
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getQueryParam(req, 'id')
  const todo: TodoGetResponse = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo) {
    throw new Error(`Nothing here`)
  }

  res.json(todo)
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as ExtendedSession
  const id = getQueryParam(req, 'id')
  const todoUpdate: TodoUpdateParams = JSON.parse(req.body)

  const result = await prisma.user.update({
    where: {
      id: session?.userId,
    },
    data: {
      Todo: {
        update: {
          where: { id },
          data: todoUpdate,
        },
      },
    },
  })

  res.json(result)
}
