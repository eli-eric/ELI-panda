import type { FC } from 'react'

import { useCatalogueCategoryDetail } from '../../hooks/queries/useCatalogueCategoryDetail'
import { useCatalogueItemDetail } from '../../hooks/queries/useCatalogueItemDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CATALOGUE_ITEM_TABS } from '../../types/constants'
import { CategorySidebar } from './CategorySidebar.comp'
import { ItemSidebar } from './ItemSidebar.comp'

export const CatalogueQuickInfoSidebar: FC = () => {
    const { selectedItemUid, selectedCategoryUid, selectCategory, setActiveTab } =
        useCatalogueNavigation()

    const { item } = useCatalogueItemDetail(selectedItemUid)
    const { category } = useCatalogueCategoryDetail(selectedItemUid ? null : selectedCategoryUid)

    if (selectedItemUid && item) {
        return (
            <ItemSidebar
                item={{
                    uid: item.uid,
                    name: item.name,
                    modifiedAt: item.lastUpdateTime,
                    modifiedBy: item.lastUpdateBy ? { fullName: item.lastUpdateBy } : null,
                    catalogueCategory: item.catalogueCategory,
                    physicalItemsCount: item.physicalItemsCount,
                    ordersCount: 0,
                    relatedItemsCount: item.relatedItemsCount,
                }}
                onSelectCategory={selectCategory}
                onViewRelated={() => setActiveTab(CATALOGUE_ITEM_TABS.RELATED_ITEMS)}
            />
        )
    }

    if (selectedCategoryUid && category) {
        return (
            <CategorySidebar
                category={{
                    uid: category.uid,
                    name: category.name,
                    code: category.code,
                    systemType: category.systemType,
                    parentPath: category.parentPath,
                    itemsCount: category.catalogueItemsBelongsToCategoryAggregate?.count,
                    subCategoriesCount: category.hasSubcategoryCatalogueCategoriesAggregate?.count,
                }}
                onSelectCategory={selectCategory}
            />
        )
    }

    return (
        <div className="p-4 text-xs text-muted-foreground">
            Select a category or item to see details.
        </div>
    )
}
