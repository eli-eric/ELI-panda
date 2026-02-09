import type { FC, ReactNode } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

interface HierarchyLayoutProps {
    tree: ReactNode
    middle: ReactNode
    sidebar?: ReactNode
}

export const HierarchyLayoutComponent: FC<HierarchyLayoutProps> = ({ tree, middle, sidebar }) => {
    return (
        <div className="h-[calc(100vh)] flex overflow-hidden">
            {/* Mobile: stacked layout */}
            <div className="md:hidden flex flex-col h-full w-full">
                {tree}
                {middle}
            </div>

            {/* Desktop: resizable tree + content */}
            <ResizablePanelGroup orientation="horizontal" className="hidden md:flex">
                {/* Left panel - System Tree (resizable) */}
                <ResizablePanel
                    defaultSize="25%"
                    minSize="15%"
                    maxSize="50%"
                    className="flex flex-col border-r border-border bg-background overflow-hidden"
                >
                    {tree}
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Middle panel - Content */}
                <ResizablePanel
                    defaultSize="75%"
                    minSize="50%"
                    className="flex flex-col overflow-hidden"
                >
                    {middle}
                </ResizablePanel>
            </ResizablePanelGroup>

            {/* Right sidebar - fixed width, not resizable */}
            {sidebar && (
                <aside className="hidden lg:flex flex-col w-80 border-l border-border bg-background overflow-hidden shrink-0">
                    {sidebar}
                </aside>
            )}
        </div>
    )
}
