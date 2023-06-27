import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems-deprecated/types/constants'
import type { RelationFormType } from '@/modules/systems-deprecated/types/form'
import useTableStateStore from '@/store/useTableStateStore'

import SelectRelation from './SelectRelationForm'
import { SystemsForRelTable } from './SystemsForRelTable'

const { buttons } = message.common
interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
  systemName: string
}

const relationValidationSchema = yup.object().shape({
  systemFromUid: yup.string().required(),
  relationTypeCode: yup.string().required(),
  systemToUid: yup.string().required()
})
//TODO refactor
export const AddRelationForm = ({ setopen, systemName }: Props) => {
  const tableId = 'systemsForRel'
  const router = useRouter()
  const [selectedSystem, setSelectedSystem] = useState<{
    name: string
    uid: string
  }>()

  const { systemRelationship, systemRelationships } = useEndpoint({
    uid: router.query.uid as string
  })
  const relFormMethods = useForm<RelationFormType>({
    resolver: yupResolver(relationValidationSchema),
    defaultValues: { relationTypeCode: RELATION_TYPE_CODE.IS_SPARE_FOR }
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

  const { setCustom } = useTableStateStore()

  useEffect(() => {
    setCustom('systemsForRel', { systemFromUid: router.query.uid, relationTypeCode: RELATION_TYPE_CODE.IS_SPARE_FOR })
  }, [router.query.uid, setCustom])

  return (
    <div className="w-full min-h-[541px] justify-between flex flex-col">
      <div className="flex flex-col justify-between">
        <SystemsForRelTable tableId={tableId} selectedSystem={selectedSystem} setSelectedSystem={setSelectedSystem} />
      </div>
      <form onSubmit={relFormMethods.handleSubmit(onSubmit)} className="flex flex-col">
        <FormProvider {...relFormMethods}>
          <SelectRelation systemName={systemName} selectedSystem={selectedSystem} />
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
