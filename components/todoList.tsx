import { useTodosStore } from 'store/todosStore'
import Button from '@/components/button'
import { ArchiveIcon } from '@heroicons/react/outline'

const todoList = () => {
  const todosStore = useTodosStore()
  todosStore.useFetchListOfItems()

  return (
    <>
    <ul className='mt-10'>
      {todosStore.state.listOfItems.map(x => {
        return (
          <li key={x.id} className='flex gap-2 my-2'>
            <fieldset
              disabled={todosStore.state.isLoading}
              onClick={() => todosStore.setItemChecked(x.id, !x.checked)}
              className='p-2 rounded-md select-none cursor-pointer bg-gray-400/20 hover:bg-gray-400/30 flex flex-1 justify-between items-center'
            >
              <label htmlFor={`${x.id}`} className='cursor-pointer'>
                {x.name}
              </label>

              <input
                id={`${x.id}`}
                type='checkbox'
                checked={x.checked}
                readOnly={true}
                className='h-4 w-4 cursor-pointer'
              />
            </fieldset>

            <Button
              disabled={todosStore.state.isLoading}
              onClick={async () => await todosStore.removeItem(x.id)}
              className={`px-2 py-1 ${!todosStore.state.isLoading ? ' hover:bg-red-500 hover:text-gray-50' : ''}`}
            >
              <ArchiveIcon className='w-5' />
            </Button>
          </li>
        )
      })}
    </ul>

    {todosStore.state.isLoading &&
      <p>loading...</p>
    }
    </>
  )
}

export default todoList
