import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useSparesStore } from '@/modules/systemsSpareParts/store/useSparesStore'
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
    parentPath: Array<{ uid: string; name: string; systemLevel?: string | null }> | null
    catalogueNumber: string | null
}

export const useAssignSparesNavigation = (params: AssignSparesParams) => {
    const router = useRouter()
    const { setSelectedUidForSystem } = useSparesStore()
    const { setSearch, setColumnFilter } = useTableStateStore()

    return useCallback(() => {
        const { uid, parentPath, catalogueNumber } = params

        const parentTechUnit = [...(parentPath ?? [])]
            .reverse()
            .find(p => p.systemLevel === SystemLevel.TechnologyUnit)

        const filters: Array<{ id: string; name: string; value: unknown }> = [
            { id: 'catalogueNumber', name: 'catalogueNumber', value: catalogueNumber },
            {
                id: 'itemUsage',
                name: 'itemUsage',
                value: ITEM_USAGE_VALUES,
            },
        ]

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
        router.push(PATH.SPARE_PARTS)
    }, [params, router, setSelectedUidForSystem, setSearch, setColumnFilter])
}
