import { ChevronDown, Info } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

interface HierarchyLayoutProps {
    tree: ReactNode
    middle: ReactNode
    sidebar?: ReactNode
}

const SidebarSheet: FC<{ sidebar: ReactNode; className?: string; label: string }> = ({
    sidebar,
    className,
    label,
}) => (
    <Sheet>
        <SheetTrigger asChild>
            <Button
                type="button"
                variant="outline"
                size="icon"
                className={cn('fixed bottom-4 right-4 z-40 rounded-full shadow-lg', className)}
                aria-label={label}
            >
                <Info className="size-4" />
            </Button>
        </SheetTrigger>
        <SheetContent side="right" size="m">
            {sidebar}
        </SheetContent>
    </Sheet>
)

export const HierarchyLayoutComponent: FC<HierarchyLayoutProps> = ({ tree, middle, sidebar }) => {
    const isMobile = useIsMobile()
    const [treeOpen, setTreeOpen] = useState(false)
    const { formatMessage: fm } = useIntl()

    const sidebarLabel = fm({ id: message.systemHierarchy.sidebar.title })

    if (isMobile) {
        return (
            <div className="h-dvh flex flex-col overflow-hidden">
                <Collapsible open={treeOpen} onOpenChange={setTreeOpen}>
                    <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
                        <SidebarTrigger />
                        <CollapsibleTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="flex-1 justify-between text-sm font-semibold"
                            >
                                {fm({ id: message.systemHierarchy.tree.title })}
                                <ChevronDown
                                    className={cn(
                                        'size-4 transition-transform',
                                        treeOpen && 'rotate-180',
                                    )}
                                />
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent
                        forceMount
                        className={cn(
                            'max-h-[50vh] overflow-y-auto border-b border-border',
                            !treeOpen && 'hidden',
                        )}
                    >
                        {tree}
                    </CollapsibleContent>
                </Collapsible>

                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">{middle}</div>

                {sidebar && <SidebarSheet sidebar={sidebar} label={sidebarLabel} />}
            </div>
        )
    }

    return (
        <div className="h-dvh flex overflow-hidden">
            <ResizablePanelGroup orientation="horizontal">
                <ResizablePanel
                    defaultSize="25%"
                    minSize="15%"
                    maxSize="50%"
                    className="flex flex-col border-r border-border bg-background overflow-hidden"
                >
                    {tree}
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel
                    defaultSize="75%"
                    minSize="50%"
                    className="flex overflow-hidden"
                >
                    <div className="flex-1 flex flex-col overflow-hidden">{middle}</div>
                    {sidebar && (
                        <>
                            <aside className="hidden lg:flex flex-col w-80 border-l border-border bg-background overflow-hidden shrink-0">
                                {sidebar}
                            </aside>
                            <SidebarSheet
                                sidebar={sidebar}
                                className="lg:hidden"
                                label={sidebarLabel}
                            />
                        </>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
