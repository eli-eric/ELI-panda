import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'

import { CATALOGUE_CATEGORY_DETAIL_QUERY_KEY } from '../../types/constants'

const createGroupMutation = gql`
    mutation CreateCategoryPropertyGroup($categoryUid: ID!, $name: String!, $groupUid: String!) {
        updateCatalogueCategories(
            where: { uid: $categoryUid }
            update: {
                hasGroupCatalogueCategoryPropertyGroups: {
                    create: [{ node: { uid: $groupUid, name: $name } }]
                }
            }
        ) {
            catalogueCategories {
                uid
            }
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

const updateGroupMutation = gql`
    mutation UpdateCategoryPropertyGroup($groupUid: String!, $name: String!) {
        updateCatalogueCategoryPropertyGroups(where: { uid: $groupUid }, update: { name: $name }) {
            catalogueCategoryPropertyGroups {
                uid
            }
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

const deleteGroupMutation = gql`
    mutation DeleteCategoryPropertyGroup($groupUid: String!) {
        deleteCatalogueCategoryPropertyGroups(where: { uid: $groupUid }) {
            nodesDeleted
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

export const useCategoryPropertyGroupMutations = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORY_DETAIL_QUERY_KEY] })

    const toastWrap = <T>(promise: Promise<T>) => {
        toast.promise(promise, {
            loading: fm({ id: message.catalogue.toast.saving }),
            success: fm({ id: message.catalogue.toast.saved }),
            error: fm({ id: message.common.errors.somethingWentWrong }),
        })
        return promise
    }

    const create = useGraphQLMutation(createGroupMutation, { onSuccess: invalidate })
    const update = useGraphQLMutation(updateGroupMutation, { onSuccess: invalidate })
    const remove = useGraphQLMutation(deleteGroupMutation, { onSuccess: invalidate })

    const createGroup = useCallback(
        (categoryUid: string, name: string) =>
            toastWrap(
                create.mutateAsync({
                    categoryUid,
                    name,
                    groupUid:
                        typeof crypto !== 'undefined' && 'randomUUID' in crypto
                            ? crypto.randomUUID()
                            : `group-${Date.now()}`,
                }),
            ),
        [create],
    )
    const updateGroup = useCallback(
        (groupUid: string, name: string) => toastWrap(update.mutateAsync({ groupUid, name })),
        [update],
    )
    const deleteGroup = useCallback(
        (groupUid: string) => toastWrap(remove.mutateAsync({ groupUid })),
        [remove],
    )

    return {
        createGroup,
        updateGroup,
        deleteGroup,
        isPending: create.isPending || update.isPending || remove.isPending,
    }
}
