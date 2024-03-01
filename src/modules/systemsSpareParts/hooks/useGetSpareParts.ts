import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

const GET_SPARE_PARTS = gql`
  query Systems($where: SystemWhere) {
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
`

export const useGetSpareParts = uid => {
  const { data, loading } = useQuery<Query>(GET_SPARE_PARTS, {
    variables: {
      where: {
        uid: uid
      }
    },
    onError: () => {
      toast.error('Something went wrong')
    },
    fetchPolicy: 'no-cache'
  })

  return { spareParts: data?.systems[0].spareParts, loading }
}

const GET_SPARE_PARTS_FOR = gql`
  query Systems($where: SystemWhere) {
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
`
export const useGetSparePartsFor = uid => {
  const { data, loading } = useQuery<Query>(GET_SPARE_PARTS_FOR, {
    variables: {
      where: {
        uid: uid
      }
    },
    onError: () => {
      toast.error('Something went wrong')
    },
    fetchPolicy: 'no-cache'
  })

  return { spareParts: data?.systems[0].sparePartsFor, loading }
}
