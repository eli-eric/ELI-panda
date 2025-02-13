import {
  BookOpenIcon,
  CreditCardIcon,
  HomeIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  TableCellsIcon,
  UserGroupIcon,
  UserIcon,
  WrenchScrewdriverIcon
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
  SYSTEMS_MULTI_MOVE = '/systems/multi-move',
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
  PROFILE_TEAM = '/profile/team',
  LAYOUT = '/layout',
  PUBLICATIONS = '/publications',
  PUBLICATION = '/publication',
  SERVICES = '/catalogue/services',
  SERVICE = '/catalogue/service'
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
      },
      {
        path: PATH.SYSTEMS_MULTI_MOVE,
        name: 'Multi Move',
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
  },
  {
    name: 'Publications',
    link: PATH.PUBLICATIONS,
    role: ROLE.PUBLICATIONS_VIEW,
    Icon: BookOpenIcon
  },
  {
    name: 'Services',
    link: PATH.SERVICES,
    role: ROLE.BASICS,
    Icon: WrenchScrewdriverIcon
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
  PATH.PUBLICATION,
  PATH.PUBLICATIONS,
  PATH.SERVICE,
  PATH.SERVICES,
  PATH.LAYOUT
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
  [PATH.CODEBOOKS]: [ROLE.CODEBOOKS_ADMIN],
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
  [PATH.SYSTEMS_MULTI_MOVE]: [ROLE.SYSTEM_EDIT],
  [PATH.LAYOUT]: [ROLE.BASICS],
  [PATH.PUBLICATIONS]: [ROLE.PUBLICATIONS_VIEW, ROLE.PUBLICATIONS_EDIT],
  [PATH.PUBLICATION]: [ROLE.PUBLICATIONS_VIEW, ROLE.PUBLICATIONS_EDIT],
  [PATH.SERVICES]: [ROLE.SERVICE_VIEW, ROLE.SERVICE_EDIT, ROLE.BASICS],
  [PATH.SERVICE]: [ROLE.SERVICE_VIEW, ROLE.SERVICE_EDIT, ROLE.BASICS],
  [PATH.ROOT]: []
}
