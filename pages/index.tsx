import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import prisma from '@/services/prisma'
import Todos from '@/components/todos'

export default ({ todos }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400'>
      <Head>
        <title>Fullstack starter</title>
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>Fullstack starter</h1>

        <Todos todos={todos} />
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const todos = await prisma.todo.findMany()
  return { props: { todos } }
}
