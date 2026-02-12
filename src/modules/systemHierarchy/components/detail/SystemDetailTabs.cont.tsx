import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { message } from '@/i18n/src/messages'

import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import type { HierarchyTab } from '../../types/constants'
import { HIERARCHY_TABS } from '../../types/constants'
import { hasPhysicalItem, hasSpareFor, hasSpareParts } from '../../utils/predicates'
import { AttachmentsTabContainer } from '../tabs/AttachmentsTab.cont'
import { DetailTabContainer } from '../tabs/DetailTab.cont'
import { HistoryTabContainer } from '../tabs/HistoryTab.cont'
import { PersonsTabContainer } from '../tabs/PersonsTab.cont'
import { PhysicalItemTabContainer } from '../tabs/PhysicalItemTab.cont'
import { SpareForTabContainer } from '../tabs/SpareForTab.cont'
import { SparePartsTabContainer } from '../tabs/SparePartsTab.cont'

interface SystemDetailTabsProps {
    system: SystemLeaf
}

export const SystemDetailTabsContainer: FC<SystemDetailTabsProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { activeTab, setActiveTab } = useHierarchyNavigation()

    const isTabHidden =
        (activeTab === HIERARCHY_TABS.PHYSICAL_ITEM && !hasPhysicalItem(system)) ||
        (activeTab === HIERARCHY_TABS.SPARE_PARTS && !hasSpareParts(system)) ||
        (activeTab === HIERARCHY_TABS.SPARE_FOR && !hasSpareFor(system))
    const effectiveTab = isTabHidden ? HIERARCHY_TABS.DETAIL : activeTab

    return (
        <Tabs
            value={effectiveTab}
            onValueChange={value => setActiveTab(value as HierarchyTab)}
            className="flex flex-col h-full"
        >
            <TabsList className="mx-4 mt-2 w-fit">
                <TabsTrigger value={HIERARCHY_TABS.DETAIL}>
                    {fm({ id: message.systemHierarchy.tabs.detail })}
                </TabsTrigger>
                <TabsTrigger value={HIERARCHY_TABS.PERSONS}>
                    {fm({ id: message.systemHierarchy.tabs.persons })}
                </TabsTrigger>
                {hasPhysicalItem(system) && (
                    <TabsTrigger value={HIERARCHY_TABS.PHYSICAL_ITEM}>
                        {fm({ id: message.systemHierarchy.tabs.physicalItem })}
                    </TabsTrigger>
                )}
                {hasSpareParts(system) && (
                    <TabsTrigger value={HIERARCHY_TABS.SPARE_PARTS}>
                        {fm({ id: message.systemHierarchy.tabs.spareParts })}
                    </TabsTrigger>
                )}
                {hasSpareFor(system) && (
                    <TabsTrigger value={HIERARCHY_TABS.SPARE_FOR}>
                        {fm({ id: message.systemHierarchy.tabs.spareFor })}
                    </TabsTrigger>
                )}
                <TabsTrigger value={HIERARCHY_TABS.ATTACHMENTS}>
                    {fm({ id: message.systemHierarchy.tabs.attachments })}
                </TabsTrigger>
                <TabsTrigger value={HIERARCHY_TABS.HISTORY}>
                    {fm({ id: message.systemHierarchy.tabs.history })}
                </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-y-auto scrollbar-style">
                <TabsContent value={HIERARCHY_TABS.DETAIL}>
                    <DetailTabContainer system={system} />
                </TabsContent>
                <TabsContent value={HIERARCHY_TABS.PERSONS}>
                    <PersonsTabContainer system={system} />
                </TabsContent>
                {hasPhysicalItem(system) && (
                    <TabsContent value={HIERARCHY_TABS.PHYSICAL_ITEM}>
                        <PhysicalItemTabContainer system={system} />
                    </TabsContent>
                )}
                {hasSpareParts(system) && (
                    <TabsContent value={HIERARCHY_TABS.SPARE_PARTS}>
                        <SparePartsTabContainer system={system} />
                    </TabsContent>
                )}
                {hasSpareFor(system) && (
                    <TabsContent value={HIERARCHY_TABS.SPARE_FOR}>
                        <SpareForTabContainer system={system} />
                    </TabsContent>
                )}
                <TabsContent value={HIERARCHY_TABS.ATTACHMENTS}>
                    <AttachmentsTabContainer system={system} />
                </TabsContent>
                <TabsContent value={HIERARCHY_TABS.HISTORY}>
                    <HistoryTabContainer system={system} />
                </TabsContent>
            </div>
        </Tabs>
    )
}
