import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import * as yup from 'yup'

import ErrorPage from '@/components/error/ErrorPage'
import ModalButtonsComponent from '@/components/modal/modal.buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { message } from '@/i18n/src/messages'
import { SystemItemFormType } from '@/modules/systems/types/form'
import { ModalButtons } from '@/types/form'
import { CatalogueItem } from '@/types/responses'

import CatalogueSearchTable from './CatalogueSearchTable'
import SystemItemForm from './form/SystemItemForm'

const { buttons } = message.common

const systemItemValidationSchema = yup.object().shape({
  catalogueItemUID: yup.string().required(),
  itemUsageUID: yup.string(),
  eun: yup.string(),
  name: yup.string(),
  serialNumber: yup.string(),
  batchNumber: yup.string(),
  obsolete: yup.string(),
  estimatedLifeTimeMonths: yup.string(),
  conditionStatusUID: yup.string()
})

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const CatalogueItemModal = ({ setOpen, open }: Props) => {
  const intl = useIntl()
  const [item, setItem] = useState<CatalogueItem | undefined>(undefined)
  const router = useRouter()

  const formMethods = useForm<SystemItemFormType>({
    resolver: yupResolver(systemItemValidationSchema)
  })
  const { system: systemDetail, systemItemAdd } = useEndpoint({
    uid: router.query.uid as string
  })
  const { submit, loading, error } = useSubmit({
    endpoint: systemItemAdd,
    method: 'post',
    mutateList: [systemDetail],
    onSuccess: () => {
      setOpen(false)
    }
  })
  const onSubmit = (data: SystemItemFormType) => {
    submit({
      ...data,
      catalogueItemUID: item?.uid,
      obsolete: data.obsolete === 'true' ? true : false
    })
  }

  const modalButtons: ModalButtons = {
    goNext: {
      text: buttons.continue,
      type: 'submit',
      loading: loading
    },
    goBack: {
      text: buttons.cancel,
      type: 'button',
      onClick: () => {
        setOpen(false)
      }
    }
  }

  return (
    <Fragment>
      <ModalComponent open={open} setOpen={setOpen} buttons={{ noButtons: true }}>
        <div className="min-h-[738px] flex-col justify-end">
          <CatalogueSearchTable setItem={setItem} itemName={item?.name} />
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <SystemItemForm itemName={item?.name} />
              <ModalButtonsComponent buttons={modalButtons} />
              {error && <ErrorPage />}
            </form>
          </FormProvider>
        </div>
      </ModalComponent>
    </Fragment>
  )
}

export default CatalogueItemModal
