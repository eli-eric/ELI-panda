import type { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface HierarchyLayoutProps {
    tree: ReactNode
    middle: ReactNode
    sidebar?: ReactNode
}

export const HierarchyLayoutComponent: FC<HierarchyLayoutProps> = ({ tree, middle, sidebar }) => {
    return (
        <div
            className={cn(
                'grid h-[calc(100vh-4rem)] gap-0 overflow-hidden',
                sidebar
                    ? 'grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_320px]'
                    : 'grid-cols-1 md:grid-cols-[280px_1fr]',
            )}
        >
            <aside className="hidden md:flex flex-col border-r border-border bg-background overflow-hidden">
                {tree}
            </aside>
            <main className="flex flex-col overflow-hidden">{middle}</main>
            {sidebar && (
                <aside className="hidden lg:flex flex-col border-l border-border bg-background overflow-hidden">
                    {sidebar}
                </aside>
            )}
        </div>
    )
}
