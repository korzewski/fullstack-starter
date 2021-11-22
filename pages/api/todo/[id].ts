import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../services/prisma'
import { errorResponse } from '../helper'
import type { TodoUpdateParams, TodoUpdateResponse, TodoGetResponse } from './index.d'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    if (typeof id !== 'string') {
        return errorResponse(res, `Wrong query param id: ${id}`)
    }
    
    if (req.method === 'GET') {
        return await handleGet(id, res)
    } else if (req.method === 'PUT') {
        const todoUpdate: TodoUpdateParams = JSON.parse(req.body)
        return await handlePut(id, todoUpdate, res)
    }
    
    errorResponse(res, `The HTTP ${req.method} method is not supported at this route.`)
}

async function handleGet(id: string, res: NextApiResponse) {
    const todo: TodoGetResponse = await prisma.todo.findUnique({
        where: {id: Number(id)},
    })

    res.json(todo)
}

async function handlePut(id: string, data: TodoUpdateParams, res: NextApiResponse) {
    const result: TodoUpdateResponse = await prisma.todo.update({
        where: { id: Number(id) },
        data,
    })
    res.json(result)
}
