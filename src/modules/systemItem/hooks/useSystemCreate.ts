import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { type MutableRefObject, useCallback } from 'react'
import { useIntl } from 'react-intl'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { addSubsystem } from '@/modules/systems/utils'
import { gql } from '@/types/gql'
import { Actions } from '@/types/gql/graphql'
import type { SystemsResponse } from '@/types/responses/systems'
import { navigateBack } from '@/utils'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

import type { SystemDetailFormType } from '../types/form'
import { showErrorToast, showSuccessToast, validateSystemForm } from '../utils/hookHelpers'

const createSystemMutation = gql(`
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
       ...SystemDetail
      }
    }
  }
`)

export const useSystemCreate = (
  imageRef?: MutableRefObject<ImageGalleryRef | undefined>
) => {
  const intl = useIntl()
  const router = useRouter()
  const { queryKey, refetch } = useSystems('systems')
  const queryClient = useQueryClient()
  const parentUid = router.query.parentUid as string | undefined
  const { data: session } = useSession()

  // Handle navigation logic
  const handleNavigation = useCallback(
    (responseUid: string, saveAndExit?: boolean) => {
      if (saveAndExit) {
        navigateBack()
      } else {
        router.replace(`/system/${responseUid}`)
      }
    },
    [router]
  )

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
    [parentUid, queryClient, queryKey, refetch]
  )

  // Handle success completion
  const handleSuccess = useCallback(
    (responseUid: string, body: any, saveAndExit?: boolean) => {
      showSuccessToast(
        intl,
        message.systemsPage.systemDetail.createModal.onSuccess,
        { name: body.name }
      )
      handleCacheUpdate(body)
      handleNavigation(responseUid, saveAndExit)
    },
    [intl, handleCacheUpdate, handleNavigation]
  )

  // Handle image upload with success/error scenarios
  const handleImageUpload = useCallback(
    (responseUid: string, body: any, saveAndExit?: boolean) => {
      if (!imageRef?.current) {
        handleSuccess(responseUid, body, saveAndExit)
        return
      }

      try {
        imageRef.current.submit(responseUid, () => {
          handleSuccess(responseUid, body, saveAndExit)
        })
      } catch (error) {
        showSuccessToast(
          intl,
          message.systemsPage.systemDetail.createModal.onSuccessWithImageError,
          { name: body.name }
        )
        handleCacheUpdate(body)
        handleNavigation(responseUid, saveAndExit)
      }
    },
    [intl, imageRef, handleSuccess, handleCacheUpdate, handleNavigation]
  )

  // Main completion handler
  const onCompleted = useCallback(
    ({ createSystems: { systems } }, saveAndExit?: boolean) => {
      const responseUid = systems[0].uid
      const body = systems[0]
      handleImageUpload(responseUid, body, saveAndExit)
    },
    [handleImageUpload]
  )

  // Build the mutation payload
  // Note: operators and maintainedBy can be added after system creation
  // via the separate useAddSystemEmployee hook
  const buildPayload = useCallback(
    (systemForm: SystemDetailFormType) => {
      return {
        input: [
          {
            parentSystem: parentUid
              ? { connect: whereN(parentUid) }
              : undefined,
            name: systemForm.name || '',
            facility: { connect: whereC(session?.user?.facilityCode) },
            deleted: false,
            description: systemForm.description,
            attribute: connectN(systemForm?.attribute?.uid),
            responsibleTeam: connectN(systemForm?.responsibleTeam?.uid),
            minimalSpareParstCount: systemForm.minimalSpareParstCount
              ? Number(systemForm.minimalSpareParstCount)
              : null,
            systemCode: systemForm.systemCode || null,
            systemLevel: systemForm?.systemLevel,
            systemType: connectN(systemForm?.systemType?.uid),
            location: connectN(systemForm?.location?.uid),
            zone: connectN(systemForm?.zone?.uid),
            responsible: connectN(systemForm?.responsible?.uid),
            updatedBy: {
              connect: [
                {
                  where: { node: { uid: session?.user?.uid } },
                  edge: { action: Actions.Insert }
                }
              ]
            }
          }
        ]
      }
    },
    [parentUid, session?.user?.facilityCode, session?.user?.uid]
  )

  const { mutate: create, isPending } = useGraphQLMutation(
    createSystemMutation,
    {
      onError: error => {
        showErrorToast(
          intl,
          message.systemsPage.systemDetail.createModal.onError,
          { error: error.message }
        )
      }
    }
  )

  // Main create system function
  const createSystem = useCallback(
    (systemForm: SystemDetailFormType, saveAndExit?: boolean) => {
      try {
        if (!validateSystemForm(systemForm, intl)) {
          return
        }

        const payload = buildPayload(systemForm)

        create(payload, {
          onSuccess: response => {
            onCompleted(response, saveAndExit)
          }
        })
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error('Error creating system:', error)
        showErrorToast(
          intl,
          message.systemsPage.systemDetail.createModal.onCreateError,
          { error: error.message || 'Unknown error' }
        )
      }
    },
    [intl, buildPayload, create, onCompleted]
  )

  return { createSystem, loading: isPending }
}
