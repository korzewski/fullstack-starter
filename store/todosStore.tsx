import { Todo } from '.prisma/client'
import { todoAdd, todoGetAll, todoUpdate } from '@/services/api'
import { createState, useState } from '@hookstate/core'
import { Prisma } from '@prisma/client'
import { useEffect } from 'react'

const initialState = {
  listOfItems: [] as Todo[],
}
const todosStore = createState(initialState)

export function useTodosStore() {
  const state = useState(todosStore)

  return {
    get state() {
      return state.get()
    },

    async useFetchListOfItems() {
      useEffect(() => {
        const fetchData = async () => {
          const todos = await todoGetAll()
          if (todos) {
            state.listOfItems.set(todos)
          }
        }

        fetchData().catch(console.error)
      }, [])
    },

    async setItemChecked(id: Todo['id'], checked: Todo['checked']) {
      await todoUpdate(id, { checked })

      const index = this.state.listOfItems.findIndex(x => x.id == id)
      if (index !== -1) {
        todosStore.listOfItems[index].merge(x => ({ checked }))
      }
    },

    async addNewItem(name: string, userId: string) {
      const newTodo: Prisma.TodoCreateManyInput = {
        name,
        userId,
      }

      const todo = await todoAdd(newTodo)
      if (todo) {
        todosStore.listOfItems.merge([todo])
      }
    },
  }
}
