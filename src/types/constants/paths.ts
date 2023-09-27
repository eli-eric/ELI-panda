import { ROLE } from './roles'

export enum PATH {
  ROOT = '/',
  DASHBOARD = '/dashboard',
  CATALOGUE = '/catalogue',
  CATALOGUE_ITEM = '/catalogue/item',
  SYSTEMS = '/systems/overview',

  SYSTEMS_MOVING = '/systems/moving',
  SYSTEM = '/system',

  REPORTS = '/reports',
  ORDERS = '/orders',
  ORDER = '/order',
  CODEBOOKS = '/codebooks',
  ROOM_CARDS = '/room-cards',
  ROOM_CARD = '/room-card'
}

export const SUPPORT = 'https://eli-eric.atlassian.net/servicedesk/customer/portal/20'

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
    name: 'Dashboard',
    links: [{ path: PATH.DASHBOARD }],
    role: ROLE.BASICS
  },
  {
    name: 'Codebooks',
    links: [{ path: PATH.CODEBOOKS }],
    role: ROLE.CODEBOOKS_ADMIN
  },
  {
    name: 'Room Cards',
    links: [{ path: PATH.ROOM_CARDS }],
    role: ROLE.BASICS
  }
]
