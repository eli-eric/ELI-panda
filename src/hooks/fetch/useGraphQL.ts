import request from 'graphql-request'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery, type UseQueryResult } from 'react-query'
import {
  useMutation,
  type UseMutationResult,
  type MutationFunction
} from 'react-query'

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    async ({ queryKey }) =>
      request('/api/graphql', document, queryKey[1] ? queryKey[1] : undefined)
  )
}

export function useGraphQLMutation<
  TResult,
  TVariables extends Record<string, any> | undefined
>(
  document: TypedDocumentNode<TResult, TVariables>
): UseMutationResult<TResult, Error, TVariables> {
  const mutate: MutationFunction<TResult, TVariables> = async variables => {
    // Ensuring `variables` can safely be undefined.
    return request('/api/graphql', document, variables ?? undefined)
  }

  return useMutation(mutate)
}
