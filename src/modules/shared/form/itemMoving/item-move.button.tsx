import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { Fragment, Suspense, useState } from 'react'

import { Button } from '@/components/Buttons'

const ItemMoveModal = dynamic(() =>
  import('./item-move.modal').then(mod => mod.ItemMoveModal)
)

export const ItemMoveButton: FC = () => {
  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(true)
  }

  return (
    <Fragment>
      <Button primary onClick={handleShow}>
        Move Item
      </Button>
      <Suspense>
        <ItemMoveModal show={show} setShow={setShow} />
      </Suspense>
    </Fragment>
  )
}
