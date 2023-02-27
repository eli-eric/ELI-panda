import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'

import Card, { Heading } from '@/components/card/card.comp'
import EmptySectionComponent from '@/components/empty-section/empty-section.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import Subsystems from '@/modules/systems/Subsystems'

const Page: NextPage = () => (
  <Fragment>
    <Head>
      <title>Systems Overview</title>
    </Head>
    <div className="flex">
      <aside className="w-full lg:w-1/4">
        <Card>
          <Heading text="Subsystems" />
          <Suspense fallback={<ProgressBarComponent />}>
            <nav aria-label="Subsystems">
              <Subsystems ids={['fjdskfsdl']} />
            </nav>
          </Suspense>
        </Card>
      </aside>
      <main className={`p-1 lg:p-2 w-full lg:w-3/4`}>
        <EmptySectionComponent />
      </main>
    </div>
  </Fragment>
)

export default Page
