import request from 'graphql-request'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { UseMutationOptions, UseQueryOptions } from 'react-query'
import { useQuery, type UseQueryResult } from 'react-query'
import {
  useMutation,
  type UseMutationResult,
  type MutationFunction
} from 'react-query'
import toast from 'react-hot-toast'

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
    onError: error => {
      if (options?.onError) {
        options.onError(error)
      } else {
        toast.error(error.message)
      }
    },
    queryFn: async ({ queryKey }) => {
      return typedGraphQLRequest<TResult, TVariables>(
        document,
        queryKey[1] ? (queryKey[1] as TVariables) : undefined
      )
    }
  }

  return useQuery(
    [(document.definitions[0] as any).name.value, variables],
    adjustedOptions
  )
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

  return useMutation(mutate, options)
}
