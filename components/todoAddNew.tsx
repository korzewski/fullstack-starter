import React, { useState } from 'react'
import Button from '@/components/button'
import { todoAdd } from '@/services/api'
import { useSession } from 'next-auth/react'
import type { ExtendedSession } from '@/utils/api/types'
import { Prisma } from '@prisma/client'

const todoAddNew = () => {
  const sessionData = useSession()
  const session = sessionData.data as ExtendedSession
  const [task, setTask] = useState('')

  const submit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (task) {
      setTask('')
      const newTodo: Prisma.TodoCreateManyInput = {
        name: task,
        userId: session.userId,
      }

      await todoAdd(newTodo)
    }
  }

  return (
    <form className='flex gap-2 mt-10'>
      <input value={task} onChange={e => setTask(e.target.value)} type='text' autoFocus={true} className='rounded-md' />
      <Button onClick={submit}>Create new</Button>
    </form>
  )
}

export default todoAddNew
