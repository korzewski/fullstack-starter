import type { Todo, Prisma } from '@prisma/client'
import { TodoAddResponse, TodoGetAllResponse, TodoUpdateParams, TodoUpdateResponse } from '@/utils/api/types'

export async function todoGetAll() {
  const result = (await (await fetch(`/api/todo`)).json()) as TodoGetAllResponse

  if (Array.isArray(result)) {
    return result
  } else if (result.error) {
    console.error(result.error)
    return []
  }
}

export async function todoUpdate(id: Todo['id'], todoUpdate: TodoUpdateParams) {
  const response = (await (
    await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todoUpdate),
    })
  ).json()) as TodoUpdateResponse

  // @ts-ignore
  if (response.error) {
    // @ts-ignore
    console.error(response.error)
    return
  }

  return response
}

export async function todoAdd(todo: Prisma.TodoCreateManyInput) {
  const response = (await (
    await fetch(`/api/todo`, {
      method: 'POST',
      body: JSON.stringify(todo),
    })
  ).json()) as TodoAddResponse

  // @ts-ignore
  if (response.error) {
    // @ts-ignore
    console.error(response.error)
    return
  }

  return response as Todo
}
