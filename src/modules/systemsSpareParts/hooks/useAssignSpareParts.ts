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
      if (data.createSparePartRelation?.includes('Error')) {
        toast.error(data.createSparePartRelation as string, { duration: 10000 })
      } else {
        toast.success(data.createSparePartRelation as string)
      }
    },
    onError: erorr => {
      toast.error(erorr.message)
    }
  })

  const wrappedMutate = (variables: any, options?: any) => {
    return mutate(variables, options)
  }

  return { assignSpareParts: wrappedMutate, loading: isPending }
}
