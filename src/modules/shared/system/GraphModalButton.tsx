import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { GraphTreeButton, TableGraphTreeButton } from '@/components/Buttons'

import { GraphModal } from './GraphModal'

interface Props {
  uid?: string
}

export const GraphModalButton: FC<Props> = ({ uid }) => {
  const [open, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
  }

  if (!uid) {
    return null
  }

  return (
    <Fragment>
      <GraphTreeButton onClick={openModal} />
      <GraphModal open={open} setOpen={setOpen} uid={uid} />
    </Fragment>
  )
}

export const GraphModalTableButton: FC<Props> = ({ uid }) => {
  const [open, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
  }

  if (!uid) {
    return null
  }

  return (
    <Fragment>
      <TableGraphTreeButton onClick={openModal} />
      <GraphModal open={open} setOpen={setOpen} uid={uid} />
    </Fragment>
  )
}
