import { Todo } from '.prisma/client'
import { todoAdd, todoGetAll, todoRemove, todoUpdate } from '@/services/api'
import { createState, none, useState } from '@hookstate/core'
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
      let todo = await todoUpdate(id, { checked })
      if (!todo) {
        return
      }

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

    async removeItem(id: string) {
      const todo = await todoRemove(id)
      if (!todo) {
        return
      }

      const index = this.state.listOfItems.findIndex(x => x.id == id)
      if (index !== -1) {
        todosStore.listOfItems[index].set(none)
      }
    },
  }
}
