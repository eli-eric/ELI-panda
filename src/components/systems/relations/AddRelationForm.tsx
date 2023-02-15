import Image from 'next/image'
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import ItemsPaginationComponent from '@/components/catalogue/catalogueItems/paging/items-pagination.comp'
import ProgressBarComponent from '@/components/ui/progress-bar.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { fetcher } from '@/features/fetcher'
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
  const [selectedSystemUid, setSelectedSystemUid] = useState<string>()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }
  const path = ENDPOINTS.systems + `?search=${searchValue}&pageSize=${pageSize}&page=${page}`

  const { data: systems } = useSWR<SystemList>(searchValue ? path : null, fetcher, { suspense: false })
  const isLoading = searchValue && !systems

  const collums = ['Name', 'System Type', 'System Code Path']
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
    <div className="w-full">
      <SearchBar setSearchValue={setSearchValue} />
      {data && systems && (
        <Fragment>
          <TableComponent collumsTitle={collums} data={data} />
          <ItemsPaginationComponent
            page={1}
            pageSize={10}
            previousPageHandler={previousPageHandler}
            nextPageHandler={nextPageHandler}
            itemsTotalCount={systems.length}
          />
        </Fragment>
      )}
      {isLoading && <ProgressBarComponent />}

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          data-testid={'-modal-button-go-next'}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
        >
          Save
        </button>
        <button
          data-testid="modal-button-go-back"
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddRelationForm
