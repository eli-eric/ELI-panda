import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import useTableStateStore from '@/store/useTableStateStore'
import { highlightText } from '@/utils'

import { updateLocationWithSublocation } from '../utils'
import { useLocation, useSubLocations } from './useLocation'

export const useLocationModal = () => {
  const tableId = 'location-tree'
  const [open, setOpen] = useState(false)
  const [codebooktree, setCodebooktree] = useState<Codebooktree[]>([])
  const { locations } = useLocation()
  const { getSubLocations, subLocations, loading } = useSubLocations()
  const [uid, setUid] = useState<string>('')

  useEffect(() => {
    if (locations) {
      setCodebooktree(
        locations.map(location => ({
          name: location.name,
          code: location.code as string,
          uid: location.uid,
          isExpandable: location.subLocations.length > 0
        }))
      )
    }
  }, [locations])

  useEffect(() => {
    if (subLocations) {
      setCodebooktree(prev =>
        updateLocationWithSublocation(prev, subLocations, uid)
      )
    }
  }, [subLocations, uid])

  const fetchChildren = (uid: string) => {
    setUid(uid)
    getSubLocations({
      variables: { where: { uid } }
    })
  }
  const { instances } = useTableStateStore()
  const filter = useMemo(
    () => instances[tableId]?.columnFilter,
    [instances, tableId]
  )
  const filterCode = filter?.find(item => item.id === 'code')?.value as string

  const additionalColumn: ColumnDef<Codebooktree, string> = {
    header: 'Code',
    accessorKey: 'code',
    id: 'code',
    cell: ({ getValue }) =>
      highlightText(getValue() || '', (filterCode as string) || ''),
    meta: { filter: { type: 'string', enableColumnFilter: true } }
  }

  return {
    open,
    setOpen,
    codebooktree,
    fetchChildren,
    additionalColumn,
    loading,
    uid,
    tableId
  }
}
