import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Page from '@/components/page'
import Todos from '@/components/todos'
import Button from '@/components/button'

const todos = () => {
  const { data: session } = useSession()

  console.log('session: ', session)

  return (
    <Page title='Todos'>
      <div>
        <Link href='/'>
          <Button className='mx-2'>Back to homepage</Button>
        </Link>
      </div>

      <Todos />
    </Page>
  )
}

todos.auth = true
export default todos

