import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { RoomCardUpdateInput, RoomCardWhere } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import { whereN } from '@/utils/graphql/mutations'

import type { RoomCardFormType } from '../types/form'

/**
 * Formats a date string to short date and medium time format (en-GB locale)
 * Example: "01/12/24, 14:30:45"
 */
export const formatDateTime = (dateString?: string | null): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(date)
}

/**
 * Checks if operational state has actually changed by comparing original and current values
 * Compares by uid to handle CodebookType objects
 * Treats null and undefined as equivalent (both represent "no value")
 */
export const hasOperationalStateChanged = (
  original: CodebookType | null | undefined,
  current: CodebookType | null | undefined
): boolean => {
  // Normalize null and undefined to null for consistent comparison
  const originalUid = original?.uid || null
  const currentUid = current?.uid || null

  return originalUid !== currentUid
}

type RoomCardUpdateType = {
  roomCard: RoomCardFormType
  disconnectLocations: Codebooktree[]
  newLocations: Codebooktree[]
  uid?: string
  originalOperationalState?: CodebookType | null
}

/**
 * Creates variables for RoomCard update mutation.
 * Note: Contacts (Hall, Dept, Teams) are now handled via separate direct mutations.
 * Only locations are managed through the form update.
 */
export const updateRoomCardVariables = ({
  uid,
  roomCard,
  newLocations,
  disconnectLocations,
  originalOperationalState
}: RoomCardUpdateType): {
  where: RoomCardWhere
  update: RoomCardUpdateInput
  operationalStateChanged: boolean
  originalOperationalState?: CodebookType | null
} => {
  const operationalStateChanged = hasOperationalStateChanged(
    originalOperationalState,
    roomCard.operationalState
  )

  return {
    where: {
      uid: uid
    },
    update: {
      name: roomCard.name,
      additionalRequirements: roomCard.additionalRequirements,
      cleaningScheduleDate: roomCard.cleaningScheduleDate,
      cleaningScheduleDays: roomCard.cleaningScheduleDays,
      compressedAirDistribution: roomCard.compressedAirDistribution,
      coolingWater: roomCard.coolingWater,
      entryToHvacTent: roomCard.entryToHvacTent,
      indoorEnvironmentQuality: roomCard.indoorEnvironmentQuality,
      maxPressureInColdDistribution: roomCard.maxPressureInColdDistribution,
      nitrogenCentralDistribution: roomCard.nitrogenCentralDistribution,
      prescribedClothing: roomCard.prescribedClothing,
      purityClass: roomCard.purityClass,
      compressedAirDistributionClient: roomCard.compressedAirDistributionClient,
      coolingWaterClient: roomCard.coolingWaterClient,
      indoorEnvironmentQualityClient: roomCard.indoorEnvironmentQualityClient,
      maxPressureInColdDistributionClient:
        roomCard.maxPressureInColdDistributionClient,
      nitrogenCentralDistributionClient:
        roomCard.nitrogenCentralDistributionClient,
      status: roomCard.status,
      operationalState: {
        connect: roomCard.operationalState?.uid
          ? { where: { node: { uid: roomCard.operationalState.uid } } }
          : undefined,
        disconnect:
          originalOperationalState?.uid &&
          originalOperationalState?.uid !== roomCard.operationalState?.uid
            ? { where: { node: { uid: originalOperationalState.uid } } }
            : undefined
      },
      ...(operationalStateChanged && {
        operationalStateLastUpdated: new Date().toISOString()
      }),
      // Contacts are now handled via separate mutations - NOT included here
      // contactPersonsDept, contactPersonsHall, teams - removed
      locations: [
        {
          connect: newLocations
            .filter(location => location?.uid)
            .map(location => whereN(location.uid)),
          disconnect: disconnectLocations
            .filter(location => location?.uid)
            .map(location => whereN(location.uid))
        }
      ]
    },
    operationalStateChanged,
    originalOperationalState
  }
}
