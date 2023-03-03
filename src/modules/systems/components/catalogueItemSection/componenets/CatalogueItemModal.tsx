import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import ModalComponent from '@/components/modal/modal.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { message } from '@/i18n/src/messages'
import { SystemItemFormType } from '@/modules/systems/types/form'

import CatalogueSearchTable from './CatalogueSearchTable'
import SystemItemForm from './form/SystemItemForm'

const { buttons } = message.common

const systemItemValidationSchema = yup.object().shape({
  catalogueItemUID: yup.string().required(),
  itemUsageUID: yup.string().required(),
  eun: yup.string().required(),
  name: yup.string().required(),
  serialNumber: yup.string().required(),
  batchNumber: yup.string().required(),
  obsolete: yup.string().required(),
  estimatedLifeTimeMonths: yup.string().required()
})

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const CatalogueItemModal = ({ setOpen, open }: Props) => {
  const [item, setItem] = useState<{ name?: string; uid?: string }>({
    name: undefined,
    uid: undefined
  })
  const router = useRouter()

  const { systemDetail, catalogueCategoryEdit } = useEndpoint({
    uid: router.query.uid as string
  })
  const { submit, loading, error, response } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: 'post',
    mutateList: [systemDetail]
  })
  const onSubmit = (data: SystemItemFormType) => {
    submit({ ...data, catalogueItemUID: item.uid })
    //console.log({ ...data, catalogueItemUID: item.uid } as SystemItemFormType)
  }

  useEffect(() => {
    if (response) if (!error) setOpen(false)
  }, [response, setOpen, error])

  const formMethods = useForm<SystemItemFormType>({
    resolver: yupResolver(systemItemValidationSchema)
  })

  return (
    <Fragment>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={{ noButtons: true }}
      >
        <div className="min-h-[849px] flex-col justify-end">
          <CatalogueSearchTable setItem={setItem} itemName={item.name} />
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <SystemItemForm itemName={item.name} />
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <Button
                  type="submit"
                  primary
                  loading={loading}
                  className="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
                >
                  <FormattedMessage id={buttons.save} />
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false)
                  }}
                  disabled={false}
                  className="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700"
                >
                  <FormattedMessage id={buttons.cancel} />
                </Button>
              </div>
              {false && <ErrorPage />}
            </form>
          </FormProvider>
        </div>
      </ModalComponent>
    </Fragment>
  )
}

export default CatalogueItemModal
