import { formatDistanceToNow } from 'date-fns'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { useIntl } from 'react-intl'

import { InlineFieldDensityProvider } from '@/components/ui/inline-field'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'
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

const sheetMessages = message.systemHierarchy.sheet

const SheetSection: FC<{ title: string; children: ReactNode; testId?: string }> = ({
    title,
    children,
    testId,
}) => (
    <section className="space-y-2" data-testid={testId}>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
        </h3>
        {children}
    </section>
)

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
 * Jira-like two-column layout: content on the left, the classification + people
 * "Details" panel on the right. Every field saves inline (PATCH) — no Save button.
 */
export const SystemEditSheet: FC<SystemEditSheetProps> = ({ system, onSelectSystem, onClose }) => {
    const { formatMessage: fm } = useIntl()
    const editPermission = useSystemEditPermission(system.uid)
    const { physicalItem, statistics } = system

    return (
        <div className="flex flex-col gap-4 pb-6" data-testid="system-edit-sheet">
            <div className="space-y-1">
                <SystemBreadcrumbs
                    parentPath={system.parentPath}
                    currentName={system.name}
                    currentCode={system.systemCode}
                    onSelectAncestor={onSelectSystem}
                />
                <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
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
            </div>

            <SystemEditRestrictionBanner
                status={editPermission.status}
                responsibles={editPermission.responsibles}
                refetch={editPermission.refetch}
            />

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-w-0 space-y-6">
                    <SystemDescriptionField system={system} />

                    <SheetSection title={fm({ id: sheetMessages.images })}>
                        <SystemImagePanel systemUid={system.uid} systemName={system.name} />
                    </SheetSection>

                    {physicalItem && (
                        <SheetSection
                            title={fm({ id: sheetMessages.physicalItem })}
                            testId="system-edit-physical-item"
                        >
                            <PhysicalItemFields
                                systemUid={system.uid}
                                physicalItem={physicalItem}
                            />
                            <CataloguePropertiesSection physicalItemUid={physicalItem.uid} />
                            <PhysicalItemOrdersSection physicalItemUid={physicalItem.uid} />
                        </SheetSection>
                    )}

                    {statistics.sparePartsCount > 0 && (
                        <SheetSection title={fm({ id: sheetMessages.spareParts })}>
                            <SpareRelationsSection
                                systemUid={system.uid}
                                mode="spareParts"
                                onSelectSystem={onSelectSystem}
                            />
                        </SheetSection>
                    )}

                    {statistics.sparesForCount > 0 && (
                        <SheetSection title={fm({ id: sheetMessages.spareFor })}>
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
                            title={`${fm({ id: sheetMessages.subsystems })} (${statistics.directSubsystemsCount})`}
                        >
                            <SubsystemsSection
                                systemUid={system.uid}
                                onSelectSystem={onSelectSystem}
                            />
                        </SheetSection>
                    )}

                    <SheetSection title={fm({ id: sheetMessages.activity })}>
                        <SystemActivity uid={system.uid} />
                    </SheetSection>
                </div>

                <aside
                    className="h-fit space-y-3 rounded-lg border bg-card/40 p-3 lg:sticky lg:top-0"
                    data-testid="system-edit-details-panel"
                >
                    <InlineFieldDensityProvider value="compact">
                        <SheetSection title={fm({ id: sheetMessages.details })}>
                            <SystemClassificationFields system={system} />
                        </SheetSection>
                        <Separator />
                        <SheetSection title={fm({ id: sheetMessages.people })}>
                            <SystemPeopleFields system={system} />
                        </SheetSection>
                    </InlineFieldDensityProvider>
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
                </aside>
            </div>
        </div>
    )
}
