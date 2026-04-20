import { useEffect, useMemo } from 'react'

import { Form } from '@/components/form/Form'
import { useFormFilter } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import type { CodebookType } from '@/types/responses/codebook'

import { useMinMaxPrice } from '../../../systems/hooks/useMinMaxPrice'
import { LeavesFilterForm } from './form/LeavesFilter.form'
import { LeavesFilterFooter } from './LeavesFilterFooter.comp'

type LeavesFilterType = {
    name: string
    systemLevel: string[]
    systemCode: string
    systemType: CodebookType | null
    zone: CodebookType | null
    location: CodebookType | null
    responsible: CodebookType | null
    description: string
    importance: CodebookType | null
    itemUsage: string[]
    eun: string
    serialNumber: string
    catalogueName: string
    catalogueNumber: string
    category: CodebookType | null
    catalogueDescription: string
    supplier: CodebookType | null
    price: [number | undefined, number | undefined]
}

interface LeavesFilterSheetProps {
    tableId: string
    enableQueryURL: boolean
}

export const LeavesFilterSheet = ({ tableId, enableQueryURL }: LeavesFilterSheetProps) => {
    const { minMaxPrice } = useMinMaxPrice()

    const defaultValues = useMemo<LeavesFilterType>(
        () => ({
            name: '',
            systemLevel: [],
            systemCode: '',
            systemType: null,
            zone: null,
            location: null,
            responsible: null,
            description: '',
            importance: null,
            itemUsage: [],
            eun: '',
            serialNumber: '',
            catalogueName: '',
            catalogueNumber: '',
            category: null,
            catalogueDescription: '',
            supplier: null,
            price: [minMaxPrice?.min, minMaxPrice?.max],
        }),
        [minMaxPrice],
    )

    const formMethods = useFormFilter<LeavesFilterType>({
        tableId,
        defValues: defaultValues,
        enableQueryURL,
    })

    const { toggleDeleteCustom } = useFormControlStore()
    const { watch } = formMethods

    const category = watch('category')

    useEffect(() => {
        if (!category) {
            toggleDeleteCustom()
        }
    }, [category, toggleDeleteCustom])

    return (
        <Form className="flex flex-col h-full justify-between" formMethods={formMethods}>
            <LeavesFilterForm tableId={tableId} enableQueryUrl={enableQueryURL} />
            <LeavesFilterFooter
                tableId={tableId}
                enableQueryURL={enableQueryURL}
                resetForm={formMethods.reset}
                defaultFormValues={defaultValues}
            />
        </Form>
    )
}
