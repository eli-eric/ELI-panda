import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { gql } from '@/types/gql'
import { Actions } from '@/types/gql/graphql'
import { connectN, whereC } from '@/utils/graphql/mutations'

import type { SystemCreateFormData } from './types'

const createSystemMutation = gql(`
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
       ...SystemDetail
      }
    }
  }
`)

export const useSystemCreateHook = () => {
  const { refetch } = useSystems('systems')
  const { data: session } = useSession()
  const { closeModal } = useModalGlobalStore()

  const { mutate: create, isPending } = useGraphQLMutation(createSystemMutation)

  const createSystem = useCallback(
    (systemForm: SystemCreateFormData) => {
      const payload = {
        input: [
          {
            name: systemForm.name,
            facility: { connect: whereC(session?.user?.facilityCode) },
            deleted: false,
            description: systemForm.description || null,
            attribute: connectN(systemForm?.attribute?.uid),
            systemCode: systemForm.systemCode || null,
            systemLevel: systemForm.systemLevel,
            systemType: connectN(systemForm?.systemType?.uid),
            location: connectN(systemForm?.location?.uid),
            zone: connectN(systemForm?.zone?.uid),
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
        onSuccess: () => {
          refetch()
          closeModal('sheet')
        }
      })
    },
    [session?.user?.facilityCode, session?.user?.uid, create, refetch, closeModal]
  )

  return { 
    createSystem, 
    loading: isPending 
  }
}