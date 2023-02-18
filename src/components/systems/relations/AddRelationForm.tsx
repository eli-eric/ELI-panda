import { useRouter } from 'next/router'
import { Dispatch, Fragment, SetStateAction, Suspense, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import { Option, SelectWithError } from '@/components/ui/form/Select'
import LoaderComponent from '@/components/ui/loader.comp'
import SearchBarComponent from '@/components/ui/SearchBar.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useSystemMapRows } from '@/hooks/systems/relations/useMapRows'
import { useEndpoints } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { SystemsForRelResponse } from '@/types/responses'
import { RELATION_TYPE_CODE } from '@/types/system/constants'

import EmptyResults from './EmptyResults'

const messages = message.systemsPage.relations.addRelationModal

const SelectRelation = ({
  relationTypeCode,
  systemName,
  selectedSystem
}: {
  relationTypeCode?: RELATION_TYPE_CODE
  systemName: string
  selectedSystem?: {
    name: string
    uid: string
  }
}) => {
  const { register, watch } = useFormContext()
  const router = useRouter()
  const baseSystemOption = useMemo(
    () => ({
      name: systemName,
      value: router.query.slug as string
    }),
    [router, systemName]
  )
  const selectedSystemOption = useMemo(() => {
    if (!selectedSystem) {
      return {
        name: undefined,
        value: undefined
      }
    }
    return {
      name: selectedSystem?.name,
      value: selectedSystem?.uid
    }
  }, [selectedSystem])
  const [systemToOption, setSystemToOption] = useState<Option>(selectedSystemOption)

  const watchSystemFromUid = watch('systemFromUid')

  useEffect(() => {
    if (watchSystemFromUid === baseSystemOption.value) {
      setSystemToOption(selectedSystemOption)
    }
    if (watchSystemFromUid === selectedSystemOption.value) {
      setSystemToOption(baseSystemOption)
    }
    if (!selectedSystem) {
      setSystemToOption(selectedSystemOption)
    }
  }, [watchSystemFromUid, baseSystemOption, selectedSystemOption, selectedSystem])

  return (
    <div className="flex flex-row">
      <SelectWithError
        options={selectedSystem ? [baseSystemOption, selectedSystemOption] : [baseSystemOption]}
        register={register}
        name={'systemFromUid'}
        isError={true}
        rounded="rounded-l-md"
        label="System From"
      />
      <SelectWithError
        options={[{ value: relationTypeCode }]}
        register={register}
        name={'relationTypeCode'}
        isError={true}
        disabled
        label="Relation Type Code"
      />
      <SelectWithError
        options={[systemToOption]}
        register={register}
        name={'systemToUid'}
        isError={true}
        disabled
        rounded="rounded-r-md"
        label="System To"
      />
    </div>
  )
}

const TableWithPaging = ({
  searchValue,
  relationTypeCode,
  setSelectedSystem,
  selectedSystem
}: {
  searchValue?: string
  relationTypeCode?: RELATION_TYPE_CODE
  setSelectedSystem: Dispatch<
    SetStateAction<
      | {
          name: string
          uid: string
        }
      | undefined
    >
  >
  selectedSystem?: {
    name: string
    uid: string
  }
}) => {
  const router = useRouter()
  const intl = useIntl()

  const { pagination, setTotalCount, getPaginationComponent } = usePagination(searchValue)
  const query = useMemo(
    () => ({ systemFromUid: router.query.slug, relationTypeCode, search: searchValue, pagination }),
    [router, relationTypeCode, searchValue, pagination]
  )
  const endpoints = useEndpoints({ query })
  const { data: systems } = useSWR<SystemsForRelResponse>(searchValue && endpoints.systemsForRel)

  const data = useSystemMapRows({
    systems: systems?.data,
    setSelectedSystem,
    selectedSystem
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
  systemName: string
}

const AddRelationForm = ({ setopen, relationTypeCode, systemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const [selectedSystem, setSelectedSystem] = useState<{
    name: string
    uid: string
  }>()
  const searchFormMethods = useForm()
  const onSearchSubmit = data => {
    setSelectedSystem(undefined)
    setSearchValue(data.search)
  }
  const relFormMethods = useForm()
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className="w-full min-h-[736px] flex flex-col justify-between">
      <div className="flex flex-col">
        <FormProvider {...searchFormMethods}>
          <SearchBarComponent onSubmit={onSearchSubmit} />
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
            selectedSystem={selectedSystem}
            setSelectedSystem={setSelectedSystem}
          />
        </Suspense>
      </div>
      <form onSubmit={relFormMethods.handleSubmit(onSubmit)} className="flex flex-col">
        <FormProvider {...relFormMethods}>
          <SelectRelation relationTypeCode={relationTypeCode} systemName={systemName} selectedSystem={selectedSystem} />
        </FormProvider>

        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            data-testid={'-modal-button-go-next'}
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
          >
            Save
          </button>
          <button
            data-testid="modal-button-go-back"
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
            onClick={() => {
              setopen(false)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRelationForm
