import { signOut, useSession } from 'next-auth/react'
import Button from '@/components/button'

const userInfo = () => {
  const { data: session } = useSession()
  const { email, image } = session.user

  return (
    <div className='bg-gray-400 p-3'>
      <div className='max-w-md mx-auto shadow-md bg-gray-300 rounded-xl p-3 gap-5 flex flex-wrap justify-center sm:justify-between content-center'>
        <div className='flex gap-5'>
          <img src={image} alt='' className='w-16 h-16 rounded-full' />

          <div className='flex flex-col justify-center'>
            <div>Signed in as</div>
            <div>{email}</div>
          </div>
        </div>

        <div className='flex flex-col justify-center'>
          <Button className='' onClick={async () => await signOut({ callbackUrl: '/' })}>
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default userInfo
