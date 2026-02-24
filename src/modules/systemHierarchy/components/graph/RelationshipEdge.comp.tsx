import {
    BaseEdge,
    EdgeLabelRenderer,
    type EdgeProps,
    getBezierPath,
} from '@xyflow/react'
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
    markerEnd,
}: EdgeProps) => {
    const { label } = (data ?? {}) as RelationshipEdgeData

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
            <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
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
