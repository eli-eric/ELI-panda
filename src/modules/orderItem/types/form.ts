import type { FieldValues } from 'react-hook-form'

import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

export interface OrderDetailFormType extends FieldValues {
  uid: string
  lastUpdateTime?: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  notes: string
  supplier: CodebookType
  orderStatus: CodebookType

  procurementResponsible: CodebookType
  requestor: CodebookType
  serviceLines: ServiceLine[]
  orderDate: string
  orderLines: OrderLineFormType[]
}

/**
 * System configuration for each order line row in Step 3
 *
 * How parent system works:
 * - For "new" systems: `parentSystem` = globalParentSystem (user's selection)
 * - For "existing" systems: `parentSystem` = parent of the selected system (from parentPath)
 */
export interface OrderLineSystemConfig {
  index: number
  itemName: string
  /** Parent system - used for BOTH new and existing systems */
  parentSystem: CodebookType | null
  /** Type of system: "new" creates a new system, "existing" links to existing system */
  systemType: 'new' | 'existing'
  /** System name - auto-filled from item name (new) or selected system (existing) */
  systemName: string
  /** Selected existing system - only populated when systemType is "existing" */
  selectedSystem?: CodebookType | null
}

export interface OrderLineFormType extends FieldValues {
  uuid?: string
  uid: string
  name: string
  catalogueUid?: string
  catalogueNumber: string
  system?: CodebookType
  parentSystem?: CodebookType
  location?: CodebookType
  itemUsage?: CodebookType
  price?: number
  currency?: string
  quantity?: number
  eun?: string
  notes?: string
  isDelivered?: boolean
  serialNumber?: string
  lastUpdateTime?: string
  serialNumbers?: string
  serviceOrderUid?: string
  serviceItemName?: string
}

/**
 * Extended type for Order Line Wizard form
 * Includes wizard-specific UI state fields that are not part of final order line
 */
export interface OrderLineWizardFormType extends OrderLineFormType {
  // Wizard-specific fields (UI state only, not submitted to backend)
  _selectedCatalogueItem?: any
  globalParentSystem?: CodebookType | null
  systemConfigs?: OrderLineSystemConfig[]
}

export interface ServiceLine extends FieldValues {
  uuid?: string
  uid?: string
  name: string
  serviceType: CodebookType
  item: CodebookType
  price: number
  currency: string
  notes?: string
  eun?: string
  serialNumber?: string
  isDelivered?: boolean
  lastUpdateTime?: string
  details?: CatalogueItemDetail[]
}

export interface ServiceLineFormType extends FieldValues {
  uuid?: string
  uid: string
  name: string
  serviceType: CodebookType
  items: ServiceLinePhysicalItem[]
  price: number
  currency: string
  notes?: string
  isDelivered?: boolean
  lastUpdateTime?: string
  details?: CatalogueItemDetail[]
  selectedProperties?: string[]
}

export interface ServiceLinePhysicalItem extends CodebookType {
  serialNumber: string
  eun: string
}
