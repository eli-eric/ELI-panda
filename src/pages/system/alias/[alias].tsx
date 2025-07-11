import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { Button } from '@/components/Buttons'
import EliLogoComponent from '@/components/eli-logo.comp'
import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { PATH } from '@/types/constants/paths'

const messages = message.systemItem
const { common } = message

interface Props {
  key?: string
  alias?: string
}

const SystemAliasRedirectPage: NextPage = ({ alias }: Props) => {
  const intl = useIntl()
  const { push } = useRouter()
  const { status } = useSession()

  const { loading, error, systemDetail } = useSystemDetail({ alias }, data => {
    const uid = data?.systems[0]?.uid
    if (uid) {
      push(PATH.SYSTEM + '/' + uid)
    }
  })

  if (loading) {
    return <LoaderComponent />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      {!systemDetail ? (
        <div className="min-h-full bg-white dark:bg-gray-800 py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <div className="flex shrink-0 justify-center pb-12">
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
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
                    System not found
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    The system by alias was not found. Please check the URL and
                    try again.
                  </p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link
                    href={
                      status === 'authenticated' ? PATH.DASHBOARD : PATH.ROOT
                    }
                  >
                    <Button primary>
                      <FormattedMessage id={common.buttons.home} />
                    </Button>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <LoaderComponent />
      )}
    </Fragment>
  )
}

SystemAliasRedirectPage.getInitialProps = ({ query }) => ({
  key: query.alias,
  alias: query.alias
})

export default SystemAliasRedirectPage
