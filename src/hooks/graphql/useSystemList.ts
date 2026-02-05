import { gql } from '@/types/gql'

import { useGraphQL } from '../fetch/useGraphQL'

const systemsQuery = gql(`
query Systems($where: SystemWhere) {
  systems(where: $where) {
    name
    uid
    systemCode
    zone {
      code
    }
  }
}`)

export const useSystemList = (systemCode?: string) => {
    return useGraphQL(systemsQuery, {
        variables: {
            where: {
                systemCode_CONTAINS: systemCode,
            },
        },
    })
}
