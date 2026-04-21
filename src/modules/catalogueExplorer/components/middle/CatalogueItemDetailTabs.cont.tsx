import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { CATALOGUE_ITEM_TABS, type CatalogueItemTab } from '../../types/constants'
import { CatalogueItemAttachmentsTab } from '../tabs/CatalogueItemAttachmentsTab.cont'
import type { CatalogueItemForDetail } from '../tabs/CatalogueItemDetailTab.cont'
import { CatalogueItemDetailTabContainer } from '../tabs/CatalogueItemDetailTab.cont'
import { CatalogueItemHistoryTab } from '../tabs/CatalogueItemHistoryTab.cont'
import { CatalogueItemOrdersTab } from '../tabs/CatalogueItemOrdersTab.cont'
import { CatalogueItemParametersTab } from '../tabs/CatalogueItemParametersTab.cont'
import { CatalogueItemRelatedItemsTab } from '../tabs/CatalogueItemRelatedItemsTab.cont'
import { CatalogueItemStatisticsTab } from '../tabs/CatalogueItemStatisticsTab.cont'

interface Props {
    item: CatalogueItemForDetail
}

export const CatalogueItemDetailTabs: FC<Props> = ({ item }) => {
    const { formatMessage: fm } = useIntl()
    const { activeTab, setActiveTab } = useCatalogueNavigation()
    const canEdit = !!usePermission([ROLE.CATALOGUE_EDIT])

    return (
        <Tabs
            value={activeTab as CatalogueItemTab}
            onValueChange={v => setActiveTab(v as CatalogueItemTab)}
            className="flex flex-col h-full min-h-0"
        >
            <TabsList className="mx-4 mt-2 w-fit">
                <TabsTrigger value={CATALOGUE_ITEM_TABS.DETAIL}>
                    {fm({ id: message.catalogue.tabs.detail })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_ITEM_TABS.PARAMETERS}>
                    {fm({ id: message.catalogue.tabs.parameters })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_ITEM_TABS.RELATED_ITEMS}>
                    {fm({ id: message.catalogue.tabs.relatedItems })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_ITEM_TABS.ORDERS}>
                    {fm({ id: message.catalogue.tabs.orders })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_ITEM_TABS.STATISTICS}>
                    {fm({ id: message.catalogue.tabs.statistics })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_ITEM_TABS.ATTACHMENTS}>
                    {fm({ id: message.catalogue.tabs.attachments })}
                </TabsTrigger>
                <TabsTrigger value={CATALOGUE_ITEM_TABS.HISTORY}>
                    {fm({ id: message.catalogue.tabs.history })}
                </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0">
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.DETAIL}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CatalogueItemDetailTabContainer item={item} canEdit={canEdit} />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.PARAMETERS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CatalogueItemParametersTab
                        itemUid={item.uid}
                        lastUpdateTime={item.lastUpdateTime ?? ''}
                        canEdit={canEdit}
                    />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.RELATED_ITEMS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CatalogueItemRelatedItemsTab />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.ORDERS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CatalogueItemOrdersTab />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.STATISTICS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CatalogueItemStatisticsTab />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.ATTACHMENTS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <CatalogueItemAttachmentsTab />
                </TabsContent>
                <TabsContent
                    value={CATALOGUE_ITEM_TABS.HISTORY}
                    className="h-full min-h-0 overflow-hidden"
                >
                    <CatalogueItemHistoryTab itemUid={item.uid} />
                </TabsContent>
            </div>
        </Tabs>
    )
}
