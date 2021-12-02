import { useState, useEffect } from 'react'
import { todoGetAll, todoUpdate } from '@/services/api'
import { Todo } from '@prisma/client'

const todos = () => {
  const [todos, setTodos] = useState<Todo[]>()
  const [lastUpdate, setLastUpdate] = useState<Todo>()

  useEffect(() => {
    const fetchData = async () => {
      const todos = await todoGetAll()
      setTodos(todos)
    }

    fetchData().catch(console.error)
  }, [lastUpdate])

  const checkboxHandle = async (id: Todo['id'], checked: Todo['checked']) => {
    const todo = await todoUpdate(id, { checked: !checked })
    setLastUpdate(todo)
  }

  return (
    <ul className='mt-10'>
      {todos &&
        todos.map((x, i) => {
          return (
            <li key={x.id}>
              <fieldset className='flex justify-between items-center gap-x-10 my-1'>
                <label
                htmlFor={`${x.id}`}
                className="select-none cursor-pointer"
                >{x.name}</label>
                <input
                  id={`${x.id}`}
                  type='checkbox'
                  defaultChecked={x.checked}
                  onClick={() => checkboxHandle(x.id, x.checked)}
                  className='h-4 w-4'
                />
              </fieldset>
            </li>
          )
        })}
    </ul>
  )
}

export default todos
