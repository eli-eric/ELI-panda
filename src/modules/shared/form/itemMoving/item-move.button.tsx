import type { FC } from 'react'

import { Button } from '@/components/Buttons'

import { openItemMoveModal } from './item-move.modal'

export const ItemMoveButton: FC = () => {
  return <Button onClick={openItemMoveModal}>Move Item</Button>
}
