import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { Fragment, Suspense } from 'react'

import { Button } from '@/components/Buttons'

import { useModalWizardStore } from './store/useModalWizardStore'

const ItemMoveModal = dynamic(() =>
  import('./item-move.modal').then(mod => mod.ItemMoveModal)
)

export const ItemMoveButton: FC = () => {
  const { setOpen } = useModalWizardStore()

  function handleShow() {
    setOpen(true)
  }

  return (
    <Fragment>
      <Button onClick={handleShow}>Move Item</Button>
      <Suspense>
        <ItemMoveModal />
      </Suspense>
    </Fragment>
  )
}
