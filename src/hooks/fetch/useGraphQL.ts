import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import {
  useMutation,
  useQuery,
  type UseQueryResult,
  useSuspenseQuery
} from '@tanstack/react-query'
import { request } from 'graphql-request'

type Variables = Record<string, any> | undefined

async function typedGraphQLRequest<TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  return request('/api/graphql', document, variables) as Promise<TResult>
}

export function useGraphQL<TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  options?: Omit<
    UseQueryOptions<TResult, Error, TResult, any[]>,
    'queryKey' | 'queryFn'
  > & {
    variables?: TVariables
    customQueryKey?: unknown[]
  }
): UseQueryResult<TResult, Error> {
  const adjustedOptions: UseQueryOptions<TResult, Error, TResult, any[]> = {
    ...options,
    queryFn: async () => {
      return typedGraphQLRequest<TResult, TVariables>(
        document,
        options?.variables
      )
    },
    queryKey: options?.customQueryKey ?? [
      (document.definitions[0] as any).name.value,
      options?.variables,
      document
    ]
  }

  return useQuery(adjustedOptions)
}

export function useSuspenseGraphQL<TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  options?: Omit<
    UseQueryOptions<TResult, Error, TResult, any[]>,
    'queryKey' | 'queryFn'
  > & {
    variables?: TVariables
    customQueryKey?: unknown[]
  }
): UseSuspenseQueryResult<TResult, Error> {
  const adjustedOptions: UseQueryOptions<TResult, Error, TResult, any[]> = {
    ...options,
    queryFn: async () => {
      return typedGraphQLRequest<TResult, TVariables>(
        document,
        options?.variables
      )
    },
    queryKey: options?.customQueryKey ?? [
      (document.definitions[0] as any).name.value,
      options?.variables,
      document
    ]
  }

  return useSuspenseQuery(adjustedOptions)
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
