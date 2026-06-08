import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/inputs'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { cn } from '@/lib/utils'
import useCatalogueFormFields from '@/modules/catalogueItem/components/form/CatalogueForm.fields'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { CategoryPropFilters } from '@/modules/shared/form/CategoryPropFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

interface CatalogueFilterFormProps {
    tableId: string
    catalogueCategoryProperties?: CatalogueItemDetail[]
}

export const CatalogueFilterForm = ({
    tableId,
    catalogueCategoryProperties,
}: CatalogueFilterFormProps) => {
    const fields = useCatalogueFormFields()
    const [categoryQuery, setCategoryQuery] = useQueryState('category', {
        history: 'push',
    })

    const { setFilter } = useFormFilterState({ tableId, enableQueryUrl: true })
    const { toggleDeleteCustom } = useFormControlStore()
    const { setValue } = useFormContext()

    // Sync category form state from URL on mount so the field reflects an active filter.
    // category is a user-editable URL param, so guard against malformed JSON.
    useEffect(() => {
        let parsed = null
        try {
            parsed = categoryQuery ? JSON.parse(categoryQuery) : null
        } catch {
            parsed = null
        }
        setValue('category', parsed)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cn('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
            <div className="flex flex-col gap-2">
                <Input
                    {...fields.name}
                    disabled={false}
                    onChange={setFilter(fields.name.name)}
                    isFilter={true}
                />
                <Input
                    {...fields.catalogueNumber}
                    disabled={false}
                    onChange={setFilter(fields.catalogueNumber.name)}
                    isFilter={true}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Input
                    {...fields.manufacturerUrl}
                    disabled={false}
                    onChange={setFilter(fields.manufacturerUrl.name)}
                    isFilter={true}
                />
                <Input
                    {...fields.supplier}
                    disabled={false}
                    onChange={setFilter(fields.supplier.name)}
                    isFilter={true}
                />
            </div>

            <ComboboxTree
                {...fields.category}
                disabled={false}
                customLabel="Category"
                className="col-span-2"
                onSelect={v => {
                    setCategoryQuery(v ? JSON.stringify(v) : null)
                    if (!v) {
                        toggleDeleteCustom()
                    }
                }}
                isFilter={true}
            />

            <Input
                {...fields.description}
                disabled={false}
                className="col-span-2"
                onChange={setFilter(fields.description.name)}
                isFilter={true}
            />
            <CategoryPropFilters
                tableId={tableId}
                catalogueCategoryProperties={catalogueCategoryProperties}
                enableQueryUrl={true}
            />
        </div>
    )
}
