import { gql, useQuery } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'

const GET_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  query System($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
    }
  }
`
export const useFindSystem = (eun?: string) => {
  const { data, error, loading } = useQuery<Query>(GET_SYSTEM, {
    variables: {
      where: {
        physicalItem: {
          eun_CONTAINS: eun
        }
      }
    },
    skip: !eun,
    onError: error => {
      toast.error('Something went wrong while fetching system detail: ' + error.message)
    },
    fetchPolicy: 'network-only'
  })

  return {
    systemDetail: data?.systems[0],
    loading: loading,
    error
  }
}

const GET_ORDER = gql`
  query Orders($where: OrderWhere) {
    orders(where: $where) {
      name
      uid
    }
  }
`

export const useFindOrder = (eun?: string) => {
  const { data, error, loading } = useQuery<Query>(GET_ORDER, {
    variables: {
      where: {
        orderLinesConnection_SOME: {
          node: {
            eun_CONTAINS: eun
          }
        }
      }
    },
    skip: !eun,
    onError: error => {
      toast.error('Something went wrong while fetching system detail: ' + error.message)
    },
    fetchPolicy: 'network-only'
  })

  return {
    order: data?.orders[0],
    loading: loading,
    error
  }
}
