import { useState, useEffect } from 'react'
import { todoGetAll } from '@/services/api'
import { Todo } from '@prisma/client'
import TodoList from './todoList'
import TodoAddNew from '@/components/todoAddNew'

const todos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [lastUpdate, setLastUpdate] = useState<Todo>()

  useEffect(() => {
    const fetchData = async () => {
      const todos = await todoGetAll()
      if (todos) {
        setTodos(todos)
      }
    }

    fetchData().catch(console.error)
  }, [lastUpdate])

  return (
    <div>
      <TodoAddNew />
      <TodoList todos={todos || []} setLastUpdate={setLastUpdate} />
    </div>
  )
}

export default todos
