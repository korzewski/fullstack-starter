import { todoUpdate } from '@/services/api'
import { Todo } from '@prisma/client'
import React, { FunctionComponent } from 'react'

type Props = {
  todos: Todo[]
  setLastUpdate: (todo: Todo) => any
}

const todoList: FunctionComponent<Props> = ({ todos, setLastUpdate }) => {
  const checkboxHandle = async (id: Todo['id'], checked: Todo['checked']) => {
    const todo = await todoUpdate(id, { checked: !checked })
    setLastUpdate(todo)
  }

  return (
    <ul className='mt-10'>
      {todos &&
        todos.map(x => {
          return (
            <li key={x.id}>
              <fieldset className='flex justify-between items-center gap-x-10 my-1'>
                <label htmlFor={`${x.id}`} className='select-none cursor-pointer'>
                  {x.name}
                </label>
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

export default todoList
