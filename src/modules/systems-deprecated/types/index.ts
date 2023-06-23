import type { Dispatch, SetStateAction } from 'react'

import type { CatalogueItem } from '@/types/responses'

export interface Selectable {
  isSelectable: boolean
  selectedItem?: string

  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
}

export * from './responses'
