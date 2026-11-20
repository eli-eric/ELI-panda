import type { FC, ReactNode } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useIsMobile } from '@/hooks/use-mobile'

interface TeamsLayoutProps {
    list: ReactNode
    detail: ReactNode
}

/**
 * Two-pane explorer layout (list | detail), mirroring the hierarchy module.
 * On mobile the list stacks above the detail.
 */
export const TeamsLayoutComponent: FC<TeamsLayoutProps> = ({ list, detail }) => {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <div className="h-dvh flex flex-col overflow-hidden">
                <div className="max-h-[45vh] overflow-y-auto border-b border-border">{list}</div>
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">{detail}</div>
            </div>
        )
    }

    return (
        <div className="h-dvh flex overflow-hidden">
            <ResizablePanelGroup orientation="horizontal">
                <ResizablePanel
                    defaultSize="25%"
                    minSize="18%"
                    maxSize="45%"
                    className="flex flex-col border-r border-border bg-background overflow-hidden"
                >
                    {list}
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize="75%" minSize="55%" className="flex overflow-hidden">
                    <div className="flex-1 flex flex-col overflow-hidden">{detail}</div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
