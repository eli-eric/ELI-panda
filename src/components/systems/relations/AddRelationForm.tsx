import { useRouter } from 'next/router'
import {
  Dispatch,
  Fragment,
  SetStateAction,
  Suspense,
  useMemo,
  useState
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import ItemsPaginationComponent from '@/components/catalogue/catalogueItems/paging/items-pagination.comp'
import LoaderComponent from '@/components/ui/loader.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useSystemMapRows } from '@/hooks/systems/relations/useMapRows'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { SystemsForRelResponse } from '@/types/responses'

import EmptyResults from './EmptyResults'

const SearchBar = ({
  setSearchValue
}: {
  setSearchValue: Dispatch<SetStateAction<string | undefined>>
}) => {
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

const TableWithPaging = ({ searchValue, relationTypeCode }) => {
  const [selectedSystemUid, setSelectedSystemUid] = useState<string>()
  const router = useRouter()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const previousPageHandler = () => {
    setPage(prev => prev - 1)
  }
  const nextPageHandler = () => {
    setPage(prev => prev + 1)
  }

  const pagination = useMemo(() => {
    const paging = {
      page: page,
      pageSize: pageSize
    }
    return JSON.stringify(paging)
  }, [page, pageSize])

  const { data: systems } = useSWR<SystemsForRelResponse>(
    searchValue &&
      ENDPOINTS.systemsForRel +
        `?systemFromUid=${router.query.slug}&relationTypeCode${relationTypeCode}&search=${searchValue}&pagination=${pagination}`
  )
  const data = useSystemMapRows({
    systems: systems?.data,
    setSelectedSystemUid,
    selectedSystemUid
  })

  console.log(systems)

  return (
    <Fragment>
      <TableComponent
        collumsTitle={['Name', 'System Type', 'System Code Path']}
        data={data}
      />
      {!systems && <EmptyResults />}
      {systems && systems.totalCount === 0 && <EmptyResults />}
      <ItemsPaginationComponent
        page={page}
        pageSize={pageSize}
        previousPageHandler={previousPageHandler}
        nextPageHandler={nextPageHandler}
        itemsTotalCount={systems?.totalCount}
      />
    </Fragment>
  )
}

const AddRelationForm = ({ setopen, relationTypeCode }) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()

  return (
    <div className="w-full min-h-[650px]">
      <SearchBar setSearchValue={setSearchValue} />
      <Suspense
        fallback={
          <div className="max-h-full">
            <LoaderComponent />
          </div>
        }
      >
        <TableWithPaging
          searchValue={searchValue}
          relationTypeCode={relationTypeCode}
        />
      </Suspense>
    </div>
  )
}

export default AddRelationForm
