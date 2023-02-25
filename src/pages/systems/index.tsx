import { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'
import Card from 'src/components/ui/card/card.comp'
import EmptySectionComponent from 'src/modules/systems/empty-section/empty-section.comp'

import Subsystems from '@/components/systems/Subsystems'
import { Heading } from '@/components/ui/card/card.comp'
import ProgressBarComponent from '@/components/ui/progress-bar.comp'

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
