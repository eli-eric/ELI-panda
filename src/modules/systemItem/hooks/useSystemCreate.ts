import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { addSubsystem } from '@/modules/systems/utils'
import { PATH } from '@/types/constants/paths'
import type { Mutation, MutationCreateSystemsArgs } from '@/types/gql/graphql'
import { SYSTEM_DETAIL } from '@/utils/graphql/fragments'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

import type { SystemDetailFormType } from '../types/form'
import { useParentSystemDetail } from './useParentSystemDetail'

const CREATE_SYSTEM = gql`
  ${SYSTEM_DETAIL}
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
        ...SystemDetail
      }
    }
  }
`

export const useSystemCreate = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const router = useRouter()
  const { mutate } = useSystems('systems')
  const { parentUid } = useParentSystemDetail()
  const { data: session } = useSession()

  const onCompleted = ({ createSystems: { systems } }) => {
    const responseUid = systems[0].uid
    const body = systems[0]
    imageRef?.current?.submit(responseUid, () => {
      toast.success(`System ${responseUid} saved successfully`)
      router.replace(PATH.SYSTEM + '/' + responseUid)
      parentUid ? mutate(prev => prev && addSubsystem(parentUid, body, prev), { revalidate: false }) : mutate()
    })
  }

  const [create, { loading }] = useMutation<Mutation, MutationCreateSystemsArgs>(CREATE_SYSTEM, {
    onCompleted,
    onError: error => {
      toast.error('Something went wrong: ' + error.message)
    }
  })

  const createSystem = (systemForm: SystemDetailFormType) => {
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

            systemCode: systemForm.systemCode,
            systemAlias: systemForm.systemAlias,
            systemLevel: systemForm?.systemLevel,
            systemType: connectN(systemForm?.systemType?.uid),
            location: connectN(systemForm?.location?.uid),
            zone: connectN(systemForm?.zone?.uid),
            responsible: connectN(systemForm?.responsible?.uid),
            operators: {
              connect: systemForm?.operators?.map(operator => ({ where: { node: { uid: operator.uid } } }))
            },
            maintainedBy: {
              connect: systemForm?.maintainedBy?.map(employee => ({ where: { node: { uid: employee.uid } } }))
            }
          }
        ]
      }
    })
  }

  return { createSystem, loading }
}
