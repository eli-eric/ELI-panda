import type { CellContext } from '@tanstack/react-table'

import { LinkDecorator } from '@/components/decorators'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CatalogueItem } from '@/types/responses'

interface CategoryNameProps extends CellContext<CatalogueItem, any> {
  setCategoryFilter?: (value: CodebookType) => void
}

export const CategoryName = ({ getValue, setCategoryFilter, row: { original } }: CategoryNameProps) => {
  return (
    <button
      onClick={() => {
        setCategoryFilter?.({ uid: getValue()?.uid, name: getValue()?.name })
      }}
    >
      <LinkDecorator>{getValue()?.name}</LinkDecorator>
    </button>
  )
}
