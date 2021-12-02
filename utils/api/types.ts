import type { Todo, Prisma } from '@prisma/client'
import { Session } from 'next-auth'

export interface ExtendedSession extends Session {
  userId: string
}

export type TodoGetResponse = Todo
export type TodoGetAllResponse = Todo[]
export type TodoUpdateParams = Prisma.TodoUpdateInput
export type TodoUpdateResponse = Todo
export type TodoAddParams = Prisma.TodoCreateManyInput
