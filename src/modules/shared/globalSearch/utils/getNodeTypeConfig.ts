import { Layers3, LayoutGrid, ShoppingCart } from 'lucide-react'

import type { NodeType, NodeTypeConfig } from '../types'

/**
 * Visual configuration for each node type
 * Provides colors, icons, and badge variants for consistent UI representation
 */
const NODE_TYPE_CONFIG: Record<NodeType, NodeTypeConfig> = {
  System: {
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    badgeVariant: 'default',
    icon: LayoutGrid,
    label: 'System'
  },
  Order: {
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950',
    badgeVariant: 'outline',
    icon: ShoppingCart,
    label: 'Order'
  },
  CatalogueItem: {
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    badgeVariant: 'secondary',
    icon: Layers3,
    label: 'Catalogue Item'
  }
}

/**
 * Get visual configuration for a specific node type
 */
export const getNodeTypeConfig = (nodeType: NodeType): NodeTypeConfig => {
  return NODE_TYPE_CONFIG[nodeType]
}
