import { CheckIcon } from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense, useState } from 'react'
import useSWR from 'swr/immutable'

import Breadcrumbs from '@/components/systems/Breadcrumbs'
import Card from '@/components/systems/Card'
import Description from '@/components/systems/Description'
import SystemDetail from '@/components/systems/Detail'
import Preview from '@/components/systems/Preview'
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
  const router = useRouter()
  const uid = router.query.slug

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

  const isEditMode = true
  const setIsEditMode = () => {}

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <EditModeContainer>
        <div className="p-2 lg:p-4 flex flex-wrap">
          <nav className="p-1 lg:p2 w-full">
            <Suspense
              fallback={
                <div className="py-3">
                  <ProgressBarComponent />
                </div>
              }
            >
              <Breadcrumbs
                path={[...(parentData?.path ?? []), uid as string]}
              />
            </Suspense>
          </nav>

          <div className="w-full">
            <FormErrors />
          </div>

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
            <article>
              <Card>
                <Heading text="Detail" />
                <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4">
                  <section>
                    <Preview
                      image={data.image}
                      alt={data.name}
                      isEditMode={isEditMode}
                      newImage={newImage}
                      setNewImage={setNewImage}
                    />
                  </section>

                  <section>
                    <SystemDetail
                      register={register}
                      isEditMode={isEditMode}
                      data={data}
                    />
                    <div className="text-sm font-medium text-gray-400">
                      Description
                    </div>
                    <Description
                      data={data}
                      isEditMode={isEditMode}
                      register={register}
                    />
                  </section>
                </div>
              </Card>
            </article>
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
