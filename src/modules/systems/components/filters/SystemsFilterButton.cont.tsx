import { Filter } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'

import { useSystemsFilterSheet } from './hooks/useSystemsFilterSheet'

export type DisabledFields = {
    [key: string]: boolean
}

interface Props {
    tableId?: string
    enableQueryURL?: boolean
    panelSlide?: 'left' | 'right' // Legacy prop, now maps to side
    side?: 'top' | 'right' | 'bottom' | 'left' // New prop for sheet positioning
    disabledFields?: DisabledFields
}

export const SystemFilterButtonContainer = ({
    tableId = 'systems',
    enableQueryURL = true,
    disabledFields,
    panelSlide,
    side,
}: Props) => {
    const openFilterSheet = useSystemsFilterSheet()

    const { storeFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    const handleOpenFilters = () => {
        // Support both new 'side' prop and legacy 'panelSlide' prop
        const sheetSide = side || (panelSlide === 'left' ? 'left' : 'left') // Default to left as requested

        openFilterSheet({
            tableId,
            enableQueryURL,
            disabledFields,
            side: sheetSide,
        })
    }

    return (
        <Fragment>
            <Tooltip content={storeFilters.length > 0 ? 'Filters Applied' : 'Open Filters'}>
                <div>
                    <Button size="sm" variant="outline" onClick={handleOpenFilters}>
                        <Filter
                            className={`h-4 w-4 ${storeFilters.length > 0 ? 'fill-current' : ''}`}
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </Tooltip>
        </Fragment>
    )
}
