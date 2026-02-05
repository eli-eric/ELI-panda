import { type FC } from 'react'

import { Disclosure } from '@/components/ui'
import { PATH } from '@/types/constants/paths'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface PhysicalItemSectionProps {
    physicalItem: any
    catalogueItem: any
}

export const PhysicalItemSection: FC<PhysicalItemSectionProps> = ({
    physicalItem,
    catalogueItem,
}) => {
    if (!physicalItem) return null

    return (
        <Disclosure
            title="Physical Item"
            defaultOpen={true}
            className="w-full border rounded-md overflow-hidden shadow-md"
            buttonClassName="bg-amber-100 dark:bg-amber-600 text-gray-900 dark:text-gray-100 hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors"
            panelClassName="px-3 py-3 space-y-2 shadow-md shadow-gray-200 dark:shadow-gray-800"
            transparentButton={false}
        >
            <div className="grid grid-cols-1 gap-2 text-sm">
                {physicalItem.eun && <SystemDetailParameter title="EUN" value={physicalItem.eun} />}
                {physicalItem.serialNumber && (
                    <SystemDetailParameter
                        title="Serial Number"
                        value={physicalItem.serialNumber}
                    />
                )}
                {physicalItem.itemUsage?.name && (
                    <SystemDetailParameter title="Item Usage" value={physicalItem.itemUsage.name} />
                )}
                <SystemDetailParameter
                    title="Part Number"
                    value={catalogueItem.catalogueNumber}
                    href={PATH.CATALOGUE_ITEM + '/' + catalogueItem.uid}
                />
                <SystemDetailParameter
                    title="Category"
                    value={catalogueItem.catalogueCategory?.name}
                    href={`${PATH.CATALOGUE}?page=1&category=${encodeURIComponent(JSON.stringify({ uid: catalogueItem.catalogueCategory.uid, name: catalogueItem.catalogueCategory.name }))}`}
                />
                <SystemDetailParameter title="Supplier" value={catalogueItem.supplier?.name} />
                {physicalItem.conditionStatus?.name && (
                    <SystemDetailParameter
                        title="Condition Status"
                        value={physicalItem.conditionStatus.name}
                    />
                )}
            </div>
        </Disclosure>
    )
}
