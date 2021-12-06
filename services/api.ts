import axios from 'axios'
import type { Todo, Prisma } from '@prisma/client'
import { TodoAddResponse, TodoGetAllResponse, TodoUpdateParams, TodoUpdateResponse } from '@/utils/api/types'
import { axiosHandler } from '@/utils/api'

export function todoGetAll() {
  return axiosHandler<TodoGetAllResponse>(() => axios.get('/api/todo'))
}

export function todoUpdate(id: Todo['id'], todoUpdate: TodoUpdateParams) {
  return axiosHandler<TodoUpdateResponse>(() => axios.put(`/api/todo/${id}`, todoUpdate))
}

export function todoAdd(todo: Prisma.TodoCreateManyInput) {
  return axiosHandler<TodoAddResponse>(() => axios.post(`/api/todo/`, todo))
}

export async function todoRemove(id: Todo['id']) {
  return axiosHandler<Todo>(() => axios.delete(`/api/todo/${id}`))
}
