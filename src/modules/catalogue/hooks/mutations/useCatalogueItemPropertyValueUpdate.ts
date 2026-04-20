import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'

import { CATALOGUE_ITEM_DETAIL_QUERY_KEY } from '../../types/constants'

const mutation = gql`
    mutation UpdateCatalogueItemPropertyValue(
        $where: CatalogueItemWhere!
        $update: CatalogueItemUpdateInput!
    ) {
        updateCatalogueItems(where: $where, update: $update) {
            catalogueItems {
                uid
            }
        }
    }
` as TypedDocumentNode<unknown, Record<string, unknown>>

export const useCatalogueItemPropertyValueUpdate = (itemUid: string) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useGraphQLMutation(mutation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_ITEM_DETAIL_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: ['history'] })
        },
    })

    const updatePropertyValue = useCallback(
        async (propertyUid: string, value: unknown) => {
            const promise = mutateAsync({
                where: { uid: itemUid },
                update: {
                    propertiesConnection: {
                        where: { node: { uid: propertyUid } },
                        update: { edge: { value: value == null ? null : String(value) } },
                    },
                },
            })
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.saving }),
                success: fm({ id: message.catalogue.toast.saved }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            return promise
        },
        [fm, itemUid, mutateAsync],
    )

    return { updatePropertyValue, isPending }
}
