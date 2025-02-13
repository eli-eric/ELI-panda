import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export const useServicesColumns = () => {
  const columns = useMemo((): ColumnDef<any, any>[] => {
    return [
      {
        id: 'name',
        header: 'Name',
        size: 300
      },
      {
        id: 'description',
        header: 'Description',
        size: 300
      }
    ]
  }, [])

  return columns
}
