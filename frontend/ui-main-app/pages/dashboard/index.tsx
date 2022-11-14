import Image from 'next/image'
import Dashboard from '../../components/layout/dashboard'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect } from 'react'

const DashboardPage: NextPage = (): JSX.Element => {
  const { status, data } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/')
  }, [status])

  if (status === 'authenticated') {
    return <Dashboard />
  }

  return <div>loading</div>
}

export default DashboardPage
