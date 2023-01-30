import { faker } from '@faker-js/faker'
import SystemDetailSectionComponent from 'modules/systems/details/system-detail/system-detail-section.comp'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import useSWR from 'swr/immutable'

type System = {
  uid: string
  name: string
  children: SystemUidName[]
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

const getFakeName = () => faker.company.catchPhrase()

const getFakePath = (): System['path'] => {
  const length = faker.datatype.number({ min: 0, max: 10 })
  return [...Array(length)].map(() => [faker.datatype.uuid(), getFakeName()])
}

const getFakeSystem = (): System => {
  const uid = faker.datatype.uuid()
  const name = getFakeName()
  return {
    uid,
    name,
    path: getFakePath(),
    image: 'https://source.unsplash.com/collection/71371194/500x500',
    description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(5)}`,
    children: getFakePath(),
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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const fetchFakeSystem = async uri => {
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return uri && getFakeSystem()
}
const fetchFakeSystems = async uri => {
  const res = [...Array(faker.datatype.number({ min: 0, max: 100 }))]
  await sleep(faker.datatype.number({ min: 200, max: 2000 }))
  return uri && res.map(() => getFakeSystem())
}

const Card = (props: any) => <div {...props} className={`mb-2 lg:mb-4 py-1 lg:py-2 ${props.className}`} />

const SubsystemsList = ({ data }) => (
  <Card>
    <ul>
      {data.children.length === 0 ? (
        <li>This node does not contain any subsystems.</li>
      ) : (
        data.children.map(([uid, name]) => (
          <li key={uid}>
            <SystemLink href={`/tree/${uid}`}>{name}</SystemLink>
          </li>
        ))
      )}
    </ul>
  </Card>
)

const Preview = ({ data, editMode }: SystemEditableProps) => {
  const { image, name } = data
  const { newImage, isEditMode, setNewImage } = editMode
  const onDrop = useCallback(
    files => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => setNewImage(reader.result)
    },
    [setNewImage]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, onDrop })

  return (
    <>
      <b>Preview</b>
      <Card className="w-[500px] h-[500px]">
        {isEditMode ? (
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <img width="100%" src={newImage ? newImage : image} alt={name} />
              {isDragActive ? 'Drop new image here' : 'Click here or drag and drop an image'}
            </div>
            <div>{newImage && <button onClick={() => setNewImage('')}>Discard</button>}</div>
          </div>
        ) : (
          <img width="100%" src={image} alt={name} />
        )}
      </Card>
    </>
  )
}

const Description = ({ data, editMode }: SystemEditableProps) => {
  const { description } = data
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
const SystemLink = props => <Link {...props} className={`whitespace-nowrap hover:text-orange-700 ${props.className}`} />

const Breadcrumbs = ({ data }: SystemProps) => {
  const { path } = data
  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        Systems /
        {path.map(([uid, name]) => (
          <SystemLink key={uid} href={`/tree/${uid}`}>
            {name} /
          </SystemLink>
        ))}
      </div>
    </div>
  )
}

const Subsystems = ({ data }: SystemProps) => {
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

const System = ({ data, editMode }: SystemEditableProps) => {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-4">
      <section className="grow lg:grow-0 shrink-0">
        <Preview data={data} editMode={editMode} />
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
  const [newImage, setNewImage] = useState('')

  //For some reason react-hook-form's default values get off sync unless reset like bellow. ???
  useEffect(() => {
    reset(data)
  }, [data, reset])

  const EditModeContainer = ({ children }) => {
    return isEditMode ? (
      <form
        onSubmit={handleSubmit(data => {
          setIsEditMode(false)
          return newImage ? onSubmit({ ...data, image: newImage }) : onSubmit(data)
        })}
      >
        {children}
      </form>
    ) : (
      children
    )
  }
  const EditModeControls = () => {
    const Quit = () => (
      <button
        onClick={() => {
          setNewImage('')
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

  return { register, isEditMode, EditModeContainer, setNewImage, newImage, EditModeControls, reset, setIsEditMode }
}

const Title = ({ data, editMode }) => {
  const { isEditMode, register } = editMode
  return isEditMode ? <input {...register('name')} className="w-full" /> : <h1 className="">{data.name}</h1>
}

const onSubmit = (data: System) => {
  console.log(data)
}

const debounce = (fn, ms = 500) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    setTimeout(() => fn(...args), ms)
  }
}

const SearchInput = ({ initialQuery }) => {
  const { query, push } = useRouter()
  const ID = 'systems-search-input'
  useEffect(() => {
    initialQuery && document.getElementById(ID)?.focus()
  }, [initialQuery])
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        id={ID}
        defaultValue={initialQuery}
        placeholder="search this system"
        onChange={debounce(e => {
          push({ query: { ...query, q: e.target.value } }, undefined, { shallow: true })
        }, 1000)}
      />
    </form>
  )
}

const SearchResults = ({ query }) => {
  const { data = [] } = useSWR(query, fetchFakeSystems, { suspense: true })
  return (
    <div className="h-[30vh] mb-4">
      <b>Results ({data.length})</b>
      <Card className="h-full overflow-auto">
        {data.length > 0 ? (
          <ul>
            {data.map(({ uid, name }) => (
              <li key={uid}>
                <SystemLink href={`/tree/${uid}`}>{name}</SystemLink>
              </li>
            ))}
          </ul>
        ) : (
          <div>No results found.</div>
        )}
      </Card>
    </div>
  )
}

const Page: NextPage = () => {
  const router = useRouter()
  const uid = router.query.slug
  const query = router.query.q

  const { data } = useSWR(uid, fetchFakeSystem)

  const editMode = useEditMode(onSubmit, data)
  const { isEditMode, EditModeContainer, EditModeControls } = editMode

  //I can't seem to get <Suspense> working, using this for now.
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

          <div className="text-3xl w-full flex shrink-0 justify-between">
            <Title data={data} editMode={editMode} />
            {isEditMode || <SearchInput initialQuery={query} />}
            <EditModeControls />
          </div>
          {isEditMode ||
            (query && (
              <div className="p-1 lg:p-2 w-full">
                <Suspense
                  fallback={
                    <div className="h-[30vh] mb-4">
                      <b>Loading</b>
                    </div>
                  }
                >
                  <SearchResults query={query} />
                </Suspense>
              </div>
            ))}

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

export default Page
