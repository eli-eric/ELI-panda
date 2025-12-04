import { z } from 'zod'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type {
  CleaningScheduleDay,
  OperationalState,
  PrescribedClothing,
  PurityClass,
  RoomCardStatus
} from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import type { ContactPersonsHall, EmployeeType } from '../types/form'

export const roomCardSchema = z.object({
  // Required fields - matching Yup validation
  status: z.custom<RoomCardStatus>(
    data => typeof data === 'string',
    'Status is required'
  ),
  operationalState: z.custom<OperationalState>().nullable().optional(),
  name: z.string().min(1, 'Name is required'),
  teams: z
    .array(z.custom<CodebookType>())
    .min(1, 'At least one team is required'),
  contactPersonsHall: z
    .array(z.custom<ContactPersonsHall>())
    .min(1, 'At least one Hall contact is required'),
  contactPersonsDept: z
    .array(z.custom<EmployeeType>())
    .min(1, 'At least one department contact is required'),
  locations: z
    .array(z.custom<Codebooktree>())
    .min(1, 'At least one location is required'),

  // Fields that exist in RoomCardFormType - not optional in the type
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
