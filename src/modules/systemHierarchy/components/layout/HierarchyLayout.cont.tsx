import type { FC, ReactNode } from 'react'

import { HierarchyLayoutComponent } from './HierarchyLayout.comp'

interface HierarchyLayoutContainerProps {
    tree: ReactNode
    middle: ReactNode
    sidebar?: ReactNode
}

export const HierarchyLayoutContainer: FC<HierarchyLayoutContainerProps> = ({
    tree,
    middle,
    sidebar,
}) => {
    return <HierarchyLayoutComponent tree={tree} middle={middle} sidebar={sidebar} />
}
