import { useMutation, useQueryClient } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryMutate } from '@/utils/fetcher'

import type { MoveSystemsBody } from '../types/responses'

interface Props {
  destinationSystemUid: string
  movingSystems: SystemDetail[]
  destinationTableId: string
  movingTableId: string
}

// recursion to find correct uid in subSystems and update it
const updateDestinationRows = (
  originalData: SystemDetail[],
  movingSystems: SystemDetail[],
  destinationSystemUid: string
): SystemDetail[] => {
  const newRows = originalData.map(row => {
    if (row.uid === destinationSystemUid) {
      return {
        ...row,
        subSystems: row.subSystems
          ? [...row.subSystems, ...movingSystems]
          : undefined
      }
    } else if (row.subSystems) {
      return {
        ...row,
        subSystems: updateDestinationRows(
          row.subSystems,
          movingSystems,
          destinationSystemUid
        )
      }
    } else {
      return row
    }
  })

  return newRows
}

export const useMoveSubmit = ({
  destinationSystemUid,
  movingSystems,
  destinationTableId,
  movingTableId
}: Props) => {
  const { query: destinationTableQuery } = useQueryManager(destinationTableId)
  const { query: movingTableQuery } = useQueryManager(movingTableId)

  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
      [destinationTableId, { query: destinationTableQuery }],
      prev =>
        prev
          ? {
              ...prev,
              data: updateDestinationRows(
                prev.data,
                movingSystems,
                destinationSystemUid
              )
            }
          : prev
    )
  }

  return useMutation({
    mutationFn: queryMutate<string, MoveSystemsBody>('systemsMove', 'post'),
    onSuccess
  })
}
