import type { FC } from 'react'
import { Fragment } from 'react'

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface ParentPathItem {
    uid: string
    name: string
}

interface AncestorClickHint {
    name: string
    parentPath: ParentPathItem[]
}

interface SystemBreadcrumbsProps {
    parentPath: ParentPathItem[] | null
    currentName: string
    currentCode?: string | null
    onSelectAncestor: (uid: string, hint: AncestorClickHint) => void
}

const COLLAPSE_THRESHOLD = 4

interface VisibleItem {
    uid: string
    name: string
    originalIndex: number
}

const buildVisible = (
    ancestors: ParentPathItem[],
): { items: VisibleItem[]; ellipsisAfterIndex: number | null } => {
    const withIndex = ancestors.map((a, i) => ({ ...a, originalIndex: i }))
    const total = ancestors.length + 1
    if (total <= COLLAPSE_THRESHOLD) {
        return { items: withIndex, ellipsisAfterIndex: null }
    }
    return {
        items: [withIndex[0], ...withIndex.slice(-2)],
        ellipsisAfterIndex: 0,
    }
}

export const SystemBreadcrumbs: FC<SystemBreadcrumbsProps> = ({
    parentPath,
    currentName,
    currentCode,
    onSelectAncestor,
}) => {
    const ancestors = parentPath ?? []
    const { items, ellipsisAfterIndex } = buildVisible(ancestors)

    return (
        <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap text-xs">
                {items.map((item, idx) => (
                    <Fragment key={item.uid}>
                        <BreadcrumbItem>
                            <button
                                type="button"
                                data-testid="system-breadcrumb-ancestor"
                                data-uid={item.uid}
                                onClick={() =>
                                    onSelectAncestor(item.uid, {
                                        name: item.name,
                                        parentPath: ancestors.slice(0, item.originalIndex),
                                    })
                                }
                                className="hover:text-foreground transition-colors truncate max-w-[160px]"
                            >
                                {item.name}
                            </button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {ellipsisAfterIndex === idx && (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbEllipsis
                                        data-testid="system-breadcrumb-ellipsis"
                                        className="size-4"
                                    />
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        )}
                    </Fragment>
                ))}
                <BreadcrumbItem className="min-w-0">
                    <BreadcrumbPage
                        data-testid="system-breadcrumb-current"
                        className="font-semibold truncate"
                    >
                        {currentName}
                    </BreadcrumbPage>
                    {currentCode && (
                        <code className="text-[10px] text-muted-foreground shrink-0 rounded bg-muted px-1.5 py-0.5">
                            {currentCode}
                        </code>
                    )}
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
