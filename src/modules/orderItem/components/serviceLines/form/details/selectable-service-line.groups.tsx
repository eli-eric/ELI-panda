import { sortBy } from 'lodash'
import { useMemo } from 'react'

import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'
import type { CodebookType } from '@/types/responses/codebook'

import { SelectableDetailPropertiesList } from './selectable-detail-properties.list'

type GroupPropertyProps = {
    category?: CodebookType
    allowedDetails?: string[]
}

export const SelectableServiceLineGroups = ({ category, allowedDetails }: GroupPropertyProps) => {
    const { groupDetails } = useGroupDetails(category?.uid)

    const details = useMemo(() => {
        const filteredDetails = groupDetails?.filter(detail =>
            allowedDetails?.includes(detail.property.uid),
        )
        return sortBy(filteredDetails, ['property.name'])
    }, [groupDetails, allowedDetails])

    const groups = useMemo(() => {
        if (!details) return []
        const groupNames = details.map(item => item.propertyGroup)
        return [...new Set(groupNames)].sort()
    }, [details])

    const groupMap = useMemo(() => {
        const map = new Map<string, any[]>()
        groups?.forEach(group => {
            const groupDetails = details?.filter(detail => detail.propertyGroup === group)
            if (groupDetails) {
                map.set(group, sortBy(groupDetails, ['property.name']))
            }
        })
        return map
    }, [details, groups])

    return <SelectableDetailPropertiesList groupMap={groupMap} />
}
