import { Dispatch, SetStateAction } from 'react'

export interface Selectable {
  isSelectable: boolean
  selectedItem?: string

  setItem: Dispatch<SetStateAction<{ name?: string; uid?: string }>>
}
