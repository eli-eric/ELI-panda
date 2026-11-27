import { useEffect, useState } from 'react'

import type { Codebooktree } from '@/components/form/shared/codebookTree.types'
import { TABLE_IDS } from '@/types/constants/tableIds'

import { updateLocationWithSublocation } from '../utils'
import { useLocation, useSubLocations } from './useLocation'

export const useLocationModal = () => {
    const tableId = TABLE_IDS.LOCATION_TREE
    const [codebooktree, setCodebooktree] = useState<Codebooktree[]>([])
    const { locations, loading: locationsLoading, error: locationsError } = useLocation()
    const [uid, setUid] = useState<string>('')
    const { subLocations, loading: subLoading, error: subLocationError } = useSubLocations(uid)
    const loading = locationsLoading || subLoading

    useEffect(() => {
        if (locations) {
            setCodebooktree(
                locations.map(location => ({
                    name: location.name,
                    code: location.code as string,
                    uid: location.uid,
                    isExpandable: location.subLocations.length > 0,
                })),
            )
        }
    }, [locations])

    useEffect(() => {
        if (subLocations) {
            setCodebooktree(prev => updateLocationWithSublocation(prev, subLocations, uid))
        }
    }, [subLocations, uid])

    const fetchChildren = (uid: string) => {
        setUid(uid)
    }

    return {
        codebooktree,
        fetchChildren,
        loading,
        uid,
        tableId,
        error: locationsError || subLocationError,
    }
}
