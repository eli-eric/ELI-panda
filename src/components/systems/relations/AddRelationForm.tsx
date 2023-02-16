import Image from 'next/image'
import { Dispatch, Fragment, SetStateAction, Suspense, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import ItemsPaginationComponent from '@/components/catalogue/catalogueItems/paging/items-pagination.comp'
import LoaderComponent from '@/components/ui/loader.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useSystemMapRows } from '@/hooks/systems/relations/useMapRows'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { SystemList } from '@/types/system'

import EmptyResults from './EmptyResults'

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
  const data = useSystemMapRows({ systems, setSelectedSystemUid, selectedSystemUid })

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
