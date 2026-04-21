import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import type { CatalogueCategoryProperty, CatalogueCategoryPropertyGroup } from '../../types'
import { CATALOGUE_CATEGORY_TABS, type CatalogueCategoryTab } from '../../types/constants'
import type { CatalogueCategoryForDetail } from '../tabs/CategoryDetailTab.cont'
import { CategoryDetailTabContainer } from '../tabs/CategoryDetailTab.cont'
import { CategoryHistoryTab } from '../tabs/CategoryHistoryTab.cont'
import { CategoryPhysicalItemPropertiesTab } from '../tabs/CategoryPhysicalItemPropertiesTab.cont'
import { CategoryPropertyGroupsTab } from '../tabs/CategoryPropertyGroupsTab.cont'

interface Props {
    category: CatalogueCategoryForDetail
    propertyGroups: CatalogueCategoryPropertyGroup[]
    physicalItemProperties: CatalogueCategoryProperty[]
}

export const CategoryDetailTabs: FC<Props> = ({
    category,
    propertyGroups,
    physicalItemProperties,
}) => {
    const { formatMessage: fm } = useIntl()
    const { activeTab, setActiveTab } = useCatalogueNavigation()
    const canEdit = !!usePermission([ROLE.CATALOGUE_CATEGORY_EDIT])

    return (
        <Tabs
            value={activeTab as CatalogueCategoryTab}
            onValueChange={v => setActiveTab(v as CatalogueCategoryTab)}
            className="flex flex-col h-full min-h-0"
        >
            <TabsList className="mx-4 mt-2 w-fit">
                <TabsTrigger value={CATALOGUE_CATEGORY_TABS.DETAIL}>
                    {fm({ id: message.catalogue.tabs.detail })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_CATEGORY_TABS.PROPERTY_GROUPS}>
                    {fm({ id: message.catalogue.tabs.propertyGroups })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_CATEGORY_TABS.PHYSICAL_ITEM_PROPERTIES}>
                    {fm({ id: message.catalogue.tabs.physicalItemProperties })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_CATEGORY_TABS.HISTORY}>
                    {fm({ id: message.catalogue.tabs.history })}
                </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0">
                <TabsContent
                    value={CATALOGUE_CATEGORY_TABS.DETAIL}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CategoryDetailTabContainer category={category} canEdit={canEdit} />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_CATEGORY_TABS.PROPERTY_GROUPS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CategoryPropertyGroupsTab groups={propertyGroups} />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_CATEGORY_TABS.PHYSICAL_ITEM_PROPERTIES}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CategoryPhysicalItemPropertiesTab properties={physicalItemProperties} />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_CATEGORY_TABS.HISTORY}
                    className="h-full min-h-0 overflow-hidden"
                >
                    <CategoryHistoryTab categoryUid={category.uid} />
                </TabsContent>
            </div>
        </Tabs>
    )
}
