import Head from 'next/head'

export default ({ title, children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="font-bold text-6xl">{title}</h1>
        
        <div className="content mt-10">
            {children}
        </div>
      </main>
    </div>
  )
}
