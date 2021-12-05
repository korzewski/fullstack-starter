import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/services/prisma'
import { getQueryParam, requestHandler } from '@/utils/api'
import type { TodoUpdateParams, ExtendedSession, TodoUpdateResponse } from '@/utils/api/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestHandler(req, res, {
    put: handlePut,
  })
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getSession({ req })) as ExtendedSession
  const id = getQueryParam(req, 'id')
  const todoUpdate: TodoUpdateParams = req.body

  const result = (await prisma.user.update({
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
  })) as TodoUpdateResponse

  res.json(result)
}
