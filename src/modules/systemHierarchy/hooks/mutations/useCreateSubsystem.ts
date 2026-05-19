import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql, useFragment as unmaskFragment } from '@/types/gql'
import type { SystemLevel } from '@/types/gql/graphql'
import { SystemDetailFragment } from '@/utils/graphql/fragments'

import {
    HIERARCHY_QUERY_KEY,
    LEAVES_COUNT_QUERY_KEY,
    LEAVES_QUERY_KEY,
    RELATIONSHIP_GRAPH_QUERY_KEY,
} from '../../types/constants'
import {
    buildCreateSubsystemPayload,
    type BuildCreateSubsystemPayloadArgs,
} from '../../utils/buildCreateSubsystemPayload'

const createSubsystemMutation = gql(`
  mutation CreateSystems($input: [SystemCreateInput!]!) {
    createSystems(input: $input) {
      systems {
       ...SystemDetail
      }
    }
  }
`)

export interface CreateSubsystemInput {
    parentUid: string
    name: string
    systemLevel: SystemLevel
    inherit: BuildCreateSubsystemPayloadArgs['inherit']
}

export interface CreateSubsystemResult {
    uid: string
    name: string
    systemLevel: SystemLevel | null | undefined
}

export const useCreateSubsystem = () => {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    const { mutateAsync, isPending } = useGraphQLMutation(createSubsystemMutation, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [HIERARCHY_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [LEAVES_COUNT_QUERY_KEY] })
            queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
        },
    })

    const createSubsystem = useCallback(
        async (input: CreateSubsystemInput): Promise<CreateSubsystemResult> => {
            const sessionUserUid = session?.user?.uid
            const facilityCode = session?.user?.facilityCode
            if (!sessionUserUid || !facilityCode) {
                throw new Error('Missing session user or facility code')
            }
            const payload = buildCreateSubsystemPayload({
                parentUid: input.parentUid,
                name: input.name,
                systemLevel: input.systemLevel,
                sessionUserUid,
                facilityCode,
                inherit: input.inherit,
            })
            const response = await mutateAsync({ input: [payload] })
            const created = unmaskFragment(SystemDetailFragment, response.createSystems.systems[0])
            return {
                uid: created.uid,
                name: created.name,
                systemLevel: created.systemLevel,
            }
        },
        [mutateAsync, session?.user?.uid, session?.user?.facilityCode],
    )

    return { createSubsystem, isPending }
}
