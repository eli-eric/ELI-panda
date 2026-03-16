import {
    BaseEdge,
    EdgeLabelRenderer,
    type EdgeProps,
    getBezierPath,
} from '@xyflow/react'
import type { CSSProperties } from 'react'
import { memo } from 'react'

interface RelationshipEdgeData {
    label: string
    relationship: string
    description?: string | null
    [key: string]: unknown
}

const RelationshipEdgeComponent = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    style,
}: EdgeProps) => {
    const { label } = (data ?? {}) as RelationshipEdgeData
    const strokeColor = (style as CSSProperties)?.stroke ?? '#94a3b8'
    const markerId = `arrow-${id}`

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    })

    return (
        <>
            <defs>
                <marker
                    id={markerId}
                    markerWidth="12"
                    markerHeight="12"
                    viewBox="-10 -10 20 20"
                    markerUnits="strokeWidth"
                    orient="auto-start-reverse"
                    refX="0"
                    refY="0"
                >
                    <polyline
                        points="-5,-4 0,0 -5,4 -5,-4"
                        fill={String(strokeColor)}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </marker>
            </defs>
            <BaseEdge
                id={id}
                path={edgePath}
                style={style}
                markerEnd={`url(#${markerId})`}
            />
            {label && (
                <EdgeLabelRenderer>
                    <div
                        className="absolute bg-background border border-border rounded px-1.5 py-0.5 text-[10px] font-medium pointer-events-all"
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        }}
                        data-testid="edge-label"
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    )
}

export const RelationshipEdge = memo(RelationshipEdgeComponent)
