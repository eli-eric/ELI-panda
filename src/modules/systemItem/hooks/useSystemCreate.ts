import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { addSubsystem } from '@/modules/systems/utils'
import { gql } from '@/types/gql'
import { Actions } from '@/types/gql/graphql'
import type { SystemsResponse } from '@/types/responses/systems'
import { navigateBack } from '@/utils'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'

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
  const router = useRouter()
  const { queryKey, refetch } = useSystems('systems')
  const queryClient = useQueryClient()
  const parentUid = router.query.parentUid as string | undefined
  const { data: session } = useSession()

  // Get access to the store for operators and maintainedBy
  const {
    newOperators,
    newMaintainedBy,
    clear: clearStore
  } = useSystemItemStore()

  const onCompleted = (
    { createSystems: { systems } },
    saveAndExit?: boolean
  ) => {
    const responseUid = systems[0].uid
    const body = systems[0]

    // Clear the store after successful creation
    clearStore()

    if (imageRef?.current) {
      try {
        imageRef.current.submit(responseUid, () => {
          toast.success(`System ${body.name} was saved successfully`)

          if (parentUid) {
            queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
              if (prev) {
                return addSubsystem(parentUid, body, prev)
              }
              return prev
            })
          } else {
            refetch()
          }

          // Comment out navigation to see the payload
          if (saveAndExit) {
            toast.success(
              'Would navigate back, but staying on page to see payload'
            )
            navigateBack()
          } else {
            toast.success(
              `Would navigate to /system/${responseUid}, but staying on page to see payload`
            )
            router.replace(`/system/${responseUid}`)
          }
        })
      } catch (error) {
        toast.success(
          `System ${body.name} was saved successfully, but images could not be uploaded.`
        )

        // Comment out navigation to see the payload
        if (saveAndExit) {
          toast.success(
            'Would navigate back, but staying on page to see payload'
          )
          navigateBack()
        } else {
          toast.success(
            `Would navigate to /system/${responseUid}, but staying on page to see payload`
          )
          router.replace(`/system/${responseUid}`)
        }
      }
    } else {
      toast.success(`System ${body.name} was saved successfully`)

      if (parentUid) {
        queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
          if (prev) {
            return addSubsystem(parentUid, body, prev)
          }
          return prev
        })
      } else {
        refetch()
      }

      // Comment out navigation to see the payload
      if (saveAndExit) {
        toast.success('Would navigate back, but staying on page to see payload')
        navigateBack()
      } else {
        toast.success(
          `Would navigate to /system/${responseUid}, but staying on page to see payload`
        )
        router.replace(`/system/${responseUid}`)
      }
    }
  }

  const { mutate: create, isPending } = useGraphQLMutation(
    createSystemMutation,
    {
      onError: error => {
        toast.error('Something went wrong: ' + error.message)
      }
    }
  )

  const createSystem = function (
    systemForm: SystemDetailFormType,
    saveAndExit?: boolean
  ) {
    try {
      // Check if required fields are provided
      if (!systemForm.name) {
        toast.error('System name is required')
        return
      }

      // Combine operators from both form and store
      const formOperators = systemForm?.operators || []
      const allOperators = [...formOperators, ...newOperators]
      const uniqueOperators = [
        ...new Map(allOperators.map(op => [op.uid, op])).values()
      ]

      // Combine maintainedBy from both form and store
      const formMaintainedBy = systemForm?.maintainedBy || []
      const allMaintainedBy = [...formMaintainedBy, ...newMaintainedBy]
      const uniqueMaintainedBy = [
        ...new Map(allMaintainedBy.map(emp => [emp.uid, emp])).values()
      ]

      // More detailed logging of the entire payload
      const payload = {
        input: [
          {
            parentSystem: parentUid
              ? {
                  connect: whereN(parentUid)
                }
              : undefined,
            name: systemForm.name || '',
            facility: {
              connect: whereC(session?.user?.facilityCode)
            },
            deleted: false,
            description: systemForm.description,
            attribute: connectN(systemForm?.attribute?.uid),
            responsibleTeam: connectN(systemForm?.responsibleTeam?.uid),
            minimalSpareParstCount: !systemForm.minimalSpareParstCount
              ? null
              : Number(systemForm.minimalSpareParstCount),
            systemCode:
              systemForm.systemCode === '' ? null : systemForm.systemCode,
            systemLevel: systemForm?.systemLevel,
            systemType: connectN(systemForm?.systemType?.uid),
            location: connectN(systemForm?.location?.uid),
            zone: connectN(systemForm?.zone?.uid),
            responsible: connectN(systemForm?.responsible?.uid),
            operators:
              uniqueOperators.length > 0
                ? {
                    connect: uniqueOperators.map(operator => ({
                      where: { node: { uid: operator.uid } }
                    }))
                  }
                : undefined,
            maintainedBy:
              uniqueMaintainedBy.length > 0
                ? {
                    connect: uniqueMaintainedBy.map(employee => ({
                      where: { node: { uid: employee.uid } }
                    }))
                  }
                : undefined,
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

      create(payload, {
        onSuccess: response => {
          onCompleted(response, saveAndExit)
        }
      })
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error creating system:', error)
      toast.error(
        `Failed to create system: ${error.message || 'Unknown error'}`
      )
    }
  }

  return { createSystem, loading: isPending }
}
