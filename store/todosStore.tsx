import { Todo } from '.prisma/client'
import { todoAdd, todoGetAll, todoRemove, todoUpdate } from '@/services/api'
import { createState, none, useState } from '@hookstate/core'
import { Prisma } from '@prisma/client'
import { useEffect } from 'react'

const initialState = {
  listOfItems: [] as Todo[],
  isLoading: false,
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
          todosStore.isLoading.set(true)

          const todos = await todoGetAll()
          if (todos) {
            state.listOfItems.set(todos)
          }

          todosStore.isLoading.set(false)
        }

        fetchData().catch(console.error)
      }, [])
    },

    async setItemChecked(id: Todo['id'], checked: Todo['checked']) {
      todosStore.isLoading.set(true)

      let todo = await todoUpdate(id, { checked })
      if (!todo) {
        return
      }

      const index = this.state.listOfItems.findIndex(x => x.id == id)
      if (index !== -1) {
        todosStore.listOfItems[index].merge(x => ({ checked }))
      }

      todosStore.isLoading.set(false)
    },

    async addNewItem(name: string, userId: string) {
      todosStore.isLoading.set(true)

      const newTodo: Prisma.TodoCreateManyInput = {
        name,
        userId,
      }
      const todo = await todoAdd(newTodo)
      if (todo) {
        todosStore.listOfItems.merge([todo])
      }

      todosStore.isLoading.set(false)
    },

    async removeItem(id: string) {
      todosStore.isLoading.set(true)

      const todo = await todoRemove(id)
      if (!todo) {
        return
      }

      const index = this.state.listOfItems.findIndex(x => x.id == id)
      if (index !== -1) {
        todosStore.listOfItems[index].set(none)
      }

      todosStore.isLoading.set(false)
    },
  }
}
