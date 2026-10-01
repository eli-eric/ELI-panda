import { Filter } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'

import { usePublicationsFilterSheet } from './hooks/usePublicationsFilterSheet'

interface Props {
    tableId?: string
    enableQueryURL?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const PublicationsFilterButton = ({
    tableId = 'publications',
    enableQueryURL = true,
    side = 'left',
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const openFilterSheet = usePublicationsFilterSheet()

    const { storeFilters } = useFormFilterState({ tableId, enableQueryUrl: enableQueryURL })
    const hasFilters = storeFilters.length > 0

    return (
        <Tooltip
            content={fm({
                id: hasFilters
                    ? message.publicationsPage.filters.applied
                    : message.publicationsPage.filters.open,
            })}
        >
            <div>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openFilterSheet({ tableId, enableQueryURL, side })}
                    data-testid="publications-filter-button"
                >
                    <Filter
                        className={`h-4 w-4 ${hasFilters ? 'fill-current' : ''}`}
                        aria-hidden="true"
                    />
                </Button>
            </div>
        </Tooltip>
    )
}
