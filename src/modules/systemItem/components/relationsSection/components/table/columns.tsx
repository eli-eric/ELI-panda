import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { SystemRelationshipResponse } from '@/modules/systems-deprecated/types/responses'

import { RelationNameCell } from './cells/RelationNameCell'

interface Props {
  systemName: string
  uid: string
}

export const useRelationsColumns = ({ systemName, uid }: Props) => {
  const columns = useMemo(
    (): ColumnDef<SystemRelationshipResponse, string>[] => [
      {
        header: 'System name',
        cell: props => <RelationNameCell {...props} uid={uid} systemName={systemName} />
      },
      {
        header: 'Direction',
        accessorKey: 'direction',
        cell: ({ getValue }) => (
          <div>
            {getValue() === 'to' && <ArrowLongLeftIcon className="w-10 h-10" />}
            {getValue() === 'from' && <ArrowLongRightIcon className="w-10 h-10" />}
          </div>
        )
      },
      { header: 'Relation type code', accessorKey: 'relationTypeCode' },
      { header: 'Foreign systen name', accessorKey: 'foreignSystemName' }
    ],
    [systemName, uid]
  )

  return columns
}
