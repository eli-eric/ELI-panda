import toast from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

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
  const { data, isLoading: loading } = useGraphQL(
    GET_SPARE_PARTS,
    {
      where: {
        uid: uid
      }
    },
    {
      onError: () => {
        toast.error('Something went wrong')
      }
    }
  )

  return { spareParts: data?.systems[0].spareParts, loading }
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
  const { data, isLoading: loading } = useGraphQL(
    GET_SPARE_PARTS_FOR,
    {
      where: {
        uid: uid
      }
    },
    {
      onError: () => {
        toast.error('Something went wrong')
      }
    }
  )

  return { spareParts: data?.systems[0].sparePartsFor, loading }
}
