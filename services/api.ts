import axios from 'axios'
import type { Todo, Prisma } from '@prisma/client'
import { TodoAddResponse, TodoGetAllResponse, TodoUpdateParams, TodoUpdateResponse } from '@/utils/api/types'

function handleCatch<T>(err: any, returnValue: T) {
  if (axios.isAxiosError(err)) {
    console.error('--- ', err.response?.data?.error)
    return returnValue
  }

  console.error(err)
}

export async function todoGetAll() {
  try {
    const response = await axios.get<TodoGetAllResponse>('/api/todo')
    return response.data
  } catch (err) {
    return handleCatch(err, [])
  }
}

export async function todoUpdate(id: Todo['id'], todoUpdate: TodoUpdateParams) {
  try {
    const response = await axios.put<TodoUpdateResponse>(`/api/todo/${id}`, todoUpdate)
    return response.data
  } catch (err) {
    return handleCatch(err, undefined)
  }
}

export async function todoAdd(todo: Prisma.TodoCreateManyInput) {
  try {
    const response = await axios.post<TodoAddResponse>('/api/todo', todo)
    return response.data
  } catch (err) {
    return handleCatch(err, undefined)
  }
}
