import { useRouter } from 'next/router'
import {
  Dispatch,
  Fragment,
  SetStateAction,
  Suspense,
  useEffect,
  useState
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import LoaderComponent from '@/components/ui/loader.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useSystemMapRows } from '@/hooks/systems/relations/useMapRows'
import usePagination from '@/hooks/usePagination'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { SystemsForRelResponse } from '@/types/responses'
import { RELATION_TYPE_CODE } from '@/types/system/constants'

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

const TableWithPaging = ({
  searchValue,
  relationTypeCode
}: {
  searchValue?: string
  relationTypeCode?: RELATION_TYPE_CODE
}) => {
  const [selectedSystemUid, setSelectedSystemUid] = useState<string>()
  const router = useRouter()

  const { pagination, setTotalCount, getPaginationComponent } = usePagination()

  const { data: systems } = useSWR<SystemsForRelResponse>(
    searchValue &&
      ENDPOINTS.systemsForRel +
        `?systemFromUid=${router.query.slug}&relationTypeCode=${relationTypeCode}&search=${searchValue}&pagination=${pagination}`
  )

  const data = useSystemMapRows({
    systems: systems?.data,
    setSelectedSystemUid,
    selectedSystemUid
  })

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  return (
    <Fragment>
      <TableComponent
        collumsTitle={['Name', 'System Type', 'System Code Path']}
        data={data}
      />
      {!systems && <EmptyResults />}
      {systems && systems.totalCount === 0 && <EmptyResults />}
      {getPaginationComponent()}
    </Fragment>
  )
}

interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
  relationTypeCode?: RELATION_TYPE_CODE
}

const AddRelationForm = ({ setopen, relationTypeCode }: Props) => {
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
