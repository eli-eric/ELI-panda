import React, { Dispatch, Fragment, SetStateAction } from 'react'

import ModalComponent from '@/components/ui/modal/modal.comp'
import { ModalButtons } from '@/types/form'

import AddCatalogueItemForm from './AddCatalogueItemForm'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const AddCatalogueItemModal = ({ setOpen, open }: Props) => {
  const submit = () => {
    console.log('submitted')
  }

  const addItemModalButtons: ModalButtons = {
    goNext: {
      text: 'Save',
      onClick: () => {
        submit()
      },
    },
    goBack: {
      text: 'Cancel',
      onClick: () => setOpen(false),
    },
  }
  return (
    <Fragment>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={addItemModalButtons}
      >
        <AddCatalogueItemForm />
      </ModalComponent>
    </Fragment>
  )
}

export default AddCatalogueItemModal
