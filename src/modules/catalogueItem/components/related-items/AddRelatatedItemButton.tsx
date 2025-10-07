import { PlusButton } from '@/components/Buttons'

import { openSelectRelatedItemsModal } from './SelectRelatatedItems.modal'

export const AddRelatatedItemButton = () => {
  return <PlusButton onClick={openSelectRelatedItemsModal} />
}
