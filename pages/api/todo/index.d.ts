import type { Todo, Prisma } from '@prisma/client'

export type TodoGetResponse = Todo
export type TodoGetAllResponse = Todo[]
export type TodoUpdateParams = Prisma.TodoUpdateInput
export type TodoUpdateResponse = Todo
