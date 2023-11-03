import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { MutableRefObject } from 'react'
import { toast } from 'react-hot-toast'

import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { systemsRefresh } from '@/modules/systems/utils'
import { PATH } from '@/types/constants/paths'
import type { Mutation, MutationCreateSystemsArgs } from '@/types/gql/graphql'
import { connectN } from '@/utils/graphql/mutations'

import type { SystemDetailFormType } from '../types/form'
import { useParentSystemDetail } from './useParentSystemDetail'

const CREATE_SYSTEM = gql`
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
        name
        uid
      }
    }
  }
`

export const useSystemCreate = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const router = useRouter()
  const { mutate } = useSystems('systems')
  const { parentUid } = useParentSystemDetail()
  const { data: session } = useSession()

  const [create, { loading }] = useMutation<Mutation, MutationCreateSystemsArgs>(CREATE_SYSTEM, {
    onCompleted: ({ createSystems: { systems } }) => {
      const responseUid = systems[0].uid
      imageRef?.current?.submit(responseUid, () => {
        toast.success(`System ${responseUid} saved successfully`)
        router.replace(PATH.SYSTEM + '/' + responseUid)
        mutate(systemsRefresh, { revalidate: false })
      })
    }
  })

  const createSystem = (systemForm: SystemDetailFormType) => {
    create({
      variables: {
        input: [
          {
            parentSystem: parentUid
              ? {
                  connect: {
                    where: {
                      node: {
                        uid: parentUid
                      }
                    }
                  }
                }
              : undefined,
            name: systemForm.name,
            facility: {
              connect: {
                where: {
                  node: {
                    code: session?.user.facilityCode
                  }
                }
              }
            },
            deleted: false,
            description: systemForm.description,
            systemCode: systemForm.systemCode,
            systemAlias: systemForm.systemAlias,
            systemLevel: systemForm?.systemLevel,
            systemType: connectN(systemForm?.systemType?.uid),
            location: connectN(systemForm?.location?.uid),
            zone: connectN(systemForm?.zone?.uid),
            responsible: connectN(systemForm?.responsible?.uid)
          }
        ]
      }
    })
  }

  return { createSystem, loading }
}
