import { useRouter } from 'next/router'
import { useCallback } from 'react'

import type { RelationshipType } from '@/modules/systemHierarchy/types/graph'
import { RELATIONSHIP_TYPES } from '@/modules/systemHierarchy/types/graph'
import { useRelationsStore } from '@/modules/systemsRelations/store/useRelationsStore'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'
import { SystemLevel } from '@/types/gql/graphql'

const ITEM_USAGE_VALUES = [
    '25c189d0-0564-43a7-90d9-65b7083bea98',
    '89d68bc5-82cc-45cf-80aa-8edb86bf52f1',
    '5defcd49-5307-4b21-94b1-870b8f61a919',
    '0c7a063d-2bb6-41ef-b808-a137e1deaaa0',
    'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea',
]

interface AssignSparesParams {
    uid: string
    parentPath: Array<{ uid: string; name: string; systemLevel?: SystemLevel | null }> | null
    catalogueNumber: string | null
    relationshipType?: RelationshipType
}

export const useAssignSparesNavigation = ({
    uid,
    parentPath,
    catalogueNumber,
    relationshipType = RELATIONSHIP_TYPES.IS_SPARE_FOR,
}: AssignSparesParams) => {
    const router = useRouter()
    const { setSelectedUidForSystem, setSelectedRelationshipType } = useRelationsStore()
    const { setSearch, setColumnFilter } = useTableStateStore()

    return useCallback(() => {
        const parentTechUnit = [...(parentPath ?? [])]
            .reverse()
            .find(p => p.systemLevel === SystemLevel.TechnologyUnit)

        const filters: Array<{ id: string; name: string; value: unknown }> = [
            {
                id: 'itemUsage',
                name: 'itemUsage',
                value: ITEM_USAGE_VALUES,
            },
        ]

        if (catalogueNumber) {
            filters.push({ id: 'catalogueNumber', name: 'catalogueNumber', value: catalogueNumber })
        }

        if (parentTechUnit) {
            filters.push({
                id: 'parentSystem',
                name: 'parentSystem',
                value: { uid: parentTechUnit.uid, name: parentTechUnit.name },
            })
        }

        setColumnFilter('spare-parts', filters)
        setSearch('for-system', uid)
        setSelectedUidForSystem(uid)
        setSelectedRelationshipType(relationshipType)
        router.push(PATH.SYSTEM_RELATIONS)
    }, [
        uid,
        parentPath,
        catalogueNumber,
        relationshipType,
        router,
        setSelectedUidForSystem,
        setSelectedRelationshipType,
        setSearch,
        setColumnFilter,
    ])
}
