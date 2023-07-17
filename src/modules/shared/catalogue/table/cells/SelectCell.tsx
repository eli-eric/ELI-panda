import type { CellContext } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

import type { CatalogueItem } from '@/types/responses'

interface Props extends CellContext<CatalogueItem, any> {
  setItem: Dispatch<SetStateAction<CatalogueItem | undefined>>
}

export const SelectCell = ({ row: { original }, setItem }: Props) => (
  <div className="ml-3 flex h-5 items-center">
    <input
      id={`side-${original.uid}`}
      name="itemUid"
      type="radio"
      onClick={() => {
        setItem(original)
      }}
      className="h-4 w-4 border-gray-300 text-primary-500 focus:ring-primary-500"
    />
  </div>
)
