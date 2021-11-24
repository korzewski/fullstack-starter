import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/services/prisma'
import type { TodoGetAllResponse } from './index.d'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        await handleGet(res)
    } else {
        res.status(400).json({
            error: `The HTTP ${req.method} method is not supported at this route.`
        })
    }
}

async function handleGet(res: NextApiResponse) {
    const result: TodoGetAllResponse = await prisma.todo.findMany()
    res.json(result)
}
