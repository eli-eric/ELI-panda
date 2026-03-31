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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'
import { message } from '@/i18n/src/messages'

interface HierarchyLayoutProps {
    tree: ReactNode
    middle: ReactNode
    sidebar?: ReactNode
}

export const HierarchyLayoutComponent: FC<HierarchyLayoutProps> = ({ tree, middle, sidebar }) => {
    const isMobile = useIsMobile()
    const [treeOpen, setTreeOpen] = useState(false)
    const { formatMessage: fm } = useIntl()

    if (isMobile) {
        return (
            <div className="h-dvh flex flex-col overflow-hidden">
                <Collapsible open={treeOpen} onOpenChange={setTreeOpen}>
                    <CollapsibleTrigger asChild>
                        <button className="flex w-full items-center justify-between border-b border-border px-3 py-2 text-sm font-semibold hover:bg-muted/50">
                            {fm({ id: message.systemHierarchy.tree.title })}
                            <ChevronDown
                                className={`size-4 transition-transform ${treeOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="max-h-[50vh] overflow-y-auto border-b border-border">
                        {tree}
                    </CollapsibleContent>
                </Collapsible>

                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">{middle}</div>

                {sidebar && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg"
                            >
                                <Info className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" size="m">
                            <SheetHeader>
                                <SheetTitle>
                                    {fm({ id: message.systemHierarchy.sidebar.title })}
                                </SheetTitle>
                            </SheetHeader>
                            {sidebar}
                        </SheetContent>
                    </Sheet>
                )}
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
                        <aside className="hidden lg:flex flex-col w-80 border-l border-border bg-background overflow-hidden shrink-0">
                            {sidebar}
                        </aside>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
