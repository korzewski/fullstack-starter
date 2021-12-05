import React, { useState } from 'react'
import Button from '@/components/button'
import { useSession } from 'next-auth/react'
import type { ExtendedSession } from '@/utils/api/types'
import { useTodosStore } from 'store/todosStore'

const todoAddNew = () => {
  const sessionData = useSession()
  const session = sessionData.data as ExtendedSession
  const todosStore = useTodosStore()
  const [name, setName] = useState('')

  const submit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (name) {
      setName('')
      await todosStore.addNewItem(name, session.userId)
    }
  }

  return (
    <form className='flex gap-2 mt-10'>
      <input value={name} onChange={e => setName(e.target.value)} type='text' autoFocus={true} className='rounded-md' />
      <Button onClick={submit}>Create new</Button>
    </form>
  )
}

export default todoAddNew
