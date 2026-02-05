import type { Header } from '@tanstack/react-table'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface TableSkeletonRowsProps {
    headers: Header<any, unknown>[]
    rowCount: number
}

/**
 * Renders skeleton loading rows for PandaTableV2
 * Uses valid HTML structure (tr/td) and the design system Skeleton component
 */
export const TableSkeletonRows = ({ headers, rowCount }: TableSkeletonRowsProps) => {
    return (
        <>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr
                    key={`skeleton-row-${rowIndex}`}
                    className={cn(
                        'flex w-full border-b border-border',
                        rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50',
                    )}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${rowIndex * 49}px)`, // Match estimateSize from virtualizer
                    }}
                >
                    {headers.map((header, colIndex) => {
                        const width = header.column.getSize()

                        // Determine skeleton type based on column width
                        const isNarrowColumn = width && width < 80
                        const isMediumColumn = width && width >= 80 && width < 150
                        const isWideColumn = width && width >= 150

                        return (
                            <td
                                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                                className="p-2 px-4 flex items-center"
                                style={{
                                    width: width ? `${width}px` : 'auto',
                                    minWidth: width ? `${width}px` : '50px',
                                    flex: width ? undefined : '1 1 0%',
                                }}
                            >
                                {/* Skeleton shape based on column width */}
                                {isNarrowColumn ? (
                                    // Narrow columns (< 80px) - checkbox/icon-like
                                    <Skeleton className="h-5 w-5" />
                                ) : isMediumColumn ? (
                                    // Medium columns (80-150px) - badge/status-like
                                    <Skeleton className="h-6 w-20 rounded-full mx-auto" />
                                ) : isWideColumn ? (
                                    // Wide columns (> 150px) - text content
                                    <Skeleton
                                        className="h-5"
                                        style={{
                                            width: `${Math.min(width * 0.7, width - 40)}px`,
                                        }}
                                    />
                                ) : (
                                    // Flexible columns (no fixed width) - text content
                                    <Skeleton
                                        className="h-5"
                                        style={{ width: colIndex % 3 === 0 ? '70%' : '85%' }}
                                    />
                                )}
                            </td>
                        )
                    })}
                </tr>
            ))}
        </>
    )
}
