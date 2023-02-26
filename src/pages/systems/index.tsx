import { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'

import Subsystems from '@/components/systems/Subsystems'
import Card, { Heading } from '@/components/shared/card/card.comp'
import ProgressBarComponent from '@/components/shared/progress-bar.comp'
import EmptySectionComponent from '@/components/shared/empty-section/empty-section.comp'

const Page: NextPage = () => (
  <>
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
  </>
)

export default Page
