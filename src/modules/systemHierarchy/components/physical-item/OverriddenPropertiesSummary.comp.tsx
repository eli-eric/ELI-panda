import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Separator } from '@/components/ui/separator'
import type { PropertyItem } from '@/hooks/useItemPropertiesData'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { message } from '@/i18n/src/messages'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { PropertyRow } from './PropertyRow.comp'

interface OverriddenPropertiesSummaryProps {
    systemUid: string
}

// A property belongs in the summary when a service changed an existing catalogue value
// (isOverridden) OR added a parameter the catalogue never had (service-only). Service values
// that merely re-affirm the catalogue value (isOverridden === false, value present) are excluded.
const isServiceModified = (property: PropertyItem): boolean =>
    Boolean(property.isOverridden) ||
    (property.value === null &&
        property.serviceValue !== null &&
        property.serviceValue !== undefined)

export const OverriddenPropertiesSummary: FC<OverriddenPropertiesSummaryProps> = ({
    systemUid,
}) => {
    const { formatMessage: fm } = useIntl()
    const { physicalItem } = useSystemDetail(systemUid)

    const { groupedProperties } = useItemPropertiesData({
        catalogueItem: physicalItem?.catalogueItem,
        serviceItems: physicalItem?.serviceItemsConnection?.edges,
    })

    const modified = groupedProperties.flatMap(group => group.properties).filter(isServiceModified)

    if (modified.length === 0) return null

    return (
        <>
            <Separator />
            <div className="space-y-2" data-testid="overridden-properties-summary">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {fm({ id: message.systemHierarchy.physicalItem.properties.modifiedTitle })}
                </h3>
                <div className="space-y-1">
                    {modified.map(property => (
                        <PropertyRow
                            key={property.uid}
                            name={property.name}
                            value={property.serviceValue || property.value}
                            unit={property.unit}
                            original={property.isOverridden ? property.value : null}
                            variant="sidebar"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
