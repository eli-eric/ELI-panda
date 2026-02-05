import { Filter } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import { Fragment } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'

import { useCatalogueFilterSheet } from './hooks/useCatalogueFilterSheet'

interface CatalogueFilterButtonContainerProps {
    filterFormMethods: UseFormReturn<any, any, any>
    tableId?: string
    enableQueryURL?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const CatalogueFilterButtonContainer = ({
    filterFormMethods,
    tableId = 'catalogueItems',
    enableQueryURL = true,
    side = 'left',
}: CatalogueFilterButtonContainerProps) => {
    const openFilterSheet = useCatalogueFilterSheet()
    const [categoryQuery] = useQueryState('category', { history: 'push' })

    const { storeFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    const handleOpenFilters = () => {
        openFilterSheet({
            tableId,
            enableQueryURL,
            side,
            filterFormMethods,
        })
    }

    return (
        <Fragment>
            <Tooltip
                content={
                    storeFilters.length > 0 || categoryQuery ? 'Filters Applied' : 'Open Filters'
                }
            >
                <div>
                    <Button size="sm" variant="outline" onClick={handleOpenFilters}>
                        <Filter
                            className={`h-4 w-4 ${storeFilters.length > 0 || categoryQuery ? 'fill-current' : ''}`}
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </Tooltip>
        </Fragment>
    )
}
