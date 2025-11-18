import { Layers3, LayoutGrid, ShoppingCart } from 'lucide-react'

import type { NodeType } from '../types'
import { getNodeTypeConfig } from '../utils/getNodeTypeConfig'

describe('getNodeTypeConfig', () => {
  it('returns correct config for System node type', () => {
    const config = getNodeTypeConfig('System')

    expect(config).toEqual({
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      badgeVariant: 'default',
      icon: LayoutGrid,
      label: 'System'
    })
  })

  it('returns correct config for Order node type', () => {
    const config = getNodeTypeConfig('Order')

    expect(config).toEqual({
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
      badgeVariant: 'outline',
      icon: ShoppingCart,
      label: 'Order'
    })
  })

  it('returns correct config for CatalogueItem node type', () => {
    const config = getNodeTypeConfig('CatalogueItem')

    expect(config).toEqual({
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      badgeVariant: 'secondary',
      icon: Layers3,
      label: 'Catalogue Item'
    })
  })

  it('returns icon component that can be instantiated', () => {
    const nodeTypes: NodeType[] = ['System', 'Order', 'CatalogueItem']

    nodeTypes.forEach(nodeType => {
      const config = getNodeTypeConfig(nodeType)
      expect(config.icon).toBeDefined()
      // Icons are React components (objects in Jest environment)
      expect(config.icon).toBeTruthy()
    })
  })

  it('all configs have required properties', () => {
    const nodeTypes: NodeType[] = ['System', 'Order', 'CatalogueItem']

    nodeTypes.forEach(nodeType => {
      const config = getNodeTypeConfig(nodeType)

      expect(config).toHaveProperty('color')
      expect(config).toHaveProperty('bgColor')
      expect(config).toHaveProperty('badgeVariant')
      expect(config).toHaveProperty('icon')
      expect(config).toHaveProperty('label')

      expect(typeof config.color).toBe('string')
      expect(typeof config.bgColor).toBe('string')
      expect(typeof config.badgeVariant).toBe('string')
      expect(typeof config.label).toBe('string')
    })
  })

  it('each node type has unique colors', () => {
    const systemConfig = getNodeTypeConfig('System')
    const orderConfig = getNodeTypeConfig('Order')
    const catalogueConfig = getNodeTypeConfig('CatalogueItem')

    // Verify colors are different
    expect(systemConfig.color).not.toBe(orderConfig.color)
    expect(systemConfig.color).not.toBe(catalogueConfig.color)
    expect(orderConfig.color).not.toBe(catalogueConfig.color)

    // Verify background colors are different
    expect(systemConfig.bgColor).not.toBe(orderConfig.bgColor)
    expect(systemConfig.bgColor).not.toBe(catalogueConfig.bgColor)
    expect(orderConfig.bgColor).not.toBe(catalogueConfig.bgColor)
  })

  it('each node type has unique icons', () => {
    const systemConfig = getNodeTypeConfig('System')
    const orderConfig = getNodeTypeConfig('Order')
    const catalogueConfig = getNodeTypeConfig('CatalogueItem')

    expect(systemConfig.icon).not.toBe(orderConfig.icon)
    expect(systemConfig.icon).not.toBe(catalogueConfig.icon)
    expect(orderConfig.icon).not.toBe(catalogueConfig.icon)
  })
})
