import React, { ReactNode } from 'react'
import { GrCatalog } from 'react-icons/gr'
import { BiCustomize } from 'react-icons/bi'
import { RoutePermittedRole } from '../shared/constants/AppConst'

export interface RouterConfigData {
  id: string
  title: string
  messageId: string
  icon?: string | ReactNode
  type: 'item' | 'group' | 'collapse' | 'divider'
  children?: RouterConfigData[]
  permittedRole?: RoutePermittedRole
  color?: string
  url?: string
  exact?: boolean
  count?: number
}

const routesConfig: RouterConfigData[] = [
  {
    id: 'app',
    title: 'Catalogue',
    messageId: 'Catalogue',
    type: 'group',
    children: [
      {
        id: 'catalog-list',
        title: 'Catalog items',
        messageId: 'Catalogue items',
        type: 'item',
        icon: <GrCatalog />,
        url: '/catalog/catalog-list'
      },
      {
        id: 'catalog-category',
        title: 'Catalog categories',
        messageId: 'Catalogue categories',
        type: 'item',
        icon: <BiCustomize />,
        url: '/catalog/catalog-category'
      }
    ]
  }
]
export default routesConfig
