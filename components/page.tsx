import Head from 'next/head'

export default ({ title, children }) => {
  return (
    <div className='min-h-screen py-20 flex flex-col items-center bg-gray-400'>
      <Head>
        <title>{title}</title>
      </Head>

      <main className='w-full max-w-md p-10 gap-5 flex flex-col items-center justify-center text-center shadow-md bg-gray-300 rounded-xl'>
        <h1 className='text-6xl font-bold'>{title}</h1>

        <div>{children}</div>
      </main>
    </div>
  )
}
