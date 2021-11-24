import { FunctionComponent } from 'react'
import { todoUpdate } from '@/services/api'
import { Todo } from '@prisma/client'

type Props = {
  todos: Todo[]
}

const todos: FunctionComponent<Props> = ({ todos }) => {
  const checkboxHandle = async (id: Todo['id'], checked: Todo['checked']) => {
    const result = await todoUpdate(id, { checked: !checked })
    console.log('--- todoUpdate: ', result)
  }

  return (
    <ul className='mt-10'>
      {todos &&
        todos.map((x, i) => {
          return (
            <li key={i}>
              {x.name}{' '}
              <input type='checkbox' defaultChecked={x.checked} onClick={() => checkboxHandle(x.id, x.checked)} />
            </li>
          )
        })}
    </ul>
  )
}

export default todos
