import type { SystemLeaf } from '../types'

export const hasPhysicalItem = (system: SystemLeaf) => !!system.physicalItem
export const hasSpareParts = (system: SystemLeaf) => (system.sparesIn ?? 0) > 0
export const hasSpareFor = (system: SystemLeaf) => (system.sparesOut ?? 0) > 0
