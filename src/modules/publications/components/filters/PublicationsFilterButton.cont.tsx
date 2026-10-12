import { Filter } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'

import { usePublicationsFilterSheet } from './hooks/usePublicationsFilterSheet'

const { filters } = message.publication

interface Props {
    tableId?: string
    enableQueryURL?: boolean
}

export const PublicationsFilterButton = ({
    tableId = 'publications',
    enableQueryURL = true,
}: Props) => {
    const { formatMessage: fm } = useIntl()
    const openFilterSheet = usePublicationsFilterSheet()
    const { storeFilters } = useFormFilterState({ tableId, enableQueryUrl: enableQueryURL })
    const hasFilters = storeFilters.length > 0

    return (
        <Tooltip content={fm({ id: hasFilters ? filters.filtersApplied : filters.openFilters })}>
            <div>
                <Button
                    size="sm"
                    variant="outline"
                    data-testid="publications-filter-button"
                    onClick={() => openFilterSheet({ tableId, enableQueryURL, side: 'left' })}
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
