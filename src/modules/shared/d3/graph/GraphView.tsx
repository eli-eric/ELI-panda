// GraphView.tsx
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useRef, useState } from 'react'

import { FilterButton, MinusButton, PlusButton, StatsButton } from '@/components/Buttons'
import { cn } from '@/lib/utils'

import { useForceGraph } from './hooks/useForceGraph'
import type { GraphNode, SystemGraphResponse } from './types'

interface Props {
    data: SystemGraphResponse
    renderFilter: (props: { open: boolean }) => JSX.Element | null
    renderStats: (props: { open: boolean; selectedNode: GraphNode | null }) => JSX.Element | null
}

const GraphView: FC<PropsWithChildren<Props>> = ({ data, renderStats, renderFilter }) => {
    const svgRef = useRef<SVGSVGElement>(null!)
    const circleRadius = 10

    const [openStats, setOpenStats] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

    const handleOpenStats = useCallback(() => {
        setOpenStats(prev => !prev)
        setOpenFilter(false)
    }, [])

    const handleOpenFilter = useCallback(() => {
        setOpenFilter(prev => !prev)
        setOpenStats(false)
    }, [])

    // Use the custom hook
    const { zoomIn, zoomOut } = useForceGraph({
        data,
        svgRef,
        circleRadius,
        setSelectedNode,
        setOpenStats,
        setOpenFilter,
    })

    return (
        <div>
            <div className="mb-2 flex justify-between">
                <div className="flex gap-x-1">
                    <FilterButton onClick={handleOpenFilter} />
                    <MinusButton onClick={zoomOut} />
                    <PlusButton onClick={zoomIn} />
                </div>
                <StatsButton onClick={handleOpenStats} disabled={!selectedNode} />
            </div>
            <div className="grid grid-cols-12 gap-x-2">
                {renderFilter({ open: openFilter })}
                <svg
                    ref={svgRef}
                    className={cn(
                        'w-full border rounded-md',
                        openStats ? 'col-span-7' : openFilter ? 'col-span-8' : 'col-span-12',
                    )}
                    height="600"
                ></svg>
                {renderStats({ open: openStats, selectedNode })}
            </div>
        </div>
    )
}

export default GraphView
