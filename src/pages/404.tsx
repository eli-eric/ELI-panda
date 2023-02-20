import { NextPage } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import EliLogoComponent from 'src/components/ui/eli-logo.comp'
import { PATH } from '@/types/constants/paths'

const Custom404Page: NextPage = (): JSX.Element => {
  const { status } = useSession()
  return (
    <Fragment>
      <div className="min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <div className="flex flex-shrink-0 justify-center pb-12">
            <div className="inline-flex">
              <span className="sr-only">Your Company</span>
              <EliLogoComponent customClass="h-18 w-auto" />
            </div>
          </div>
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href={status === 'authenticated' ? PATH.DASHBOARD : PATH.ROOT}
                  className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  )
}

export default Custom404Page
