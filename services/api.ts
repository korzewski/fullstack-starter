import type { Todo } from '@prisma/client'
import { TodoGetAllResponse, TodoGetResponse, TodoUpdateParams } from '../pages/api/todo/index.d'

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
  return response
}
