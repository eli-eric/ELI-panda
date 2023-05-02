import { Dispatch, SetStateAction } from 'react'

import { CatalogueItem } from '@/types/responses'

export interface Selectable {
  isSelectable: boolean
  selectedItem?: string

  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
}
