import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

const requestKeys = <const>['get', 'post', 'put', 'delete']
type RequestKeys = typeof requestKeys[number]

export function resError(res: NextApiResponse, error: Error, errorCode = 400) {
  res.status(errorCode).json({ error: `${error}` })
}

export function ensureReqMethod(req: NextApiRequest, res: NextApiResponse, reqMethods: RequestKeys[]) {
  if (!reqMethods.includes(req.method.toLowerCase() as RequestKeys)) {
    const errorMessage = new Error(`The HTTP ${req.method} method is not supported at this route.`)
    resError(res, errorMessage)
  }
}

export function getQueryParam(req: NextApiRequest, queryKey: string) {
  let param = req.query[queryKey]

  if (!param) {
    throw Error(`Missing query param ${queryKey}`)
  }

  if (typeof param === 'object') {
    return param[0]
  }

  return param
}

export function getQueryParamNumber(req: NextApiRequest, queryKey: string) {
  let param = req.query[queryKey]
  const parsedParam = Number(param)

  if (isNaN(Number(parsedParam))) {
    throw new Error(`Wrong query param type. Expected '${queryKey}' to be number`)
  }

  return parsedParam
}

export async function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  requests: Partial<{ [k in RequestKeys]: NextApiHandler<void> }>,
) {
  try {
    const handler = requests[req.method.toLowerCase() as RequestKeys]
    await handler(req, res)
  } catch (e) {
    resError(res, e)
  }
}
