import toast from 'react-hot-toast'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

const ASSIGN_SPARE_PARTS = gql(`
  mutation CreateSparePartRelation($fromSystemIds: [ID!]!, $toSystemIds: [ID!]!) {
    createSparePartRelation(fromSystemIds: $fromSystemIds, toSystemIds: $toSystemIds)
  }
`)

export const useAssignSpareParts = () => {
  const { mutate, isPending } = useGraphQLMutation(ASSIGN_SPARE_PARTS, {
    onSuccess: data => {
      toast.success(data.createSparePartRelation as string)
    },
    onError: erorr => {
      toast.error(erorr.message)
    }
  })
  return { assignSpareParts: mutate, loading: isPending }
}
