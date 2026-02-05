import { sortBy } from 'lodash'
import { useMemo } from 'react'

import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

import { DetailPropertiesList } from './detail-properties.list'

type GroupPropertyProps = {
    category?: CodebookType
    allowedDetails?: string[]
}

export const ServiceLineGroups = ({ category, allowedDetails }: GroupPropertyProps) => {
    const { groupDetails } = useGroupDetails(category?.uid)

    const details = useMemo(() => {
        const filteredDetails = groupDetails?.filter(detail =>
            allowedDetails?.includes(detail.property.uid),
        )
        return sortBy(filteredDetails, ['property.name'])
    }, [groupDetails, allowedDetails])

    const groups = useMemo(() => {
        const groups = details?.map(item => item.propertyGroup)
        return [...new Set(groups)]
    }, [details])

    const groupMap = useMemo(() => {
        const map = new Map<string, CatalogueItemDetail[]>()
        groups?.forEach(group => {
            const groupDetails = details
                ?.filter(detail => detail.propertyGroup === group)
                .map(detail => ({
                    property: detail.property,
                    value: detail.value,
                    propertyGroup: detail.propertyGroup,
                }))

            map.set(group, sortBy(groupDetails, ['property.name']))
        })
        return map
    }, [details, groups])

    return <DetailPropertiesList groupMap={groupMap} />
}
