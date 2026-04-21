import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'

import { CATALOGUE_CATEGORY_DETAIL_QUERY_KEY } from '../../types/constants'

const createPropertyMutation = gql`
    mutation CreateCategoryProperty(
        $groupUid: String!
        $name: String!
        $propertyUid: String!
    ) {
        updateCatalogueCategoryPropertyGroups(
            where: { uid: $groupUid }
            update: {
                containsPropertyCatalogueCategoryProperties: {
                    create: [
                        {
                            node: {
                                uid: $propertyUid
                                name: $name
                                defaultValue: ""
                                listOfValues: ""
                            }
                        }
                    ]
                }
            }
        ) {
            catalogueCategoryPropertyGroups {
                uid
            }
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

const updatePropertyMutation = gql`
    mutation UpdateCategoryProperty(
        $propertyUid: String!
        $name: String
        $defaultValue: String
        $listOfValues: String
    ) {
        updateCatalogueCategoryProperties(
            where: { uid: $propertyUid }
            update: { name: $name, defaultValue: $defaultValue, listOfValues: $listOfValues }
        ) {
            catalogueCategoryProperties {
                uid
            }
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

const deletePropertyMutation = gql`
    mutation DeleteCategoryProperty($propertyUid: String!) {
        deleteCatalogueCategoryProperties(where: { uid: $propertyUid }) {
            nodesDeleted
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

export const useCategoryPropertyMutations = () => {
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

    const create = useGraphQLMutation(createPropertyMutation, { onSuccess: invalidate })
    const update = useGraphQLMutation(updatePropertyMutation, { onSuccess: invalidate })
    const remove = useGraphQLMutation(deletePropertyMutation, { onSuccess: invalidate })

    const createProperty = useCallback(
        (groupUid: string, name: string) =>
            toastWrap(
                create.mutateAsync({
                    groupUid,
                    name,
                    propertyUid:
                        typeof crypto !== 'undefined' && 'randomUUID' in crypto
                            ? crypto.randomUUID()
                            : `prop-${Date.now()}`,
                }),
            ),
        [create],
    )
    const updateProperty = useCallback(
        (
            propertyUid: string,
            updates: { name?: string; defaultValue?: string; listOfValues?: string[] },
        ) => {
            const payload: Record<string, unknown> = { propertyUid }
            if (updates.name !== undefined) payload.name = updates.name
            if (updates.defaultValue !== undefined) payload.defaultValue = updates.defaultValue
            if (updates.listOfValues !== undefined)
                payload.listOfValues = updates.listOfValues.join('|')
            return toastWrap(update.mutateAsync(payload))
        },
        [update],
    )
    const deleteProperty = useCallback(
        (propertyUid: string) => toastWrap(remove.mutateAsync({ propertyUid })),
        [remove],
    )

    return {
        createProperty,
        updateProperty,
        deleteProperty,
        isPending: create.isPending || update.isPending || remove.isPending,
    }
}
