import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

const requestKeys = <const>['get', 'post', 'put', 'delete']
type RequestKeys = typeof requestKeys[number]

export function resError(res: NextApiResponse, error: Error, errorCode = 400) {
  res.status(errorCode).json({ error: `${error}` })
}

export function ensureReqMethod(req: NextApiRequest, res: NextApiResponse, reqMethods: RequestKeys[]) {
  return new Promise<void>(resolve => {
    if (!reqMethods.includes(req.method.toLowerCase() as RequestKeys)) {
      const errorMessage = new Error(`The HTTP ${req.method} method is not supported at this route.`)
      resError(res, errorMessage)
    }

    resolve()
  })
}

export function getQueryParam(req: NextApiRequest, res: NextApiResponse, param: string): Promise<string> {
  return new Promise(resolve => {
    const p = req.query[param]
    if (typeof p !== 'string') {
      return resError(res, new Error(`Wrong query params`))
    }

    resolve(p)
  })
}

export async function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  requests: Partial<{ [k in RequestKeys]: NextApiHandler<void> }>
) {
  return new Promise<void>(async resolve => {
    try {
      const handler = requests[req.method.toLowerCase() as RequestKeys]
      await handler(req, res)

      resolve()
    } catch (e) {
      resError(res, e)
    }
  })
}
