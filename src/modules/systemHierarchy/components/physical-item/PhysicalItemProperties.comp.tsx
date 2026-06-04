import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { PropertyGroup } from '@/hooks/useItemPropertiesData'
import { message } from '@/i18n/src/messages'

import { PropertyRow } from './PropertyRow.comp'

interface PhysicalItemPropertiesProps {
    groupedProperties: PropertyGroup[]
    hasOverriddenProperties: boolean
}

export const PhysicalItemProperties: FC<PhysicalItemPropertiesProps> = ({
    groupedProperties,
    hasOverriddenProperties,
}) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="space-y-3" data-testid="physical-item-properties">
            <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {fm({ id: message.common.ui.catalogueProperties })}
                </h3>
                {hasOverriddenProperties && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-auto">
                        {fm({ id: message.common.ui.modified })}
                    </Badge>
                )}
            </div>

            {groupedProperties.map(group => (
                <div key={group.key} className="space-y-1">
                    {group.name !== 'General' && (
                        <div className="space-y-1">
                            <h4 className="text-xs font-medium text-foreground">{group.name}</h4>
                            <Separator />
                        </div>
                    )}
                    {group.properties.map(property => (
                        <PropertyRow
                            key={property.uid}
                            name={property.name}
                            value={property.serviceValue || property.value}
                            unit={property.unit}
                            original={property.isOverridden ? property.value : null}
                            variant="tab"
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
