import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import { useSearch } from '@/hooks/table/useSearch'
import { message } from '@/i18n/src/messages'
import type { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'
import type { RelationFormType } from '@/modules/systems/types/form'

import SelectRelation from './SelectRelation'
import SystemsForRel from './SystemsForRelTable'
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
//TODO refactor
const AddRelationForm = ({ setopen, relationTypeCode, systemName }: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const router = useRouter()
  const [selectedSystem, setSelectedSystem] = useState<{
    name: string
    uid: string
  }>()
  const onSearchSubmit = search => {
    setSelectedSystem(undefined)
    setSearchValue(search)
  }

  const { renderSearchBar } = useSearch({ useQuery: false, onSuccess: onSearchSubmit })

  const { systemRelationship, systemRelationships } = useEndpoint({
    uid: router.query.uid as string
  })
  const relFormMethods = useForm<RelationFormType>({
    resolver: yupResolver(relationValidationSchema)
  })

  const { submit, loading, error } = useSubmit({
    endpoint: systemRelationship,
    method: 'post',
    mutateList: [systemRelationships],
    onSuccess: () => {
      setopen(false)
    }
  })
  const onSubmit = data => {
    submit(data)
  }

  return (
    <div className="w-full min-h-[541px] justify-between flex flex-col">
      <div className="flex flex-col justify-between">
        {renderSearchBar()}
        <SystemsForRel
          searchValue={searchValue}
          relationTypeCode={relationTypeCode}
          selectedSystem={selectedSystem}
          setSelectedSystem={setSelectedSystem}
        />
      </div>
      <form onSubmit={relFormMethods.handleSubmit(onSubmit)} className="flex flex-col">
        <FormProvider {...relFormMethods}>
          <SelectRelation relationTypeCode={relationTypeCode} systemName={systemName} selectedSystem={selectedSystem} />
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
