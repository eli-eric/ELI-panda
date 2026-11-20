import type { FC, ReactNode } from 'react'

import { CatalogueLayoutComponent } from './CatalogueLayout.comp'

interface CatalogueLayoutContainerProps {
    tree: ReactNode
    middle: ReactNode
    sidebar?: ReactNode
}

export const CatalogueLayoutContainer: FC<CatalogueLayoutContainerProps> = ({
    tree,
    middle,
    sidebar,
}) => {
    return <CatalogueLayoutComponent tree={tree} middle={middle} sidebar={sidebar} />
}
