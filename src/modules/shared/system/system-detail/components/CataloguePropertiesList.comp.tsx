import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'

import type { CataloguePropertyGroup } from '../types'
import { PropertyRow } from './PropertyRow.comp'

export const NO_GROUP_KEY = 'no-group'

interface CataloguePropertiesListProps {
    groups: CataloguePropertyGroup[]
    hasOverriddenProperties: boolean
    variant?: 'tab' | 'sidebar'
}

/** Grouped catalogue properties with the service-override "was X" marker. */
export const CataloguePropertiesList: FC<CataloguePropertiesListProps> = ({
    groups,
    hasOverriddenProperties,
    variant = 'tab',
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

            {groups.map(group => (
                <div key={group.key} className="space-y-1">
                    {group.key !== NO_GROUP_KEY && (
                        <div className="space-y-1">
                            <h4 className="text-xs font-medium text-foreground">{group.name}</h4>
                            <Separator />
                        </div>
                    )}
                    {group.properties.map(property => (
                        <PropertyRow
                            key={property.uid}
                            name={property.name}
                            // effective value: the latest service value wins over the catalogue one
                            value={property.serviceValue ?? property.value}
                            unit={property.unit}
                            original={property.isOverridden ? property.value : null}
                            variant={variant}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
