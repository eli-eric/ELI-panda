import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { PlusButton } from '@/components/Buttons'

import { GraphModal } from './GraphModal'
import type { SystemGraphResponse } from './types'

interface Props {
  uid?: string
}

export const GraphModalButton: FC<Props> = ({ uid }) => {
  const [open, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
  }

  return (
    <Fragment>
      <PlusButton onClick={openModal} />
      <GraphModal open={open} setOpen={setOpen} uid={uid} />
    </Fragment>
  )
}
