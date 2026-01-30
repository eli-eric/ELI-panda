import { useEffect, useState } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'

import { updateLocationWithSublocation } from '../utils'
import { useLocation, useSubLocations } from './useLocation'

export const useLocationModal = () => {
    const tableId = 'location-tree'
    const [codebooktree, setCodebooktree] = useState<Codebooktree[]>([])
    const { locations, error: locationsError } = useLocation()
    const [uid, setUid] = useState<string>('')
    const { subLocations, loading, error: subLocationError } = useSubLocations(uid)

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
