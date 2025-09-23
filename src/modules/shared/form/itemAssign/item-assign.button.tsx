import type { FC } from 'react'

import { Button } from '@/components/Buttons'

import { openItemAssignModal } from './item-assign.modal'

export const ItemAssignButton: FC = () => {
  return <Button onClick={openItemAssignModal}>Assign Item</Button>
}
