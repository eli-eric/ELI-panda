import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { useCatalogueCategoryDetail } from '../../hooks/queries/useCatalogueCategoryDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import type { CatalogueCategoryProperty } from '../../types'
import { CategoryDetailHeader } from './CategoryDetailHeader.comp'
import { CategoryDetailTabs } from './CategoryDetailTabs.cont'

const toCatalogueProperty = (p: {
    uid?: string
    name: string
    type?: { uid?: string; name?: string } | null
    unit?: { uid?: string; name?: string } | null
    defaultValue?: string | null
    listOfValues?: string[]
    order?: number | null
}): CatalogueCategoryProperty => ({
    uid: p.uid ?? '',
    name: p.name,
    type: p.type?.uid ? { uid: p.type.uid, name: p.type.name ?? '' } : null,
    unit: p.unit?.uid ? { uid: p.unit.uid, name: p.unit.name ?? '' } : null,
    defaultValue: p.defaultValue,
    listOfValues: p.listOfValues,
    order: p.order ?? null,
})

export const CategoryDetailViewContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedCategoryUid, backToTable } = useCatalogueNavigation()
    const { category, isLoading, error } = useCatalogueCategoryDetail(selectedCategoryUid)

    if (isLoading) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.catalogue.detail.loadingCategory })}
            </div>
        )
    }
    if (error || !category) {
        return (
            <div className="p-4 text-sm text-destructive">
                {fm({ id: message.catalogue.detail.categoryNotFound })}
            </div>
        )
    }

    const propertyGroups = category.groups.map(g => ({
        uid: g.uid ?? '',
        name: g.name,
        order: (g as { order?: number | null }).order ?? null,
        properties: g.properties.map(toCatalogueProperty),
    }))

    const physicalItemProperties = category.physicalItemProperties.map(toCatalogueProperty)

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <CategoryDetailHeader name={category.name} code={category.code} onBack={backToTable} />
            <CategoryDetailTabs
                category={category}
                propertyGroups={propertyGroups}
                physicalItemProperties={physicalItemProperties}
            />
        </div>
    )
}
