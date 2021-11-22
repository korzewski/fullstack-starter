import Head from 'next/head'
import { Todo } from '@prisma/client'
import prisma from '../services/prisma'
import { todoUpdate } from '../services/api'

export default function Home({ todos }: {todos: Todo[]}) {
  const checkboxHandle = async (id: Todo['id'], checked: Todo['checked']) => {
    const result = await todoUpdate(id, { checked: !checked })
    console.log('--- todoUpdate: ', result)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Fullstack starter</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Fullstack starter
        </h1>

        <ul className="mt-10">
          { todos &&
            todos.map((x, i) => {
              return (
                  <li key={i}>
                    {x.name}{' '}
                    <input
                      type="checkbox"
                      defaultChecked={x.checked}
                      onClick={() => checkboxHandle(x.id, x.checked)}
                    />
                  </li>
                )
            })
          }
        </ul>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const todos = await prisma.todo.findMany()
  return { props: { todos } }
}
