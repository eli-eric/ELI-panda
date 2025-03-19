import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { addSubsystem } from '@/modules/systems/utils'
import { PATH } from '@/types/constants/paths'
import { gql } from '@/types/gql'
import { Actions } from '@/types/gql/graphql'
import type { SystemsResponse } from '@/types/responses/systems'
import { navigateBack } from '@/utils'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

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

  const onCompleted = (
    { createSystems: { systems } },
    saveAndExit?: boolean
  ) => {
    const responseUid = systems[0].uid
    const body = systems[0]

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

          if (saveAndExit) {
            navigateBack()
          } else {
            router.replace(PATH.SYSTEM + '/' + responseUid)
          }
        })
      } catch (error) {
        console.error('Error submitting images:', error)
        toast.success(
          `System ${body.name} was saved successfully, but images could not be uploaded.`
        )

        if (saveAndExit) {
          navigateBack()
        } else {
          router.replace(PATH.SYSTEM + '/' + responseUid)
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

      if (saveAndExit) {
        navigateBack()
      } else {
        router.replace(PATH.SYSTEM + '/' + responseUid)
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

  const createSystem = (
    systemForm: SystemDetailFormType,
    saveAndExit?: boolean
  ) => {
    try {
      // Check if required fields are provided
      if (!systemForm.name) {
        toast.error('System name is required')
        return
      }

      create(
        {
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
              operators: {
                connect: systemForm?.operators?.map(operator => ({
                  where: { node: { uid: operator.uid } }
                }))
              },
              maintainedBy: {
                connect: systemForm?.maintainedBy?.map(employee => ({
                  where: { node: { uid: employee.uid } }
                }))
              },
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
        },
        {
          onSuccess: response => {
            onCompleted(response, saveAndExit)
          }
        }
      )
    } catch (error: any) {
      console.error('Error creating system:', error)
      toast.error(
        `Failed to create system: ${error.message || 'Unknown error'}`
      )
    }
  }

  return { createSystem, loading: isPending }
}
