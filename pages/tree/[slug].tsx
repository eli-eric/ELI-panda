import { faker } from '@faker-js/faker'
import SystemDetailSectionComponent from 'modules/systems/details/system-detail/system-detail-section.comp'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

type System = {
  uid: string
  name: string
  children: System[]
  path: SystemUidName[]
  description: string
  image?: string
  importanceCode?: string
  zoneCode?: string
  subZoneCode?: string
  systemCode: string
  systemAlias: string
  locationCode: string
  ownerUID?: string
  catalogueUID: string
  eun: string
  serialNumber?: string
  batchNumber?: string
  itemUsageCategoryCode: string
  estimatedLifeTime: number
}

type SystemProps = { data: System }
type SystemEditableProps = { data: System; editMode: any }

type SystemUidName = [System['uid'], System['name']]

let getFakeName = () => faker.company.catchPhrase()

let getFakePath = (): System['path'] => {
  let length = faker.datatype.number({ min: 0, max: 10 })
  return [...Array(length)].map(() => [faker.datatype.uuid(), getFakeName()])
}

let getFakeSystem = (path: System['path'] = getFakePath(), hasChildren: boolean = true): System => {
  let uid = faker.datatype.uuid()
  let name = getFakeName()
  let childPath: SystemUidName[] = [...path, [uid, name]]
  return {
    uid,
    name,
    path,
    image: 'https://source.unsplash.com/collection/71371194/500x500',
    description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(5)}`,
    children: hasChildren
      ? [...Array(faker.datatype.number({ max: 30 }))].map(() => getFakeSystem(childPath, false))
      : [],
    importanceCode: faker.datatype.string(),
    zoneCode: faker.datatype.string(),
    subZoneCode: faker.datatype.string(),
    systemCode: faker.datatype.string(),
    systemAlias: faker.datatype.string(),
    locationCode: faker.datatype.string(),
    ownerUID: faker.datatype.string(),
    catalogueUID: faker.datatype.uuid(),
    eun: faker.datatype.string(),
    serialNumber: faker.datatype.uuid(),
    batchNumber: faker.datatype.uuid(),
    itemUsageCategoryCode: faker.datatype.string(),
    estimatedLifeTime: faker.datatype.number()
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let fetchData = async () => {
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return getFakeSystem()
}

let Card = ({ children }) => <div className={`mb-2 lg:mb-4 py-1 lg:py-2`}>{children}</div>

let SubsystemsList = ({ data }) => (
  <Card>
    <ul>
      {data.children.length === 0 ? (
        <li>This node does not contain any subsystems.</li>
      ) : (
        data.children.map(({ uid, name }) => (
          <li key={uid}>
            <Link className="hover:text-orange-700" href={`/tree/${uid}`}>
              {name}
            </Link>
          </li>
        ))
      )}
    </ul>
  </Card>
)

let Preview = ({ data }: SystemProps) => {
  let { image, name } = data
  return (
    <>
      <b>Preview</b>
      <Card>
        <img width="500px" src={image} alt={name} />
      </Card>
    </>
  )
}

let Description = ({ data, editMode }: SystemEditableProps) => {
  let { description } = data
  const { isEditMode, register } = editMode
  return (
    <>
      <b>Description</b>
      <Card>
        {isEditMode ? <textarea rows="8" className="w-full" {...register('description')} /> : <p>{description}</p>}
      </Card>
    </>
  )
}

let Breadcrumbs = ({ data }: SystemProps) => {
  let { path } = data
  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        Systems /
        {path.map(([uid, name]) => (
          <Link key={uid} className="whitespace-nowrap hover:text-orange-700" href={`/tree/${uid}`}>
            {name} /
          </Link>
        ))}
      </div>
    </div>
  )
}

let Subsystems = ({ data }: SystemProps) => {
  // Use <details> element on mobile
  return (
    <div>
      <div className="hidden lg:block">
        <b>Subsystems</b>
        <SubsystemsList data={data} />
      </div>
      <details className="lg:hidden max-h-[50vh] overflow-auto">
        <summary>
          <b>Subsystems</b>
        </summary>
        <SubsystemsList data={data} />
      </details>
    </div>
  )
}

let System = ({ data, editMode }: SystemEditableProps) => {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-4">
      <section className="grow lg:grow-0 shrink-0">
        <Preview data={data} />
      </section>
      <section className="grow">
        <b>Details</b>
        <Card>
          <SystemDetailSectionComponent systemInfo={data} />
        </Card>
      </section>
      <section className="basis-full">
        <Description data={data} editMode={editMode} />
      </section>
    </div>
  )
}

const useEditMode = (onSubmit: any, data: System | undefined) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: data })
  const [isEditMode, setIsEditMode] = useState(false)

  const EditModeContainer = ({ children }) => {
    return isEditMode ? (
      <form
        onSubmit={(...args) => {
          handleSubmit(onSubmit)(...args)
          setIsEditMode(false)
        }}
      >
        {children}
      </form>
    ) : (
      <>{children}</>
    )
  }
  const EditModeControls = () => {
    const Quit = () => (
      <button
        onClick={() => {
          reset()
          setIsEditMode(false)
        }}
      >
        Discard
      </button>
    )
    const Edit = () => <button onClick={() => setIsEditMode(true)}>Edit</button>
    const Save = () => <input type="submit" value="Save" />
    return isEditMode ? (
      <div className="flex">
        <Save />
        <Quit />
      </div>
    ) : (
      <Edit />
    )
  }

  return { register, isEditMode, EditModeContainer, EditModeControls, reset, setIsEditMode }
}

const SystemTitle = ({ data, editMode }) => {
  const { isEditMode, register } = editMode
  console.log(isEditMode)
  return isEditMode ? <input {...register('name')} className="w-full" /> : <h1 className="">{data.name}</h1>
}

let SystemPage: NextPage = () => {
  let router = useRouter()
  let uid = router.query.slug

  let { data } = useSWR(uid, fetchData, { suspense: true })

  const onSubmit = data => {
    console.log(data)
  }

  let editMode = useEditMode(onSubmit, data)
  let { EditModeContainer, EditModeControls, reset } = editMode
  useEffect(() => {
    reset(data)
  }, [data, reset])

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

          <div className="text-3xl w-full flex justify-between shrink-0">
            <SystemTitle data={data} editMode={editMode} />
            <EditModeControls />
          </div>

          <aside className="p-1 lg:p-2 w-full lg:w-1/4">
            <nav>
              <Subsystems data={data} />
            </nav>
          </aside>

          <main className="p-1 lg:p-2 lg:w-3/4">
            <article>
              <System data={data} editMode={editMode} />
            </article>
          </main>
        </div>
      </EditModeContainer>
    </>
  )
}

export default SystemPage
// export default dynamic(() => Promise.resolve(SystemPage), {
//   ssr: false
// })
