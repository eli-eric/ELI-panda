import { Fragment, useState } from 'react'

import { PlusButton } from '@/components/Buttons'

import { SelectRelatatedItemsModal } from './SelectRelatatedItems.modal'

export const AddRelatatedItemButton = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <Fragment>
      <PlusButton onClick={handleOpen} />
      <SelectRelatatedItemsModal {...{ open, setOpen }} />
    </Fragment>
  )
}
