import type { FC } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'

import { useModalWizardStore } from '../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../wizard/store/useWizardStore'
import { ItemAssignContainer } from './item-assign.cont'

export const ItemAssignModal: FC = () => {
  const { open, setOpen, setSelectedSystem } = useModalWizardStore()
  const { resetWizard } = useWizardStore()

  const handleClose = (open: boolean) => {
    setOpen(open)
    resetWizard()
    setSelectedSystem(null)
  }

  return (
    <ModalComponent open={open} setOpen={handleClose}>
      <ItemAssignContainer />
    </ModalComponent>
  )
}
