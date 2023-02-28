import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Card, { Heading } from '@/components/card/card.comp'
import EmptySectionComponent from '@/components/empty-section/empty-section.comp'
import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import useParam from '@/hooks/useParam'
import Breadcrumbs from '@/modules/systems/Breadcrumbs'
import { Prompt, Results } from '@/modules/systems/Search'
import Subsystems from '@/modules/systems/Subsystems'

const RootSystemPage: NextPage = () => {
  const [query, setQuery] = useParam('q')

  return (
    <Fragment>
      <Head>
        <title>Systems Overview</title>
      </Head>
      <div className="flex-col">
        <div className="flex flex-wrap w-full">
          <div className="w-full sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <Prompt query={query as string} setQuery={setQuery} />
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={<ProgressBarComponent />}>
          <Breadcrumbs />
        </Suspense>
        {query && (
          <div className="w-full">
            <Results query={query} />
          </div>
        )}
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <Card>
              <Heading text="Subsystems" />
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<LoaderComponent />}>
                  <Subsystems />
                </Suspense>
              </ErrorBoundary>
            </Card>
          </div>
          <div className="col-span-3">
            <Card>
              <Heading text="No system selected" />
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<LoaderComponent />}>
                  <EmptySectionComponent />
                </Suspense>
              </ErrorBoundary>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default RootSystemPage
