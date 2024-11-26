import type { FC } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'

import { useWizardStore } from '../wizard/store/useWizardStore'
import { ItemMoveContainer } from './item-move.cont'
import { useModalWizardStore } from './store/useModalWizardStore'

export const ItemMoveModal: FC = () => {
  const { open, setOpen, setSelectedSystem } = useModalWizardStore()
  const { resetWizard } = useWizardStore()

  const handleClose = (open: boolean) => {
    setOpen(open)
    resetWizard()
    setSelectedSystem(null)
  }

  return (
    <ModalComponent open={open} setOpen={handleClose}>
      <ItemMoveContainer />
    </ModalComponent>
  )
}
