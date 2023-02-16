import Image from 'next/image'
import { Dispatch, Fragment, SetStateAction, Suspense, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import ItemsPaginationComponent from '@/components/catalogue/catalogueItems/paging/items-pagination.comp'
import LoaderComponent from '@/components/ui/loader.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { SystemList } from '@/types/system'

const SearchBar = ({ setSearchValue }: { setSearchValue: Dispatch<SetStateAction<string | undefined>> }) => {
  const formMethods = useForm()
  const onSubmit = data => {
    setSearchValue(data.search)
  }
  return (
    <FormProvider {...formMethods}>
      <SearchBarComponent onSubmit={onSubmit} />
    </FormProvider>
  )
}

const EmptyResults = () => (
  <div className="text-center py-40">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No results</h3>
    <p className="mt-1 text-sm text-gray-500">Get started by search Systems.</p>
  </div>
)

const TableWithPaging = ({ searchValue }) => {
  const [selectedSystemUid, setSelectedSystemUid] = useState<string>()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }

  const { data: systems } = useSWR<SystemList>(
    searchValue && ENDPOINTS.systems + `?search=${searchValue}&pageSize=${pageSize}&page=${page}`
  )

  const data = useMemo(() => {
    const data = systems?.map(system => {
      const row = Object.entries(system).filter(
        system => system[0].includes('name') || system[0].includes('systemCodePath') || system[0].includes('systemType')
      )
      return row.map((value, index) => {
        if (value) {
          if (value[0] === 'name') {
            return (
              <Name
                key={system.uid + index}
                name={system.name}
                selectSystemUid={setSelectedSystemUid}
                uid={system.uid}
                selelectedSystem={selectedSystemUid}
              />
            )
          }
        }
        return <p key={system.name + index}>{value[1]}</p>
      })
    })
    return data
  }, [systems, selectedSystemUid])

  return (
    <Fragment>
      <TableComponent collumsTitle={['Name', 'System Type', 'System Code Path']} data={data} />
      {!systems && <EmptyResults />}
      <ItemsPaginationComponent
        page={page}
        pageSize={pageSize}
        previousPageHandler={previousPageHandler}
        nextPageHandler={nextPageHandler}
        itemsTotalCount={systems?.length}
      />
    </Fragment>
  )
}

const Name = ({ uid, name, selectSystemUid, selelectedSystem }) => {
  const image = 'https://source.unsplash.com/collection/71371194/500x500'
  return (
    <div
      className={`flex items-center cursor-pointer ${uid === selelectedSystem ? 'text-primary-600' : ''}`}
      onClick={() => {
        selectSystemUid(uid)
      }}
    >
      <div className="h-10 w-10 flex-shrink-0">
        <Image className="h-10 w-10 rounded-full" alt={name} src={image} width={200} height={200} />
      </div>
      <div className="ml-4">{name}</div>
    </div>
  )
}

const AddRelationForm = ({ setopen }) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  return (
    <div className="w-full min-h-[800px]">
      <SearchBar setSearchValue={setSearchValue} />
      <Suspense
        fallback={
          <div className="max-h-full">
            <LoaderComponent />
          </div>
        }
      >
        <TableWithPaging searchValue={searchValue} />
      </Suspense>
    </div>
  )
}

export default AddRelationForm
