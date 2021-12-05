import type { Todo, Prisma, User } from '@prisma/client'
import { Session } from 'next-auth'

export interface ExtendedSession extends Session {
  userId: string
}

interface ApiError {
  error: string,
}

export type TodoGetAllResponse = Todo[] | ApiError
export type TodoUpdateParams = Prisma.TodoUpdateInput
export type TodoUpdateResponse = User | ApiError
export type TodoAddParams = Prisma.TodoCreateManyInput
export type TodoAddResponse = Todo | ApiError
