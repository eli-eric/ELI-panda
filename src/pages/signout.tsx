import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useEffect } from 'react'

import LoaderComponent from '@/components/shared/loader.comp'

const SignOut: NextPage = (): JSX.Element => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
    if (status === 'authenticated') signOut({ redirect: false })
  }, [status, router])

  return (
    <Fragment>
      <Head>
        <meta name="description" content="...." />
      </Head>
      <LoaderComponent />
    </Fragment>
  )
}

export default SignOut
