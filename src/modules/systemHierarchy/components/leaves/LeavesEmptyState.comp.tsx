import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

interface LeavesEmptyStateProps {
    directOnly: boolean
    hasNarrowedQuery: boolean
    onShowAllLevels: () => void
    onClearFilters: () => void
}

/**
 * Two independent things can empty the table — the direct-only scope and the
 * search/filter set — and they can be true at the same time. Naming only one of them
 * would state something false ("no end systems directly under this system" when there
 * are some, just none matching the filter) and offer a way out that leaves the user
 * in a second empty state. So the message names whichever combination applies and
 * every applicable escape is offered at once.
 */
export const LeavesEmptyState: FC<LeavesEmptyStateProps> = ({
    directOnly,
    hasNarrowedQuery,
    onShowAllLevels,
    onClearFilters,
}) => {
    const { formatMessage: fm } = useIntl()

    const messageId = directOnly
        ? hasNarrowedQuery
            ? message.systemHierarchy.leaves.noDirectLeavesMatching
            : message.systemHierarchy.leaves.noDirectLeaves
        : message.systemHierarchy.leaves.noLeaves

    return (
        <div
            className="flex items-center justify-center py-12 text-muted-foreground text-sm"
            data-testid="leaves-empty-state"
        >
            <div className="text-center">
                <p>{fm({ id: messageId })}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                    {directOnly && (
                        <Button
                            variant="link"
                            size="sm"
                            onClick={onShowAllLevels}
                            data-testid="leaves-show-all-levels"
                        >
                            {fm({ id: message.systemHierarchy.leaves.showAllLevels })}
                        </Button>
                    )}
                    {hasNarrowedQuery && (
                        <Button
                            variant="link"
                            size="sm"
                            onClick={onClearFilters}
                            data-testid="leaves-clear-filters"
                        >
                            {fm({ id: message.common.ui.clearFilters })}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
