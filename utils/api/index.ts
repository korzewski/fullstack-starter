import type { NextApiResponse } from 'next'

export function errorResponse(res: NextApiResponse, error: string) {
    res.status(400).json({ error })
}
