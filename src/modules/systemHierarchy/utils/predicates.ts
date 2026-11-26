import type { SystemDetail } from '@/modules/shared/system/system-detail'

type SystemCounts = Pick<SystemDetail, 'physicalItem' | 'statistics'>

export const hasPhysicalItem = (system: Pick<SystemDetail, 'physicalItem'>) => !!system.physicalItem
export const hasSpareParts = (system: SystemCounts) => system.statistics.sparePartsCount > 0
export const hasSpareFor = (system: SystemCounts) => system.statistics.sparesForCount > 0
