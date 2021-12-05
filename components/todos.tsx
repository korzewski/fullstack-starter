import TodoList from './todoList'
import TodoAddNew from '@/components/todoAddNew'

const todos = () => {
  return (
    <div>
      <TodoAddNew />
      <TodoList />
    </div>
  )
}

export default todos
