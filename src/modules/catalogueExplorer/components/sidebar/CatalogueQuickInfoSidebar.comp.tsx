import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useCatalogueItem } from '@/modules/catalogueItem/hooks/useItem'

import { useCatalogueCategoryDetail } from '../../hooks/queries/useCatalogueCategoryDetail'
import { useCatalogueItemDetail } from '../../hooks/queries/useCatalogueItemDetail'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CATALOGUE_ITEM_TABS } from '../../types/constants'
import { CategorySidebar } from './CategorySidebar.comp'
import { ItemSidebar } from './ItemSidebar.comp'

export const CatalogueQuickInfoSidebar: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { selectedItemUid, selectedCategoryUid, selectCategory, setActiveTab } =
        useCatalogueNavigation()

    const { item } = useCatalogueItemDetail(selectedItemUid)
    const { item: restItem } = useCatalogueItem(selectedItemUid ?? undefined)
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
                    details: restItem?.details,
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
            {fm({ id: message.catalogue.sidebar.emptyHint })}
        </div>
    )
}
