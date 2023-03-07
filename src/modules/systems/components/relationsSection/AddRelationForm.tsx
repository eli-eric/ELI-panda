import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, Suspense, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import SearchBarComponent from '@/components/SearchBar.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'

import { RelationFormType } from '../../types/form'
import SelectRelation from './SelectRelation'
import TableWithPaging from './TableWithPaging'
const { buttons } = message.common
interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
  relationTypeCode: RELATION_TYPE_CODE
  systemName: string
}

const relationValidationSchema = yup.object().shape({
  systemFromUid: yup.string().required(),
  relationTypeCode: yup.string().required(),
  systemToUid: yup.string().required()
})

const AddRelationForm = ({ setopen, relationTypeCode, systemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const router = useRouter()
  const [selectedSystem, setSelectedSystem] = useState<{
    name: string
    uid: string
  }>()
  const searchFormMethods = useForm()
  const onSearchSubmit = data => {
    setSelectedSystem(undefined)
    setSearchValue(data.search)
  }
  const { systemRelationship, systemRelationships } = useEndpoint({
    uid: router.query.uid as string
  })
  const relFormMethods = useForm<RelationFormType>({
    resolver: yupResolver(relationValidationSchema)
  })
  const { submit, loading, error } = useSubmit({
    endpoint: systemRelationship,
    method: 'post',
    mutateList: [systemRelationships]
  })
  const onSubmit = async data => {
    await submit(data)
    setopen(false)
  }

  return (
    <div className="w-full min-h-[736px] justify-between flex flex-col">
      <div className="flex flex-col justify-between">
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
      <form
        onSubmit={relFormMethods.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <FormProvider {...relFormMethods}>
          <SelectRelation
            relationTypeCode={relationTypeCode}
            systemName={systemName}
            selectedSystem={selectedSystem}
          />
        </FormProvider>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <Button
            type="submit"
            primary
            loading={loading}
            className="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
          >
            <FormattedMessage id={buttons.continue} />
          </Button>
          <Button
            onClick={() => {
              setopen(false)
            }}
            disabled={loading}
            className="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700"
          >
            <FormattedMessage id={buttons.cancel} />
          </Button>
        </div>
        {error && <ErrorPage />}
      </form>
    </div>
  )
}

export default AddRelationForm
