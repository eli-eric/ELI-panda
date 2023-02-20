import { CheckIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Head from 'next/head'
import { Suspense, useState } from 'react'
import EmptySectionComponent from 'src/modules/systems/empty-section/empty-section.comp'
import useSWR from 'swr/immutable'

import Card from '@/components/systems/Card'
import Subsystems from '@/components/systems/Subsystems'
import Title from '@/components/systems/Title'
import Button from '@/components/ui/Buttons'
import { Heading } from '@/components/ui/card/card.comp'
import ProgressBarComponent from '@/components/ui/progress-bar.comp'
import useEditMode from '@/hooks/systems/useEditMode'
import { System } from '@/types/system'

import { fetchFakeSystem } from '../[slug]'

const onSubmit = (data: System) => {
  console.log(data)
}

const Page: NextPage = () => {
  const uid = 'overview'

  const empty: System = {
    uid: '',
    name: '',
    children: [],
    path: [],
    description: '',
    systemCode: '',
    systemAlias: '',
    locationCode: '',
    catalogueUID: '',
    importanceCode: '',
    systemTypeUID: '',
    ownerUID: '',
  }

  const { data: parentData } = useSWR(uid, fetchFakeSystem)

  const [data, setData] = useState<System>(empty)

  const { newImage, setNewImage, FormErrors, EditModeContainer, register } =
    useEditMode(onSubmit, data)

  const isEditMode = false
  const setIsEditMode = () => {}

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <EditModeContainer>
        <div className="p-2 lg:p-4 flex flex-wrap">
          <div className="lg:px-3 flex flex-wrap w-full justify-between gap-4">
            <Title data={data} isEditMode={isEditMode} register={register} />
            <div className="isolate inline-flex rounded-md shadow-sm">
              <Button type="submit">
                <CheckIcon className="h-5" />
              </Button>
            </div>
          </div>

          <aside className="w-full lg:w-1/4">
            <Card>
              <Heading text="Subsystems" />
              <Suspense fallback={<ProgressBarComponent />}>
                <nav aria-label="Subsystems">
                  <Subsystems ids={data.children} />
                </nav>
              </Suspense>
            </Card>
          </aside>

          <main className={`p-1 lg:p-2 w-full lg:w-3/4`}>
            <EmptySectionComponent />
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
