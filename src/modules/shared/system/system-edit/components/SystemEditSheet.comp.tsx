import { formatDistanceToNow } from 'date-fns'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { useIntl } from 'react-intl'

import { Disclosure } from '@/components/ui'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import {
    SystemEditRestrictionBanner,
    useSystemEditPermission,
} from '@/modules/shared/system/edit-permission'
import type { SystemDetail } from '@/modules/shared/system/system-detail'
import {
    CataloguePropertiesSection,
    PhysicalItemFields,
    PhysicalItemOrdersSection,
    SpareRelationsSection,
    SubsystemsSection,
    SystemBreadcrumbs,
    SystemClassificationFields,
    SystemDescriptionField,
    SystemHistoryFeed,
    SystemImagePanel,
    SystemPeopleFields,
    SystemTitleField,
    useSystemHistory,
} from '@/modules/shared/system/system-detail'
import { getSystemHierarchyDetailPath } from '@/modules/systemHierarchy/utils/hierarchyLinks'
import { getBadgeVariantBySystemLevel } from '@/utils/systemLevel'

import {
    type SystemEditSectionId,
    useSystemEditSectionsStore,
} from '../store/useSystemEditSectionsStore'

const sheetMessages = message.systemHierarchy.sheet

interface SheetSectionProps {
    id: SystemEditSectionId
    title: ReactNode
    children: ReactNode
    defaultOpen?: boolean
    accentClassName?: string
    testId?: string
}

// One collapsible quick-edit block; editing sections start open, long lists collapsed,
// unless the user toggled the section before (remembered per browser).
const SheetSection: FC<SheetSectionProps> = ({
    id,
    title,
    children,
    defaultOpen = true,
    accentClassName,
    testId,
}) => {
    const storedOpen = useSystemEditSectionsStore(state => state.openSections[id])
    const setSectionOpen = useSystemEditSectionsStore(state => state.setSectionOpen)

    return (
        <div data-testid={testId}>
            <Disclosure
                title={title}
                defaultOpen={storedOpen ?? defaultOpen}
                onChange={open => setSectionOpen(id, open)}
                className="w-full overflow-hidden rounded-md border shadow-sm"
                buttonClassName={cn('rounded-none border-0 py-2 font-medium', accentClassName)}
                panelClassName="space-y-1 px-3 py-3"
            >
                {children}
            </Disclosure>
        </div>
    )
}

const SystemActivity: FC<{ uid: string }> = ({ uid }) => {
    const { data } = useSystemHistory(uid)
    return <SystemHistoryFeed history={data} />
}

interface SystemEditSheetProps {
    system: SystemDetail
    onSelectSystem: (uid: string) => void
    onClose?: () => void
}

/**
 * Quick edit: one column of collapsible sections. Every field saves inline (PATCH) —
 * no Save button. Editable sections start open; lists and history start collapsed.
 */
export const SystemEditSheet: FC<SystemEditSheetProps> = ({ system, onSelectSystem, onClose }) => {
    const { formatMessage: fm } = useIntl()
    const editPermission = useSystemEditPermission(system.uid)
    const { physicalItem, statistics } = system

    return (
        <div className="flex flex-col gap-3 pb-6" data-testid="system-edit-sheet">
            <div className="space-y-1">
                <SystemBreadcrumbs
                    parentPath={system.parentPath}
                    currentName={system.name}
                    currentCode={system.systemCode}
                    onSelectAncestor={onSelectSystem}
                />
                <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                        <SystemTitleField system={system} />
                    </div>
                    <Link
                        href={getSystemHierarchyDetailPath(system.uid)}
                        onClick={onClose}
                        className="mt-1.5 inline-flex shrink-0 items-center gap-1 text-xs text-primary hover:underline"
                    >
                        <ExternalLink className="size-3.5" />
                        {fm({ id: sheetMessages.openInExplorer })}
                    </Link>
                </div>
                {system.lastUpdateTime && (
                    <p className="text-xs text-muted-foreground" title={system.lastUpdateTime}>
                        {fm(
                            { id: sheetMessages.updated },
                            {
                                time: formatDistanceToNow(new Date(system.lastUpdateTime), {
                                    addSuffix: true,
                                }),
                            },
                        )}
                    </p>
                )}
            </div>

            <SystemEditRestrictionBanner
                status={editPermission.status}
                responsibles={editPermission.responsibles}
                refetch={editPermission.refetch}
            />

            <SystemImagePanel systemUid={system.uid} systemName={system.name} />

            <SheetSection
                id="details"
                title={fm({ id: sheetMessages.details })}
                accentClassName={getBadgeVariantBySystemLevel(system.systemLevel ?? undefined)}
                testId="system-edit-details"
            >
                <SystemClassificationFields system={system} />
                <SystemDescriptionField system={system} />
            </SheetSection>

            <SheetSection
                id="people"
                title={fm({ id: sheetMessages.people })}
                testId="system-edit-people"
            >
                <SystemPeopleFields system={system} />
            </SheetSection>

            {physicalItem && (
                <>
                    <SheetSection
                        id="physicalItem"
                        title={fm({ id: sheetMessages.physicalItem })}
                        accentClassName="bg-amber-100 text-gray-900 dark:bg-amber-600/40 dark:text-gray-100"
                        testId="system-edit-physical-item"
                    >
                        <PhysicalItemFields systemUid={system.uid} physicalItem={physicalItem} />
                    </SheetSection>
                    <SheetSection
                        id="properties"
                        title={fm({ id: sheetMessages.properties })}
                        defaultOpen={false}
                    >
                        <CataloguePropertiesSection physicalItemUid={physicalItem.uid} />
                    </SheetSection>
                    <SheetSection
                        id="orders"
                        title={fm({ id: sheetMessages.orders })}
                        defaultOpen={false}
                    >
                        <PhysicalItemOrdersSection physicalItemUid={physicalItem.uid} />
                    </SheetSection>
                </>
            )}

            {statistics.sparePartsCount > 0 && (
                <SheetSection
                    id="spareParts"
                    title={`${fm({ id: sheetMessages.spareParts })} (${statistics.sparePartsCount})`}
                    defaultOpen={false}
                    testId="system-edit-spare-parts"
                >
                    <SpareRelationsSection
                        systemUid={system.uid}
                        mode="spareParts"
                        onSelectSystem={onSelectSystem}
                        showHeader={false}
                    />
                </SheetSection>
            )}

            {statistics.sparesForCount > 0 && (
                <SheetSection
                    id="spareFor"
                    title={`${fm({ id: sheetMessages.spareFor })} (${statistics.sparesForCount})`}
                    defaultOpen={false}
                    testId="system-edit-spare-for"
                >
                    <SpareRelationsSection
                        systemUid={system.uid}
                        mode="spareFor"
                        onSelectSystem={onSelectSystem}
                        showHeader={false}
                    />
                </SheetSection>
            )}

            {statistics.directSubsystemsCount > 0 && (
                <SheetSection
                    id="subsystems"
                    title={`${fm({ id: sheetMessages.subsystems })} (${statistics.directSubsystemsCount})`}
                    accentClassName="bg-blue-50 dark:bg-blue-900/20"
                    defaultOpen={false}
                    testId="system-edit-subsystems"
                >
                    <SubsystemsSection systemUid={system.uid} onSelectSystem={onSelectSystem} />
                </SheetSection>
            )}

            <SheetSection
                id="activity"
                title={fm({ id: sheetMessages.activity })}
                defaultOpen={false}
            >
                <SystemActivity uid={system.uid} />
            </SheetSection>
        </div>
    )
}
