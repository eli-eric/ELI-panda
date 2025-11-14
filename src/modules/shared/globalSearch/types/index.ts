import type { ElementType } from 'react'

/**
 * Node type for global search results
 */
export type NodeType = 'System' | 'Order' | 'CatalogueItem'

/**
 * Global search result item
 */
export interface GlobalSearchItem {
  uid: string
  name: string
  description: string
  nodeType: NodeType
}

/**
 * Global search API response
 */
export interface GlobalSearchResponse {
  data: GlobalSearchItem[]
  totalCount: number
}

/**
 * Configuration for node type visual representation
 */
export interface NodeTypeConfig {
  color: string
  bgColor: string
  badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline'
  icon: ElementType
  label: string
}

/**
 * Global search query parameters
 */
export interface GlobalSearchQuery {
  search?: string
  pagination?: number
}
