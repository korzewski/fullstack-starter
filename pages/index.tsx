import Link from 'next/link'
import Page from '@/components/page'
import Button from '@/components/button'

export default () => {
  return (
    <Page title="Fullstack starter">
      <p className='mt-5'>
        <Link href='/todos'>
          <Button>Open todos</Button>
        </Link>
      </p>
    </Page>
  )
}
