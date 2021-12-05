import { useTodosStore } from 'store/todosStore'

const todoList = () => {
  const todosStore = useTodosStore()
  todosStore.useFetchListOfItems()

  return (
    <ul className='mt-10'>
      { todosStore.state.listOfItems.map(x => {
          return (
            <li key={x.id}>
              <fieldset className='flex justify-between items-center gap-x-10 my-1'>
                <label htmlFor={`${x.id}`} className='select-none cursor-pointer'>
                  {x.name}
                </label>
                <input
                  id={`${x.id}`}
                  type='checkbox'
                  checked={x.checked}
                  onChange={() => todosStore.setItemChecked(x.id, !x.checked)}
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
