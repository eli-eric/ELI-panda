import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { type MutableRefObject, useCallback } from 'react'
import { useIntl } from 'react-intl'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import {
    showErrorToast,
    showSuccessToast,
    validateSystemForm as validateForm,
} from '@/modules/systemItem/utils/hookHelpers'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { addSubsystem } from '@/modules/systems/utils'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { gql } from '@/types/gql'
import type { SystemLevel } from '@/types/gql/graphql'
import { Actions } from '@/types/gql/graphql'
import type { SystemsResponse } from '@/types/responses/systems'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

import type { SystemCreateFormData } from '../schema'
import { useSystemCreateParentStore } from '../store/useSystemCreateParentStore'

const createSystemMutation = gql(`
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
       ...SystemDetail
      }
    }
  }
`)

export const useSystemCreate = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
    const intl = useIntl()
    const { queryKey, refetch } = useSystems('systems')
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    const { closeModal } = useDynamicModalStore()
    const { parentUid, clear } = useSystemCreateParentStore()

    // Handle cache updates
    const handleCacheUpdate = useCallback(
        (body: any) => {
            if (parentUid) {
                queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
                    return prev ? addSubsystem(parentUid, body, prev) : prev
                })
            } else {
                refetch()
            }
        },
        [parentUid, queryClient, queryKey, refetch],
    )

    // Handle success completion
    const handleSuccess = useCallback(
        (responseUid: string, body: any) => {
            showSuccessToast(intl, message.systemsPage.systemDetail.createModal.onSuccess, {
                name: body.name,
            })

            handleCacheUpdate(body)
            // NOTE: Modal is opened with ID 'system-create' in useSystemCreateSheet.ts
            closeModal('system-create')
            clear()
        },
        [intl, handleCacheUpdate, closeModal, clear],
    )

    // Handle image upload with success/error scenarios
    const handleImageUpload = useCallback(
        (responseUid: string, body: any) => {
            if (!imageRef?.current) {
                handleSuccess(responseUid, body)
                return
            }

            try {
                imageRef.current.submit(responseUid, () => {
                    handleSuccess(responseUid, body)
                })
            } catch (error) {
                showSuccessToast(
                    intl,
                    message.systemsPage.systemDetail.createModal.onSuccessWithImageError,
                    { name: body.name },
                )

                handleCacheUpdate(body)
                // NOTE: Modal is opened with ID 'system-create' in useSystemCreateSheet.ts
                closeModal('system-create')
                clear()
            }
        },
        [intl, imageRef, handleSuccess, handleCacheUpdate, closeModal, clear],
    )

    // Main completion handler
    const onCompleted = useCallback(
        ({ createSystems: { systems } }) => {
            const responseUid = systems[0].uid
            const body = systems[0]

            handleImageUpload(responseUid, body)
        },
        [handleImageUpload],
    )

    // Validation function using shared helper
    const validateSystemForm = useCallback(
        (systemForm: SystemCreateFormData) => {
            return validateForm(systemForm, intl)
        },
        [intl],
    )

    // Build the mutation payload
    const buildPayload = useCallback(
        (systemForm: SystemCreateFormData) => {
            return {
                input: [
                    {
                        parentSystem: parentUid ? { connect: whereN(parentUid) } : undefined,
                        name: systemForm.name || '',
                        facility: { connect: whereC(session?.user?.facilityCode) },
                        deleted: false,
                        description: systemForm.description || null,
                        attribute: connectN(systemForm?.attribute?.uid),
                        systemCode: systemForm.systemCode || null,
                        systemLevel: systemForm.systemLevel as SystemLevel,
                        systemType: connectN(systemForm?.systemType?.uid),
                        location: connectN(systemForm?.location?.uid),
                        zone: connectN(systemForm?.zone?.uid),
                        responsible: connectN(systemForm?.responsible?.uid),
                        updatedBy: {
                            connect: [
                                {
                                    where: { node: { uid: session?.user?.uid } },
                                    edge: { action: Actions.Insert },
                                },
                            ],
                        },
                    },
                ],
            }
        },
        [parentUid, session?.user?.facilityCode, session?.user?.uid],
    )

    const { mutate: create, isPending } = useGraphQLMutation(createSystemMutation, {
        onError: error => {
            showErrorToast(intl, message.systemsPage.systemDetail.createModal.onError, {
                error: error.message,
            })
        },
    })

    // Main create system function
    const createSystem = useCallback(
        (systemForm: SystemCreateFormData) => {
            try {
                if (!validateSystemForm(systemForm)) {
                    return
                }

                const payload = buildPayload(systemForm)

                create(payload, {
                    onSuccess: response => {
                        onCompleted(response)
                    },
                })
            } catch (error: any) {
                showErrorToast(intl, message.systemsPage.systemDetail.createModal.onCreateError, {
                    error: error.message || 'Unknown error',
                })
            }
        },
        [intl, validateSystemForm, buildPayload, create, onCompleted],
    )

    return {
        createSystem,
        loading: isPending,
    }
}
