import { Heading } from '@/components/layout/Heading'
import GroupProperty from '@/modules/catalogueItem/components/form/GroupProperty'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

type Props = {
    groupMap: Map<string, CatalogueItemDetail[]>
    disabled?: boolean
}

export const DetailPropertiesList = ({ groupMap = new Map(), disabled }: Props) => {
    if (groupMap.size === 0) {
        return null
    }

    return (
        <>
            {Array.from(groupMap.entries()).map(([group, properties]) => (
                <div key={group}>
                    <Heading customText={group} />
                    <div className="px-4 sm:px-6">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4">
                            {properties.map(property => (
                                <GroupProperty
                                    key={property.property.uid}
                                    detail={property}
                                    disabled={disabled}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
