import { z } from 'zod'

import type {
  CleaningScheduleDay,
  PrescribedClothing,
  PurityClass,
  RoomCardStatus
} from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

export const roomCardSchema = z.object({
  // Required fields
  status: z.custom<RoomCardStatus>(
    data => typeof data === 'string',
    'Status is required'
  ),
  operationalState: z.custom<CodebookType>().nullable().optional(),
  name: z.string().min(1, 'Name is required'),
  // Contacts (Hall, Dept, Teams) and Locations are now managed via direct GraphQL mutations
  // and are no longer part of the form validation

  // Fields that exist in RoomCardFormType
  purityClass: z.custom<PurityClass>(),
  prescribedClothing: z.array(z.custom<PrescribedClothing>()),
  entryToHvacTent: z.string(),
  additionalRequirements: z.string(),
  cleaningScheduleDays: z.array(z.custom<CleaningScheduleDay>()).optional(),
  cleaningScheduleDate: z.string().nullable().optional(),
  coolingWater: z.string(),
  indoorEnvironmentQuality: z.string(),
  compressedAirDistribution: z.string(),
  nitrogenCentralDistribution: z.string(),
  maxPressureInColdDistribution: z.string(),
  coolingWaterClient: z.string(),
  indoorEnvironmentQualityClient: z.string(),
  compressedAirDistributionClient: z.string(),
  nitrogenCentralDistributionClient: z.string(),
  maxPressureInColdDistributionClient: z.string()
})
