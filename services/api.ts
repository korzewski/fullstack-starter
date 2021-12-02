import type { Todo, Prisma } from '@prisma/client'
import { TodoGetAllResponse, TodoGetResponse, TodoUpdateParams } from '@/utils/api/types'

export async function todoGetAll() {
  return (await fetch(`/api/todo`)).json() as Promise<TodoGetAllResponse>
}

export async function todoGet(id: Todo['id']) {
  return (await fetch(`/api/todo/${id}`)).json() as Promise<TodoGetResponse>
}

export async function todoUpdate(id: Todo['id'], todoUpdate: TodoUpdateParams) {
  const response = await fetch(`/api/todo/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todoUpdate),
  })
  return response.json() as Promise<Todo>
}

export async function todoAdd(todo: Prisma.TodoCreateManyInput) {
  const response = await fetch(`/api/todo`, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
  return response.json() as Promise<Todo>
}
