import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import { useSession, signOut } from 'next-auth/react'
import prisma from '@/services/prisma'
import Page from '@/components/page'
import Todos from '@/components/todos'
import Button from '@/components/button'

const todos = ({ todos }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession()

  console.log('session: ', session)

  return (
    <Page title='Todos'>
      <div>
        <Link href='/'>
          <Button className='mx-2'>Back to homepage</Button>
        </Link>

        <Button className='mx-2' onClick={async () => await signOut({ callbackUrl: '/' })}>
          Sign out
        </Button>
      </div>
      <Todos todos={todos} />
    </Page>
  )
}

todos.auth = true
export default todos

export const getStaticProps = async () => {
  const todos = await prisma.todo.findMany()
  return { props: { todos } }
}
