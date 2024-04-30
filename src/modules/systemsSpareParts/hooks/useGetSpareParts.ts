import toast from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { useEffect } from 'react'

const GET_SPARE_PARTS = gql(`
  query SystemsSpareParts($where: SystemWhere) {
    systems(where: $where) {
      spareParts {
        name
        parentPath {
          name
          uid
        }
        systemLevel
        systemType {
          name
        }
        description
        zone {
          name
        }
        location {
          name
          uid
        }
      }
    }
  }
`)

export const useGetSpareParts = uid => {
  const { data, isLoading, error } = useGraphQL(GET_SPARE_PARTS, {
    where: {
      uid: uid
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch spare parts')
    }
  }, [error])

  return { spareParts: data?.systems[0].spareParts, loading: isLoading }
}

const GET_SPARE_PARTS_FOR = gql(`
  query SystemSparePartsFor($where: SystemWhere) {
    systems(where: $where) {
      sparePartsFor {
        name
        parentPath {
          name
          uid
        }
        systemLevel
        systemType {
          name
        }
        description
        zone {
          name
        }
        location {
          name
          uid
        }
      }
    }
  }
`)
export const useGetSparePartsFor = uid => {
  const { data, isLoading, error } = useGraphQL(GET_SPARE_PARTS_FOR, {
    where: {
      uid: uid
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch spare parts')
    }
  }, [error])

  return { spareParts: data?.systems[0].sparePartsFor, loading: isLoading }
}
