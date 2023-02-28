import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Card, { Heading } from '@/components/card/card.comp'
import EmptySectionComponent from '@/components/empty-section/empty-section.comp'
import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import Subsystems from '@/modules/systems/Subsystems'

const RootSystemPage: NextPage = () => (
  <Fragment>
    <Head>
      <title>Systems Overview</title>
    </Head>
    <div className="flex">
      <div className="w-full lg:w-1/4">
        <Card>
          <Heading text="Subsystems" />
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<LoaderComponent />}>
              <Subsystems />
            </Suspense>
          </ErrorBoundary>
        </Card>
      </div>
      <EmptySectionComponent />
    </div>
  </Fragment>
)

export default RootSystemPage
