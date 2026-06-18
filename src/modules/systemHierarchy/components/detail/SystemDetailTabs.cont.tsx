import type { LucideIcon } from 'lucide-react'
import { History, Info, Package, Paperclip, Replace, Share2, Users, Workflow, Wrench } from 'lucide-react'
import type { CSSProperties, FC } from 'react'
import { useIntl } from 'react-intl'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIsLargeScreen } from '@/hooks/use-large-screen'
import { message } from '@/i18n/src/messages'

import { useSystemRelationships } from '../../hooks/queries/useSystemRelationships'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import type { SystemLeaf } from '../../types'
import type { HierarchyTab } from '../../types/constants'
import { HIERARCHY_TABS } from '../../types/constants'
import { hasPhysicalItem, hasSpareFor, hasSpareParts } from '../../utils/predicates'
import { AttachmentsTabContainer } from '../tabs/AttachmentsTab.cont'
import { DetailTabContainer } from '../tabs/DetailTab.cont'
import { GraphTabContainer } from '../tabs/GraphTab.cont'
import { HistoryTabContainer } from '../tabs/HistoryTab.cont'
import { PersonsTabContainer } from '../tabs/PersonsTab.cont'
import { PhysicalItemTabContainer } from '../tabs/PhysicalItemTab.cont'
import { RelationshipsTabContainer } from '../tabs/RelationshipsTab.cont'
import { SpareForTabContainer } from '../tabs/SpareForTab.cont'
import { SparePartsTabContainer } from '../tabs/SparePartsTab.cont'

const HIERARCHY_TAB_META: Record<HierarchyTab, { icon: LucideIcon; color: string }> = {
    [HIERARCHY_TABS.DETAIL]: { icon: Info, color: 'var(--chart-3)' },
    [HIERARCHY_TABS.PERSONS]: { icon: Users, color: 'var(--chart-2)' },
    [HIERARCHY_TABS.PHYSICAL_ITEM]: { icon: Package, color: 'var(--chart-1)' },
    [HIERARCHY_TABS.SPARE_PARTS]: { icon: Wrench, color: 'var(--chart-5)' },
    [HIERARCHY_TABS.SPARE_FOR]: { icon: Replace, color: 'var(--chart-4)' },
    [HIERARCHY_TABS.RELATIONSHIPS]: { icon: Share2, color: 'var(--chart-3)' },
    [HIERARCHY_TABS.ATTACHMENTS]: { icon: Paperclip, color: 'var(--chart-4)' },
    [HIERARCHY_TABS.HISTORY]: { icon: History, color: 'var(--muted-foreground)' },
    [HIERARCHY_TABS.GRAPH]: { icon: Workflow, color: 'var(--chart-2)' },
}

interface HierarchyTabTriggerProps {
    value: HierarchyTab
    label: string
}

const HierarchyTabTrigger: FC<HierarchyTabTriggerProps> = ({ value, label }) => {
    const { icon: Icon, color } = HIERARCHY_TAB_META[value]
    return (
        <TabsTrigger
            value={value}
            data-testid={`system-hierarchy-tab-${value}`}
            title={label}
            style={{ '--tab-color': color } as CSSProperties}
            className="group data-[state=active]:bg-[var(--tab-color)]/10 data-[state=active]:text-[var(--tab-color)] dark:data-[state=active]:bg-[var(--tab-color)]/15 dark:data-[state=active]:text-[var(--tab-color)]"
        >
            <Icon className="size-4 text-[var(--tab-color)] opacity-60 group-data-[state=active]:opacity-100" />
            <span className="hidden md:inline">{label}</span>
        </TabsTrigger>
    )
}

interface SystemDetailTabsProps {
    system: SystemLeaf
}

