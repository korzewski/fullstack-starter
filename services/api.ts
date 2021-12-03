import type { Todo, Prisma } from '@prisma/client'
import { TodoGetAllResponse, TodoGetResponse, TodoUpdateParams } from '@/utils/api/types'

export async function todoGetAll() {
  const result = (await (await fetch(`/api/todo`)).json()) as TodoGetAllResponse

  if (Array.isArray(result)) {
    return result
  } else if (result.error) {
    console.error(result.error)
    return []
  }
}

export async function todoGet(id: Todo['id']) {
  // TODO: Handle error
  return (await fetch(`/api/todo/${id}`)).json() as Promise<TodoGetResponse>
}

export async function todoUpdate(id: Todo['id'], todoUpdate: TodoUpdateParams) {
  // TODO: Handle error
  const response = await fetch(`/api/todo/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todoUpdate),
  })
  return response.json() as Promise<Todo>
}

export async function todoAdd(todo: Prisma.TodoCreateManyInput) {
  // TODO: Handle error
  const response = await fetch(`/api/todo`, {
    method: 'POST',
    body: JSON.stringify(todo),
  })
  return response.json() as Promise<Todo>
}
