import axios, { AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

const requestKeys = <const>['get', 'post', 'put', 'delete']
type RequestKeys = typeof requestKeys[number]

export function resError(res: NextApiResponse, error: any, errorCode = 400) {
  console.error(`--- ${error}`)
  res.status(errorCode).json({ error: `${error}` })
}

export function ensureReqMethod(req: NextApiRequest, res: NextApiResponse, reqMethods: RequestKeys[]) {
  if (!reqMethods.includes(req.method?.toLowerCase() as RequestKeys)) {
    const errorMessage = Error(`The HTTP ${req.method} method is not supported at this route.`)
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
    throw Error(`Wrong query param type. Expected '${queryKey}' to be number`)
  }

  return parsedParam
}

export async function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  requests: Partial<{ [k in RequestKeys]: NextApiHandler<void> }>,
) {
  try {
    const handler = requests[req.method?.toLowerCase() as RequestKeys]
    if (!handler) {
      throw Error('requestHandler - handler is undefined')
    }

    await handler(req, res)
  } catch (e) {
    resError(res, e)
  }
}

export async function axiosHandler<T, R = AxiosResponse<T, any>>(callback: () => {}) {
  try {
    const response = (await callback()) as R
    // @ts-ignore
    return response.data as T
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('--- ', err.response?.data?.error)
      return
    }

    console.error(err)
  }
}
