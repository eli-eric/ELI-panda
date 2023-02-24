import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { Button } from '@/components/ui/Buttons'
import ModalComponent from '@/components/ui/modal/modal.comp'
import { message } from '@/i18n/src/messages'

import CatalogueItemsForm from './catalogueItemsForm/CatalogueItemForm'
import SystemItemForm from './catalogueItemsForm/SystemItemForm'

const { buttons } = message.common

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const CatalogueItemModal = ({ setOpen, open }: Props) => {
  const onSubmit = data => {
    console.log(data)
  }

  const formMethods = useForm()

  return (
    <Fragment>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={{ noButtons: true }}
      >
        <Fragment>
          <CatalogueItemsForm />
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <SystemItemForm />
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
        </Fragment>
      </ModalComponent>
    </Fragment>
  )
}

export default CatalogueItemModal
