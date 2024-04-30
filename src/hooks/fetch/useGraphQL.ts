import request from 'graphql-request'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import {
  useMutation,
  type UseMutationResult,
  type MutationFunction
} from '@tanstack/react-query'

type Variables = Record<string, any> | undefined

async function typedGraphQLRequest<TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  return request('/api/graphql', document, variables) as Promise<TResult>
}

export function useGraphQL<TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: Omit<
    UseQueryOptions<TResult, Error, TResult, any[]>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TResult, Error> {
  const adjustedOptions: UseQueryOptions<TResult, Error, TResult, any[]> = {
    ...options,

    queryFn: async ({ queryKey }) => {
      return typedGraphQLRequest<TResult, TVariables>(
        document,
        queryKey[1] ? (queryKey[1] as TVariables) : undefined
      )
    },
    queryKey: [(document.definitions[0] as any).name.value, variables, document]
  }

  return useQuery(adjustedOptions)
}

export function useGraphQLMutation<
  TResult,
  TVariables extends Record<string, any> | undefined
>(
  document: TypedDocumentNode<TResult, TVariables>,
  options?:
    | Omit<
        UseMutationOptions<TResult, Error, TVariables, unknown>,
        'mutationFn'
      >
    | undefined
): UseMutationResult<TResult, Error, TVariables> {
  const mutate: MutationFunction<TResult, TVariables> = async variables => {
    // Ensuring `variables` can safely be undefined.
    return request('/api/graphql', document, variables ?? undefined)
  }

  return useMutation({
    ...options,
    mutationFn: mutate
  })
}
