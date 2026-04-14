import { useMemo } from 'react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { gql } from '@/types/gql'

const relationshipItemUsageQuery = gql(`
  query RelationshipItemUsage($where: SystemWhere) {
    systems(where: $where) {
      uid
      physicalItem {
        itemUsage {
          uid
        }
      }
    }
  }
`)

export const useRelationshipItemUsage = (uids: string[]) => {
    const { data, isLoading } = useGraphQL(relationshipItemUsageQuery, {
        variables: {
            where: {
                uid_IN: uids,
                deleted: false,
            },
        },
        enabled: uids.length > 0,
        staleTime: 60 * 1000,
    })

    const itemUsageMap = useMemo(() => {
        const map: Record<string, ITEM_USAGE | undefined> = {}
        for (const system of data?.systems ?? []) {
            map[system.uid] = system.physicalItem?.itemUsage?.uid as ITEM_USAGE | undefined
        }
        return map
    }, [data])

    return { itemUsageMap, isLoading }
}
