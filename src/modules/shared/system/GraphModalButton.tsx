import type { FC } from 'react'

import { GraphTreeButton, TableGraphTreeButton } from '@/components/Buttons'

import { openGraphModal } from './GraphModal'

interface Props {
  uid?: string
}

export const GraphModalButton: FC<Props> = ({ uid }) => {
  if (!uid) {
    return null
  }

  return <GraphTreeButton onClick={() => openGraphModal(uid)} />
}

export const GraphModalTableButton: FC<Props> = ({ uid }) => {
  if (!uid) {
    return null
  }

  return <TableGraphTreeButton onClick={() => openGraphModal(uid)} />
}
