/**
 * Centralized Table IDs configuration
 * Used for PandaTable instances across the application
 */
export const TABLE_IDS = {
  // Main pages
  SYSTEMS: 'systems',
  CATALOGUE_ITEMS: 'catalogueItems',
  ORDERS: 'orders',
  PUBLICATIONS: 'publications',
  USERS: 'users',
  ROOM_CARDS: 'roomCards',

  // Modals & dialogs
  CATALOGUE_ITEMS_MODAL: 'catalogueItemsModal',
  CATALOGUE_ITEM_SELECT: 'catalogue-item-select',
  CODEBOOK_TREE: 'codebook-tree',
  CODEBOOK: 'codebook',
  SYSTEM_TYPE_TREE: 'system-type-tree',
  LOCATION_TREE: 'location-tree',

  // Service lines & items
  SERVICE_LINE_ITEMS_SELECT: 'items-select-table',

  // System spare parts
  SPARE_PARTS: 'spare-parts',
  SPARE_PART_FOR: 'sparePartFor',
  FOR_SYSTEM: 'for-system',
  SPARE_PARENT_SYSTEM_SELECT: 'spare-parent-system-select-table',

  // Item assignment & moving
  ASSIGN_ITEM_SYSTEMS: 'assign-item-systems',
  DESTINATION_SYSTEMS: 'destination-systems',
  OLD_ITEM_DESTINATION_SYSTEMS: 'old-item-destination-systems'
} as const

// Type for table IDs
export type TableId = (typeof TABLE_IDS)[keyof typeof TABLE_IDS]
