import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/services/prisma'
import { getQueryParamNumber, requestHandler } from '@/utils/api'
import type { TodoUpdateParams, TodoUpdateResponse, TodoGetResponse } from '@/utils/api/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestHandler(req, res, {
    get: handleGet,
    put: handlePut,
  })
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getQueryParamNumber(req, res, 'id')

  const todo: TodoGetResponse = await prisma.todo.findUnique({
    where: { id: Number(id) },
  })

  if (!todo) {
    throw new Error(`Nothing here`)
  }

  res.json(todo)
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = getQueryParamNumber(req, res, 'id')
  const todoUpdate: TodoUpdateParams = JSON.parse(req.body)

  const result: TodoUpdateResponse = await prisma.todo.update({
    where: { id: Number(id) },
    data: todoUpdate,
  })

  res.json(result)
}
