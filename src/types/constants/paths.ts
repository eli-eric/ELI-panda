import { ROLE } from './roles'

export enum PATH {
  ROOT = '/',
  DASHBOARD = '/dashboard',
  CATALOGUE = '/catalogue',
  CATALOGUE_ITEM = '/catalogue/item',
  SYSTEMS = '/systems/overview',

  SYSTEMS_MOVING = '/systems/moving',
  SYSTEM = '/system',
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
  role?: ROLE
}
export type NavigationType = {
  name: string
  links: NavBarLinkType[]
  role: ROLE
}[]

export const NAV_BAR_CONFIG: NavigationType = [
  {
    name: 'Systems',
    links: [
      { path: PATH.SYSTEMS, name: 'Systems', role: ROLE.SYSTEMS_VIEW },
      { path: PATH.SYSTEMS_MOVING, name: 'Moving', role: ROLE.SYSTEM_EDIT }
    ],
    role: ROLE.SYSTEMS_VIEW
  },
  {
    name: 'Catalogue',
    links: [{ path: PATH.CATALOGUE }],
    role: ROLE.CATALOGUE_VIEW
  },
  {
    name: 'Orders',
    links: [{ path: PATH.ORDERS }],
    role: ROLE.ORDERS_VIEW
  },
  {
    name: 'Codebooks',
    links: [{ path: PATH.CODEBOOKS }],
    role: ROLE.CODEBOOKS_ADMIN
  },
  {
    name: 'Room Cards',
    links: [{ path: PATH.ROOM_CARDS }],
    role: ROLE.ROOM_CARD_VIEW
  },
  {
    name: 'Dashboard',
    links: [{ path: PATH.DASHBOARD }],
    role: ROLE.BASICS
  }
]
