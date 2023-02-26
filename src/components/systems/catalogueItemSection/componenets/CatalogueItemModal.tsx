import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/shared/Buttons'
import ErrorPage from '@/components/shared/error/ErrorPage'
import ModalComponent from '@/components/shared/modal/modal.comp'
import { message } from '@/i18n/src/messages'

import { SystemItemFormType } from '../types/catalogueItemSection'
import CatalogueSearchTable from './CatalogueSearchTable'
import SystemItemForm from './form/SystemItemForm'

const { buttons } = message.common

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const CatalogueItemModal = ({ setOpen, open }: Props) => {
  const [item, setItem] = useState<{ name?: string; uid?: string }>({
    name: undefined,
    uid: undefined,
  })
  const onSubmit = data => {
    console.log(data)
  }

  const formMethods = useForm<SystemItemFormType>()

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
                  loading={false}
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
