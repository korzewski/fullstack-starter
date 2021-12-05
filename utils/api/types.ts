import type { Todo, Prisma, User } from '@prisma/client'
import { Session } from 'next-auth'

export interface ExtendedSession extends Session {
  userId: string
}

export type TodoGetAllResponse = Todo[]
export type TodoUpdateParams = Prisma.TodoUpdateInput
export type TodoUpdateResponse = Todo
export type TodoAddParams = Prisma.TodoCreateManyInput
export type TodoAddResponse = Todo
