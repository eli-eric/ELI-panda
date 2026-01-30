import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'

interface SystemsFilterFooterProps {
    tableId: string
    enableQueryURL: boolean
    resetForm: UseFormReset<any>
    defaultFormValues: any
}

export const SystemsFilterFooter = ({
    tableId,
    enableQueryURL,
    resetForm,
    defaultFormValues,
}: SystemsFilterFooterProps) => {
    const { formatMessage: fm } = useIntl()
    const { setColumnFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    const handleClearFilters = () => {
        resetForm(defaultFormValues, { keepValues: false })
        setColumnFilters([])
    }

    return (
        <div className="flex flex-col gap-4 pt-4 border-t">
            <FilterSaveSettings
                tableId={tableId}
                enableQueryURL={enableQueryURL}
                resetForm={resetForm}
                defaultFormValues={defaultFormValues}
            />
            <Button type="button" className="w-full justify-center" onClick={handleClearFilters}>
                {fm({ id: message.common.ui.clearFilters })}
            </Button>
        </div>
    )
}
