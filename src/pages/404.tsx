import type { NextPage } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import EliLogoComponent from '@/components/eli-logo.comp'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

const { common } = message

const Custom404Page: NextPage = (): JSX.Element => {
  const { status } = useSession()
  return (
    <Fragment>
      <div className="min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <div className="flex flex-shrink-0 justify-center pb-12">
            <div className="inline-flex">
              <EliLogoComponent customClass="h-18 w-auto" />
            </div>
          </div>
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl">
              <FormattedMessage id={common.custom404.title} />
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  <FormattedMessage id={common.custom404.notFound} />
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  <FormattedMessage id={common.custom404.message} />
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href={status === 'authenticated' ? PATH.DASHBOARD : PATH.ROOT}>
                  <Button primary>
                    <FormattedMessage id={common.buttons.home} />
                  </Button>
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
