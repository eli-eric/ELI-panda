import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'
import { formatCoverage, isUnderCovered } from '@/modules/shared/system/coverage'

import type { SystemLeaf } from '../../types'
import { hasPhysicalItem } from '../../utils/predicates'
import { PhysicalItemPropertiesSidebar } from '../physical-item/PhysicalItemPropertiesSidebar.comp'
import { MetadataSection } from './MetadataSection.comp'
import { SystemImagePanel } from './SystemImagePanel.comp'

interface QuickInfoSidebarProps {
    system: SystemLeaf | null
}

export const QuickInfoSidebar: FC<QuickInfoSidebarProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    if (!system) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm p-4">
                {fm({ id: message.common.system.noSystemSelected })}
            </div>
        )
    }

    const infoItems = [
        {
            label: fm({ id: message.systemHierarchy.fields.systemType }),
            value: system.systemType?.name ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.location }),
            value: system.location?.name ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.zone }),
            value: system.zone?.name ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.importance }),
            value: system.importance?.name ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.responsible }),
            value: system.responsible?.name ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.owner }),
            value: system.owner?.name ?? null,
        },
    ]

    const statsItems = [
        {
            label: fm({ id: message.systemHierarchy.sidebar.subsystemsCount }),
            value: system.statistics?.subsystemsCount ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.sidebar.sparePartsCount }),
            value: system.statistics?.sparePartsCount ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.sidebar.spRequirement }),
            value: system.statistics?.minimalSpareParstCount ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.sidebar.spareCoverage }),
            value: formatCoverage(system.statistics?.sp_coverage),
            // Same red flag the systems and leaves tables raise on the row.
            valueClassName: isUnderCovered(system.statistics)
                ? 'text-red-500 dark:text-red-500'
                : undefined,
        },
    ]

    const physicalItemItems = [
        {
            label: fm({ id: message.systemsPage.systemDetail.form.physicalItem.eun.label }),
            value: system.physicalItem?.eun ?? null,
        },
        {
            label: fm({ id: message.systemsPage.systemDetail.form.physicalItem.partNumber.label }),
            value: system.physicalItem?.catalogueNumber ?? null,
        },
        {
            label: fm({
                id: message.systemsPage.systemDetail.form.physicalItem.serialNumber.label,
            }),
            value: system.physicalItem?.serialNumber ?? null,
        },
        {
            label: fm({ id: message.systemsPage.systemDetail.form.physicalItem.itemUsage.label }),
            value: system.physicalItem?.itemUsage?.name ?? null,
        },
        {
            label: fm({
                id: message.systemsPage.systemDetail.form.physicalItem.conditionStatus.label,
            }),
            value: system.physicalItem?.conditionStatus?.name ?? null,
        },
    ]

    return (
        <div className="flex flex-col">
            <div className="border-b border-border px-3 py-2">
                <h2 className="text-sm font-semibold">
                    {fm({ id: message.systemHierarchy.sidebar.title })}
                </h2>
            </div>
            <div className="p-3 space-y-4">
                <SystemImagePanel systemUid={system.uid} systemName={system.name} />
                <MetadataSection
                    title={fm({ id: message.systemHierarchy.sidebar.metadata })}
                    items={infoItems}
                />
                <Separator />
                <MetadataSection
                    title={fm({ id: message.systemHierarchy.sidebar.statistics })}
                    items={statsItems}
                />
                {hasPhysicalItem(system) && (
                    <>
                        <Separator />
                        <MetadataSection
                            title={fm({ id: message.systemHierarchy.physicalItem.title })}
                            items={physicalItemItems}
                        />
                        <PhysicalItemPropertiesSidebar systemUid={system.uid} />
                    </>
                )}
            </div>
        </div>
    )
}
