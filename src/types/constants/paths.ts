import {
  CreditCardIcon,
  HomeIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  TableCellsIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import type { ElementType } from 'react'

import { ROLE } from './roles'

export enum PATH {
  ROOT = '/',
  DASHBOARD = '/dashboard',
  CATALOGUE = '/catalogue',
  CATALOGUE_ITEM = '/catalogue/item',
  SYSTEMS = '/systems/overview',
  SYSTEMS_MOVING = '/systems/moving',
  SPARE_PARTS = '/systems/spareparts',
  SYSTEM = '/system',
  SYSTEM_TYPE_EDIT = '/system/type-edit',
  SYSTEM_ALIAS = '/system/alias',
  REPORTS = '/reports',
  ORDERS = '/orders',
  ORDER = '/order',
  CODEBOOKS = '/codebooks',
  ROOM_CARDS = '/room-cards',
  ROOM_CARD = '/room-card',
  ADMIN_USERS = '/administration/users',
  ADMIN_USER = '/administration/user',
  ADMIN = '/administration',
  PROFILE_GENERAL = '/profile/general',
  PROFILE_SECURITY = '/profile/security',
  PROFILE_TEAM = '/profile/team'
}

export const SUPPORT =
  'mailto:panda@eli-laser.eu?subject=Support%20request&body=Please%20describe%20your%20problem%20here.%20Do%20not%20change%20the%20subject,%20please.'

export type NavBarLinkType = {
  path: PATH
  name?: string
  role: ROLE
}
export type NavigationType = {
  name: string
  links?: NavBarLinkType[]
  link?: string
  role: ROLE
  Icon: ElementType
}

export const NAV_BAR_CONFIG: NavigationType[] = [
  {
    name: 'Dashboard',
    link: PATH.DASHBOARD,
    role: ROLE.BASICS,
    Icon: HomeIcon
  },
  {
    name: 'Systems',
    links: [
      { path: PATH.SYSTEMS, name: 'Overview', role: ROLE.SYSTEMS_VIEW },
      { path: PATH.SYSTEMS_MOVING, name: 'Moving', role: ROLE.SYSTEM_EDIT },
      { path: PATH.SPARE_PARTS, name: 'Spare Parts', role: ROLE.SYSTEM_EDIT },
      {
        path: PATH.SYSTEM_TYPE_EDIT,
        name: 'System Type Edit',
        role: ROLE.SYSTEM_EDIT
      }
    ],
    role: ROLE.SYSTEMS_VIEW,
    Icon: RectangleGroupIcon
  },
  {
    name: 'Catalogue',
    link: PATH.CATALOGUE,
    role: ROLE.CATALOGUE_VIEW,
    Icon: RectangleStackIcon
  },
  {
    name: 'Orders',
    link: PATH.ORDERS,
    role: ROLE.ORDERS_VIEW,
    Icon: ShoppingCartIcon
  },
  {
    name: 'Codebooks',
    link: PATH.CODEBOOKS,
    role: ROLE.BASICS,
    Icon: TableCellsIcon
  },
  {
    name: 'Room Cards',
    link: PATH.ROOM_CARDS,
    role: ROLE.ROOM_CARD_VIEW,
    Icon: CreditCardIcon
  }
]

// Additional items for the bottom of the sidebar
export const USER_NAVIGATION = [
  {
    name: 'Profile',
    link: PATH.PROFILE_GENERAL,
    Icon: UserIcon,
    role: ROLE.BASICS
  },
  {
    name: 'Administration',
    link: PATH.ADMIN_USERS,
    Icon: UserGroupIcon,
    role: ROLE.ADMIN
  }
]
