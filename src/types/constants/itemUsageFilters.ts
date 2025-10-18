/**
 * Item Usage Filter Values
 * Used for filtering items in service line and system contexts
 *
 * These UIDs correspond to specific item usage categories in the database.
 */

export const ITEM_USAGE_FILTERS = {
  /**
   * Default filter for service line item selection
   *
   * Includes the following item usage categories:
   * - Operational items (equipment actively in use)
   * - Service equipment (tools and devices for maintenance)
   * - Maintenance items (parts and materials for upkeep)
   * - Replacement parts (components for repairs)
   * - Consumables (disposable materials)
   * - Spare parts (backup components)
   */
  SERVICE_LINE_DEFAULT: [
    '25c189d0-0564-43a7-90d9-65b7083bea98', // Operational items
    'a2aae89a-5cbe-4042-a726-44012b158226', // Service equipment
    '89d68bc5-82cc-45cf-80aa-8edb86bf52f1', // Maintenance items
    '5defcd49-5307-4b21-94b1-870b8f61a919', // Replacement parts
    '0c7a063d-2bb6-41ef-b808-a137e1deaaa0', // Consumables
    'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea' // Spare parts
  ]
} as const

export type ItemUsageFilterKey = keyof typeof ITEM_USAGE_FILTERS
