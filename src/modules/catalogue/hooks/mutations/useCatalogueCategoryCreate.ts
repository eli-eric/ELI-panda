import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQueryClient } from '@tanstack/react-query'
import gql from 'graphql-tag'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'

import { CATALOGUE_CATEGORIES_QUERY_KEY } from '../../types/constants'

const mutation = gql`
    mutation CreateCatalogueCategoryQuick($input: [CatalogueCategoryCreateInput!]!) {
        createCatalogueCategories(input: $input) {
            catalogueCategories {
                uid
                name
                code
            }
        }
    }
` as TypedDocumentNode<
    {
        createCatalogueCategories: {
            catalogueCategories: Array<{ uid: string; name: string; code: string }>
        }
    },
    Record<string, unknown>
>

export interface QuickCreateCategoryInput {
    name: string
    code: string
    parentUid?: string | null
}

export const useCatalogueCategoryCreate = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useGraphQLMutation(mutation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATALOGUE_CATEGORIES_QUERY_KEY] })
        },
    })

    const createCategory = useCallback(
        async ({ name, code, parentUid }: QuickCreateCategoryInput) => {
            const input: Record<string, unknown> = { name, code }
            if (parentUid) {
                input.parentCategory = {
                    connect: { where: { node: { uid: parentUid } } },
                }
            }

            const promise = mutateAsync({ input: [input] })
            toast.promise(promise, {
                loading: fm({ id: message.catalogue.toast.creating }),
                success: fm({ id: message.catalogue.toast.created }),
                error: fm({ id: message.common.errors.somethingWentWrong }),
            })
            const result = await promise
            return result.createCatalogueCategories.catalogueCategories[0]
        },
        [fm, mutateAsync],
    )

    return { createCategory, isPending }
}
