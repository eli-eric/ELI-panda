import type { Row } from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { highlightText } from '@/utils'

type ExpandableRow = { uid: string; isExpandable?: boolean }

interface ExpandableNameCellProps<T extends ExpandableRow> {
    row: Row<T>
    filterName?: string
    fetchChildren?: (uid: string) => void
    getValue: () => string
}

export const ExpandableNameCell = <T extends ExpandableRow>({
    row,
    filterName,
    fetchChildren,
    getValue,
}: ExpandableNameCellProps<T>) => {
    const { formatMessage: fm } = useIntl()
    const isExpandable = row.original.isExpandable || row.getCanExpand()

    // Expansion is triggered only by the chevron; clicking the name/row bubbles
    // up to the row's onClick so the whole row is a clear selection target.
    const handleToggle = (e: MouseEvent) => {
        e.stopPropagation()
        fetchChildren && fetchChildren(row.original.uid)
        row.toggleExpanded()
    }

    return (
        <div
            style={{
                paddingLeft: `${row.depth * 2}rem`,
            }}
            className={cn('my-1 flex items-center')}
        >
            {isExpandable ? (
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={handleToggle}
                        aria-expanded={row.getIsExpanded()}
                        aria-label={fm({
                            id: row.getIsExpanded()
                                ? message.common.ui.collapse
                                : message.common.ui.expand,
                        })}
                        className="cursor-pointer rounded-sm p-0.5 hover:bg-accent hover:text-gray-400"
                    >
                        {row.getIsExpanded() ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>

                    <span className="ml-2">{highlightText(getValue(), filterName)}</span>
                </div>
            ) : (
                <span className="ml-2">{highlightText(getValue(), filterName)}</span>
            )}
        </div>
    )
}
