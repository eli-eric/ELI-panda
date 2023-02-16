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
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import LoaderComponent from '@/components/ui/loader.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useSystemMapRows } from '@/hooks/systems/relations/useMapRows'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { SystemsForRelResponse } from '@/types/responses'
import { RELATION_TYPE_CODE } from '@/types/system/constants'

import EmptyResults from './EmptyResults'

const messages = message.systemsPage.relations.addRelationModal

const TableWithPaging = ({
  searchValue,
  relationTypeCode
}: {
  searchValue?: string
  relationTypeCode?: RELATION_TYPE_CODE
}) => {
  const [selectedSystemUid, setSelectedSystemUid] = useState<string>()
  const router = useRouter()
  const intl = useIntl()

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

  const collumsTitle = Object.keys(messages.tableHeader).map(key =>
    intl.formatMessage({ id: messages.tableHeader[key] })
  )

  return (
    <Fragment>
      <TableComponent collumsTitle={collumsTitle} data={data} />
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
  const formMethods = useForm()
  const onSubmit = data => {
    setSearchValue(data.search)
  }

  return (
    <div className="w-full min-h-[650px]">
      <FormProvider {...formMethods}>
        <SearchBarComponent onSubmit={onSubmit} />
      </FormProvider>
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
