import {
  Cog,
  Cpu,
  CreditCard,
  Home,
  Layers,
  LayoutGrid,
  Library,
  ShoppingCart,
  Table,
  Users,
  UserSearch
} from 'lucide-react'

import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { NavigationItem } from './types'

export const NAV_ITEMS: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: PATH.DASHBOARD,
    role: ROLE.BASICS,
    icon: Home
  },
  {
    title: 'Systems',
    url: PATH.SYSTEMS,
    role: ROLE.SYSTEMS_VIEW,
    icon: LayoutGrid,
    items: [
      { title: 'Overview', url: PATH.SYSTEMS, role: ROLE.SYSTEMS_VIEW },
      { title: 'Moving', url: PATH.SYSTEMS_MOVING, role: ROLE.SYSTEM_EDIT },
      { title: 'Spare Parts', url: PATH.SPARE_PARTS, role: ROLE.SYSTEM_EDIT },
      {
        title: 'System Type Edit',
        url: PATH.SYSTEM_TYPE_EDIT,
        role: ROLE.SYSTEM_EDIT
      },
      {
        title: 'Multi Move',
        url: PATH.SYSTEMS_MULTI_MOVE,
        role: ROLE.SYSTEM_EDIT
      }
    ]
  },
  {
    title: 'Control Systems',
    url: PATH.CONTROL_SYSTEMS,
    role: ROLE.CONTROL_SYSTEMS_VIEW,
    icon: Cpu,
    items: [
      {
        title: 'Overview',
        url: PATH.CONTROL_SYSTEMS,
        role: ROLE.CONTROL_SYSTEMS_VIEW
      },
      {
        title: 'Create System Codes',
        url: PATH.CONTROL_SYSTEMS_CREATE,
        role: ROLE.CONTROL_SYSTEMS_EDIT
      }
    ]
  },
  {
    title: 'Catalogue',
    url: PATH.CATALOGUE,
    role: ROLE.CATALOGUE_VIEW,
    icon: Layers
  },
  {
    title: 'Orders',
    url: PATH.ORDERS,
    role: ROLE.ORDERS_VIEW,
    icon: ShoppingCart
  },
  {
    title: 'Room Cards',
    url: PATH.ROOM_CARDS,
    role: ROLE.ROOM_CARD_VIEW,
    icon: CreditCard
  },
  {
    title: 'Publications',
    url: PATH.PUBLICATIONS,
    role: ROLE.PUBLICATIONS_VIEW,
    icon: Library
  },
  {
    title: 'Services',
    url: PATH.SERVICES,
    role: ROLE.BASICS,
    icon: Cog
  }
]

export const OTHERS_NAV_ITEMS: NavigationItem[] = [
  {
    title: 'Codebooks',
    url: PATH.CODEBOOKS,
    role: ROLE.BASICS,
    icon: Table
  },
  {
    title: 'Researchers',
    url: PATH.RESEARCHERS,
    role: ROLE.PUBLICATIONS_EDIT,
    icon: UserSearch
  },
  {
    title: 'Administration',
    url: PATH.ADMIN_USERS,
    role: ROLE.ADMIN,
    icon: Users
  }
]

export const PROTECTED_PATHS = [
  PATH.DASHBOARD,
  PATH.CATALOGUE,
  PATH.SYSTEMS,
  PATH.SYSTEM,
  PATH.REPORTS,
  PATH.ORDERS,
  PATH.ROOM_CARD,
  PATH.ROOM_CARDS,
  PATH.ADMIN_USERS,
  PATH.ADMIN_USER,
  PATH.ADMIN,
  PATH.PROFILE_GENERAL,
  PATH.PROFILE_SECURITY,
  PATH.PROFILE_TEAM,
  PATH.SYSTEMS_MOVING,
  PATH.SYSTEM_ALIAS,
  PATH.PUBLICATIONS,
  PATH.PUBLICATION,
  PATH.SERVICES,
  PATH.SERVICE,
  PATH.RESEARCHERS,
  PATH.CONTROL_SYSTEMS,
  PATH.CONTROL_SYSTEMS_CREATE
]

export const PATH_ROLES_CONFIG: Record<PATH, ROLE[]> = {
  [PATH.CATALOGUE]: [
    ROLE.CATALOGUE_CATEGORY_EDIT,
    ROLE.CATALOGUE_EDIT,
    ROLE.CATALOGUE_VIEW
  ],
  [PATH.CATALOGUE_ITEM]: [
    ROLE.CATALOGUE_CATEGORY_EDIT,
    ROLE.CATALOGUE_EDIT,
    ROLE.CATALOGUE_VIEW
  ],
  [PATH.DASHBOARD]: [ROLE.BASICS],
  [PATH.REPORTS]: [ROLE.REPORTS_VIEW],
  [PATH.SYSTEMS]: [ROLE.SYSTEM_EDIT, ROLE.SYSTEMS_VIEW],
  [PATH.ORDERS]: [
    ROLE.ORDERS_VIEW,
    ROLE.ORDERS_EDIT,
    ROLE.ORDERS_DELIVERY_EDIT
  ],
  [PATH.ORDER]: [ROLE.ORDERS_VIEW, ROLE.ORDERS_EDIT, ROLE.ORDERS_DELIVERY_EDIT],
  [PATH.SYSTEM]: [ROLE.SYSTEM_EDIT, ROLE.SYSTEMS_VIEW],
  [PATH.SYSTEMS_MOVING]: [ROLE.SYSTEM_EDIT],
  [PATH.SPARE_PARTS]: [ROLE.SYSTEM_EDIT],
  [PATH.CODEBOOKS]: [ROLE.ADMIN],
  [PATH.ROOM_CARD]: [ROLE.ROOM_CARD_VIEW, ROLE.ROOM_CARD_EDIT],
  [PATH.ROOM_CARDS]: [ROLE.ROOM_CARD_VIEW, ROLE.ROOM_CARD_EDIT],
  [PATH.ADMIN_USERS]: [ROLE.ADMIN],
  [PATH.ADMIN_USER]: [ROLE.ADMIN],
  [PATH.ADMIN]: [ROLE.ADMIN],
  [PATH.PROFILE_GENERAL]: [ROLE.BASICS],
  [PATH.PROFILE_SECURITY]: [ROLE.BASICS],
  [PATH.PROFILE_TEAM]: [ROLE.BASICS],
  [PATH.SYSTEM_ALIAS]: [ROLE.SYSTEMS_VIEW],
  [PATH.SYSTEM_TYPE_EDIT]: [ROLE.SYSTEM_TYPE_EDIT, ROLE.SYSTEM_TYPE_VIEW],
  [PATH.PUBLICATIONS]: [ROLE.BASICS],
  [PATH.PUBLICATION]: [ROLE.BASICS],
  [PATH.SERVICES]: [ROLE.BASICS],
  [PATH.SERVICE]: [ROLE.BASICS],
  [PATH.ROOT]: [],
  [PATH.LAYOUT]: [],
  [PATH.SYSTEM_ITEM]: [ROLE.SYSTEM_EDIT, ROLE.SYSTEMS_VIEW],
  [PATH.SYSTEMS_MULTI_MOVE]: [ROLE.SYSTEM_EDIT],
  [PATH.RESEARCHERS]: [ROLE.PUBLICATIONS_EDIT],
  [PATH.CONTROL_SYSTEMS]: [ROLE.BASICS],
  [PATH.CONTROL_SYSTEMS_CREATE]: [ROLE.BASICS],
  [PATH.NOT_FOUND]: []
}
