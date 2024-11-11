import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { Fragment, Suspense } from 'react'

import { Button } from '@/components/Buttons'

import { useModalWizardStore } from '../itemMoving/store/useModalWizardStore'

const ItemMoveModal = dynamic(() =>
  import('./item-assign.modal').then(mod => mod.ItemAssignModal)
)

export const ItemAssignButton: FC = () => {
  const { setOpen } = useModalWizardStore()

  function handleShow() {
    setOpen(true)
  }

  return (
    <Fragment>
      <Button primary onClick={handleShow}>
        Assign Item
      </Button>
      <Suspense>
        <ItemMoveModal />
      </Suspense>
    </Fragment>
  )
}
