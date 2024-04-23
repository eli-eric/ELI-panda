import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'
import { mutate as mutateEndpoint } from 'swr'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { addSubsystem, addSubsystemToSubsystems } from '@/modules/systems/utils'
import { PATH } from '@/types/constants/paths'
import type { Mutation } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

import type { SystemDetailFormType } from '../types/form'
import { useParentSystemDetail } from './useParentSystemDetail'
import { navigateBack } from '@/utils'

const createSystemMutation = gql`
  ${SYSTEM_DETAIL}
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
        ...SystemDetail
      }
    }
  }
`

export const useSystemCreate = (
  imageRef?: MutableRefObject<ImageGalleryRef | undefined>
) => {
  const router = useRouter()
  const { mutate } = useSystems('systems')
  const { parentUid } = useParentSystemDetail()
  const { data: session } = useSession()

  const { systemSubsystems } = useEndpoint({ uid: parentUid || '' })

  const onCompleted = (
    { createSystems: { systems } },
    saveAndExit?: boolean
  ) => {
    const responseUid = systems[0].uid
    const body = systems[0]
    imageRef?.current?.submit(responseUid, () => {
      toast.success(`System ${responseUid} saved successfully`)
      mutateEndpoint(
        systemSubsystems,
        prev => prev && addSubsystemToSubsystems(prev, body),
        {
          revalidate: false
        }
      )
      parentUid
        ? mutate(prev => prev && addSubsystem(parentUid, body, prev), {
            revalidate: false
          })
        : mutate()
      if (saveAndExit) {
        navigateBack()
      } else {
        router.replace(PATH.SYSTEM + '/' + responseUid)
      }
    })
  }

  const [create, { loading }] = useMutation<Mutation>(createSystemMutation, {
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  const createSystem = (
    systemForm: SystemDetailFormType,
    saveAndExit?: boolean
  ) => {
    create({
      variables: {
        input: [
          {
            parentSystem: parentUid
              ? {
                  connect: whereN(parentUid)
                }
              : undefined,
            name: systemForm.name,
            facility: {
              connect: whereC(session?.user?.facilityCode)
            },
            deleted: false,
            description: systemForm.description,
            isCritical: systemForm.isCritical,
            responsibleTeam: connectN(systemForm?.responsibleTeam?.uid),
            minimalSpareParstCount: !systemForm.minimalSpareParstCount
              ? null
              : Number(systemForm.minimalSpareParstCount),

            systemCode:
              systemForm.systemCode === '' ? null : systemForm.systemCode,
            systemAlias: systemForm.systemAlias,
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
                  edge: { action: 'INSERT' }
                }
              ]
            }
          }
        ]
      },
      onCompleted: response => {
        onCompleted(response, saveAndExit)
      }
    })
  }

  return { createSystem, loading }
}
