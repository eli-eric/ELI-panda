import type { CellContext } from '@tanstack/react-table'

import { LinkDecorator } from '@/components/decorators'
import type { CatalogueItem } from '@/types/responses/catalogue'
import type { CodebookType } from '@/types/responses/codebook'

interface CategoryNameProps extends CellContext<CatalogueItem, any> {
    setCategoryFilter?: (value: CodebookType) => void
}

export const CategoryName = ({ getValue, setCategoryFilter }: CategoryNameProps) => {
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
