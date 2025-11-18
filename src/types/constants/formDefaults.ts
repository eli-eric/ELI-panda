/**
 * Default values for form components
 *
 * These constants provide consistent default values across the application
 * to ensure uniform behavior and data integrity.
 */

import { ITEM_USAGE_OPTION } from '@/modules/systems/types/constants'

/**
 * Default values for Order Line forms
 *
 * Used in:
 * - Order line creation wizard
 * - Order line edit forms
 */
export const ORDER_LINE_DEFAULTS = {
  /**
   * Default currency for order line items
   * Standard currency used across the ELI facility
   */
  currency: 'EUR',

  /**
   * Default item usage
   */
  itemUsage: ITEM_USAGE_OPTION.STOCK_ITEM
} as const

/**
 * Default values for Service Line forms
 *
 * Used in:
 * - Service line creation wizard
 * - Service line edit forms
 */
export const SERVICE_LINE_DEFAULTS = {
  /**
   * Default currency for service line items
   */
  currency: 'EUR'
} as const

export type OrderLineDefaultKey = keyof typeof ORDER_LINE_DEFAULTS
export type ServiceLineDefaultKey = keyof typeof SERVICE_LINE_DEFAULTS
