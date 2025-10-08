import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import useQueryManager from '@/hooks/useQueryManager'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryMutate } from '@/utils/fetcher'

import { useSystemsMoveStore } from '../store/useSystemsMoveStore'
import type { MoveSystemsBody } from '../types/responses'

interface Props {
  destinationSystemUid: string
  movingSystems: SystemDetail[]
  resetSelection: () => void
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
        hasSubsystems: true,
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

const removeMovingRows = (
  originalData: SystemDetail[],
  movingSystems: SystemDetail[]
): SystemDetail[] => {
  const newRows = originalData
    .map(row => {
      if (movingSystems.find(moving => moving.uid === row.uid)) {
        return undefined
      } else if (row.subSystems) {
        return {
          ...row,
          subSystems: removeMovingRows(row.subSystems, movingSystems)
        }
      } else {
        return row
      }
    })
    .filter(Boolean) as SystemDetail[]
  return newRows
}

export const useMoveSubmit = ({
  destinationSystemUid,
  movingSystems,

  resetSelection
}: Props) => {
  const { destinationSystemsTableId, movingSystemsTableId } =
    useSystemsMoveStore()
  const { query: destinationTableQuery } = useQueryManager(
    destinationSystemsTableId
  )
  const { query: movingTableQuery } = useQueryManager(movingSystemsTableId)

  const queryClient = useQueryClient()

  const queryKeySubsystems: QueryFetcherKey = [
    'subsystems',
    { uid: destinationSystemUid }
  ]

  const onSuccess = () => {
    queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
      [destinationSystemsTableId, { query: destinationTableQuery }],
      prev =>
        prev
          ? {
              ...prev,
              data: removeMovingRows(prev.data, movingSystems)
            }
          : prev
    )
    queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
      [movingSystemsTableId, { query: movingTableQuery }],
      prev =>
        prev
          ? {
              ...prev,
              data: removeMovingRows(prev.data, movingSystems)
            }
          : prev
    )
    queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
      [destinationSystemsTableId, { query: destinationTableQuery }],
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

    queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
      [movingSystemsTableId, { query: movingTableQuery }],
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

    queryClient.invalidateQueries({ queryKey: queryKeySubsystems })
    resetSelection()
    toast.success('Systems moved successfully', { duration: 3000 })
  }

  return useMutation({
    mutationFn: queryMutate<string, MoveSystemsBody>(
      'systemsMove',
      'post',
      undefined,
      undefined,
      undefined,
      'text' // Server returns text/plain instead of application/json),
    ),
    onSuccess,
    onError: () => {
      toast.error('Something went wrong. Systems didnt move.', {
        duration: 3000
      })
    }
  })
}
