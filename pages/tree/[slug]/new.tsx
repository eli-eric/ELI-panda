import Breadcrumbs from 'components/systems/Breadcrumbs'
import Card from 'components/systems/Card'
import Description from 'components/systems/Description'
import Preview from 'components/systems/Preview'
import Subsystems from 'components/systems/Subsystems'
import Title from 'components/systems/Title'
import useEditMode from 'hooks/systems/useEditMode'
import SystemDetailSectionComponent from 'modules/systems/details/system-detail/system-detail-section.comp'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr/immutable'
import { System, SystemUidName } from 'types/system'

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
    eun: '',
    itemUsageCategoryCode: '',
    estimatedLifeTime: 0
  }

  const { data: parentData } = useSWR(uid, fetchFakeSystem)

  const [data, setData] = useState<System>(empty)

  useEffect(() => {
    const path: SystemUidName[] = parentData ? [...parentData.path, [parentData.uid, parentData.name]] : []
    path && setData(obj => ({ ...obj, path: path }))
  }, [parentData, setData])

  const { isEditMode, setIsEditMode, newImage, setNewImage, FormErrors, EditModeContainer, register, discard } =
    useEditMode(onSubmit, data)

  if (!data) return <>Loading</>
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <EditModeContainer>
        <div className="p-2 lg:p-4 flex flex-wrap">
          <nav className="p-1 lg:p2 w-full">
            <Breadcrumbs data={data} />
          </nav>

          <div className="w-full">
            <FormErrors />
          </div>

          <div className="flex w-full justify-between">
            <Title
              data={data}
              discard={discard}
              setIsEditMode={setIsEditMode}
              isEditMode={isEditMode}
              register={register}
            />
          </div>

          <aside className="p-1 lg:p-2 w-full lg:w-1/4">
            <nav>
              <div className="hidden lg:block">
                <b>Subsystems</b>
                <Subsystems data={data} />
              </div>
              <details className="lg:hidden max-h-[50vh] overflow-auto">
                <summary>
                  <b>Subsystems</b>
                </summary>
                <Subsystems data={data} />
              </details>
            </nav>
          </aside>

          <main className="p-1 lg:p-2 lg:w-3/4">
            <article>
              <div className="flex flex-wrap gap-2 lg:gap-4">
                <section className="grow lg:grow-0 shrink-0">
                  <b>Preview</b>
                  <Preview data={data} isEditMode={isEditMode} newImage={newImage} setNewImage={setNewImage} />
                </section>

                <section className="grow">
                  <b>Details</b>
                  <Card>
                    <SystemDetailSectionComponent systemInfo={data} />
                  </Card>
                </section>

                <section className="basis-full">
                  <b>Description</b>
                  <Description data={data} isEditMode={isEditMode} register={register} />
                </section>
              </div>
            </article>
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default Page
