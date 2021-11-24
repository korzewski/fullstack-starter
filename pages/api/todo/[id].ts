import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/services/prisma'
import { resError, getQueryParam, requestHandler } from '@/utils/api'
import type { TodoUpdateParams, TodoUpdateResponse, TodoGetResponse } from '@/utils/api/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestHandler(req, res, {
    get: handleGet,
    put: handlePut,
  })
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(await getQueryParam(req, res, 'id'))
  if (isNaN(id)) {
    return resError(res, new Error(`Query param id is: ${id}`))
  }

  const todo: TodoGetResponse = await prisma.todo.findUnique({
    where: { id: Number(id) },
  })

  if (!todo) {
    return resError(res, new Error(`Wrong todo id: ${id}`))
  }

  res.json(todo)
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const id = await getQueryParam(req, res, 'id')
  const todoUpdate: TodoUpdateParams = JSON.parse(req.body)

  const result: TodoUpdateResponse = await prisma.todo.update({
    where: { id: Number(id) },
    data: todoUpdate,
  })

  res.json(result)
}
