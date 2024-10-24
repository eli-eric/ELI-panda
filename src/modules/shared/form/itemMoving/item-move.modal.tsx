import type { FC } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'

import { useWizardStore } from '../wizard/store/useWizardStore'
import { ItemMoveForm } from './item-move.form'
import { useModalWizardStore } from './store/useModalWizardStore'

export const ItemMoveModal: FC = () => {
  const { open, setOpen } = useModalWizardStore()
  const { resetWizard } = useWizardStore()

  const handleClose = (open: boolean) => {
    setOpen(open)
    resetWizard()
  }

  return (
    <ModalComponent open={open} setOpen={handleClose}>
      <ItemMoveForm />
    </ModalComponent>
  )
}
