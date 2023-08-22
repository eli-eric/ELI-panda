import type { CellContext } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'

interface Props extends CellContext<CatalogueItem, any> {
  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
  selectedItem?: CatalogueItem
}

export const SelectCell = ({ row: { original }, setItem, selectedItem }: Props) => (
  <div className="ml-3 flex h-5 items-center">
    <input
      id={`side-${original.uid}`}
      name="itemUid"
      type="radio"
      checked={selectedItem?.uid === original.uid}
      onChange={() => {
        setItem(original)
      }}
      className="h-4 w-4 border-gray-300 text-primary-500 focus:ring-primary-500"
    />
  </div>
)
