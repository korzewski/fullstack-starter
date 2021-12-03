import type { Todo, Prisma } from '@prisma/client'
import { Session } from 'next-auth'

export interface ExtendedSession extends Session {
  userId: string
}

interface ApiError {
  error: string,
}

export type TodoGetResponse = Todo | null
export type TodoGetAllResponse = Todo[] | ApiError
export type TodoUpdateParams = Prisma.TodoUpdateInput
export type TodoUpdateResponse = Todo
export type TodoAddParams = Prisma.TodoCreateManyInput
