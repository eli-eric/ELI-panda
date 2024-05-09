import toast from 'react-hot-toast'

import { gql } from '@/types/gql'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

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
