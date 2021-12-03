import 'tailwindcss/tailwind.css'
import { useEffect, ReactElement } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import UserInfo from '@/components/userInfo'
import { AppProps } from 'next/app'

export default ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      {/* @ts-ignore */}
      {Component.auth ? (
        <Auth>
          <>
            <UserInfo />
            <Component {...pageProps} />
          </>
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

type AuthProps = {
  children: ReactElement
}

const Auth = ({ children }: AuthProps) => {
  const { data: session, status } = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (status === 'loading') return undefined
    if (!isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }

  return <div>Loading...</div>
}