export const SystemDetailTabsContainer: FC<SystemDetailTabsProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { activeTab, setActiveTab } = useHierarchyNavigation()
    const { hasRelationships, isError: relationshipsError } = useSystemRelationships(system.uid)
    const isLargeScreen = useIsLargeScreen()

    // Relationships live in the right sidebar at lg+; fall back to a tab when sidebar is hidden.
    // Keep tab visible on transient errors so user can retry instead of tab vanishing.
    const showRelationshipsTab = (hasRelationships || relationshipsError) && !isLargeScreen

    const isTabHidden =
        (activeTab === HIERARCHY_TABS.PHYSICAL_ITEM && !hasPhysicalItem(system)) ||
        (activeTab === HIERARCHY_TABS.SPARE_PARTS && !hasSpareParts(system)) ||
        (activeTab === HIERARCHY_TABS.SPARE_FOR && !hasSpareFor(system)) ||
        (activeTab === HIERARCHY_TABS.RELATIONSHIPS && !showRelationshipsTab)
    const effectiveTab = isTabHidden ? HIERARCHY_TABS.DETAIL : activeTab

    return (
        <Tabs
            value={effectiveTab}
            onValueChange={value => setActiveTab(value as HierarchyTab)}
            className="flex flex-col h-full min-h-0"
        >
            <TabsList className="mx-4 mt-2 w-fit">
                <HierarchyTabTrigger
                    value={HIERARCHY_TABS.DETAIL}
                    label={fm({ id: message.systemHierarchy.tabs.detail })}
                />
                <HierarchyTabTrigger
                    value={HIERARCHY_TABS.PERSONS}
                    label={fm({ id: message.systemHierarchy.tabs.persons })}
                />
                {hasPhysicalItem(system) && (
                    <HierarchyTabTrigger
                        value={HIERARCHY_TABS.PHYSICAL_ITEM}
                        label={fm({ id: message.systemHierarchy.tabs.physicalItem })}
                    />
                )}
                {hasSpareParts(system) && (
                    <HierarchyTabTrigger
                        value={HIERARCHY_TABS.SPARE_PARTS}
                        label={fm({ id: message.systemHierarchy.tabs.spareParts })}
                    />
                )}
                {hasSpareFor(system) && (
                    <HierarchyTabTrigger
                        value={HIERARCHY_TABS.SPARE_FOR}
                        label={fm({ id: message.systemHierarchy.tabs.spareFor })}
                    />
                )}
                {showRelationshipsTab && (
                    <HierarchyTabTrigger
                        value={HIERARCHY_TABS.RELATIONSHIPS}
                        label={fm({ id: message.systemHierarchy.tabs.relationships })}
                    />
                )}
                <HierarchyTabTrigger
                    value={HIERARCHY_TABS.ATTACHMENTS}
                    label={fm({ id: message.systemHierarchy.tabs.attachments })}
                />
                <HierarchyTabTrigger
                    value={HIERARCHY_TABS.HISTORY}
                    label={fm({ id: message.systemHierarchy.tabs.history })}
                />
                <HierarchyTabTrigger
                    value={HIERARCHY_TABS.GRAPH}
                    label={fm({ id: message.systemHierarchy.tabs.graph })}
                />
            </TabsList>
            <div className="flex-1 min-h-0">
                <TabsContent
                    value={HIERARCHY_TABS.DETAIL}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <DetailTabContainer system={system} />
                </TabsContent>
                <TabsContent
                    value={HIERARCHY_TABS.PERSONS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <PersonsTabContainer system={system} />
                </TabsContent>
                {hasPhysicalItem(system) && (
                    <TabsContent
                        value={HIERARCHY_TABS.PHYSICAL_ITEM}
                        className="h-full min-h-0 overflow-y-auto scrollbar-style"
                    >
                        <PhysicalItemTabContainer system={system} />
                    </TabsContent>
                )}
                {hasSpareParts(system) && (
                    <TabsContent
                        value={HIERARCHY_TABS.SPARE_PARTS}
                        className="h-full min-h-0 overflow-y-auto scrollbar-style"
                    >
                        <SparePartsTabContainer system={system} />
                    </TabsContent>
                )}
                {hasSpareFor(system) && (
                    <TabsContent
                        value={HIERARCHY_TABS.SPARE_FOR}
                        className="h-full min-h-0 overflow-y-auto scrollbar-style"
                    >
                        <SpareForTabContainer system={system} />
                    </TabsContent>
                )}
                {showRelationshipsTab && (
                    <TabsContent
                        value={HIERARCHY_TABS.RELATIONSHIPS}
                        className="h-full min-h-0 overflow-y-auto scrollbar-style"
                    >
                        <RelationshipsTabContainer system={system} />
                    </TabsContent>
                )}
                <TabsContent
                    value={HIERARCHY_TABS.ATTACHMENTS}
                    className="h-full min-h-0 overflow-y-auto scrollbar-style"
                >
                    <AttachmentsTabContainer system={system} />
                </TabsContent>
                <TabsContent
                    value={HIERARCHY_TABS.HISTORY}
                    className="h-full min-h-0 overflow-hidden"
                >
                    <HistoryTabContainer system={system} />
                </TabsContent>
                <TabsContent
                    value={HIERARCHY_TABS.GRAPH}
                    className="h-full min-h-0 overflow-hidden"
                >
                    <GraphTabContainer system={system} />
                </TabsContent>
            </div>
        </Tabs>
    )
}
