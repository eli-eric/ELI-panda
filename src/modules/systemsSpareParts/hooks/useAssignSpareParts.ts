import { gql, useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import type { Mutation } from '@/types/gql/graphql'

const ASSIGN_SPARE_PARTS = gql`
  mutation CreateSparePartRelation($fromSystemIds: [ID!]!, $toSystemIds: [ID!]!) {
    createSparePartRelation(fromSystemIds: $fromSystemIds, toSystemIds: $toSystemIds)
  }
`

export const useAssignSpareParts = (fromSystemIds?: string[], toSystemIds?: string[]) => {
  const [assignSpareParts, { loading }] = useMutation<Mutation>(ASSIGN_SPARE_PARTS, {
    variables: { fromSystemIds, toSystemIds },
    onCompleted: data => {
      toast.success(data.createSparePartRelation as string)
    },
    onError: erorr => {
      toast.error(erorr.message)
    }
  })
  return { assignSpareParts, loading }
}
