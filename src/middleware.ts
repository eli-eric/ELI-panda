import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { APP_BASE_URL } from './types/constants/common'

// This code is a middleware function that checks if the user has the correct
// roles to access a protected path. It imports two functions from 'next/server'
// and 'NextRequest' and 'NextResponse', as well as the getToken function
// from 'next-auth/jwt'. It also imports two constants, PATH and ROLE, from
// two different files.

// The PROTECTED_PATHS constant is an array of strings that represent protected
// paths. The PATH_ROLES_CONFIG constant is a record that maps each protected path to an array of roles.

// The middleware function checks if the current pathname matches any of the
// protected paths in the PROTECTED_PATHS array. If it does, it uses getToken to
// get the user object from the request and checks if any of their roles match any
// of the roles in the PATH_ROLES_CONFIG record for that path. If not, it redirects
// them to a 404 page. Finally, it returns NextResponse.next() if all checks pass.

const PROTECTED_PATHS = [
  PATH.DASHBOARD,
  PATH.CATALOGUE,
  PATH.SYSTEMS,
  PATH.REPORTS,
  PATH.ORDERS,
  PATH.ROOM_CARD,
  PATH.ROOM_CARDS
]

const PATH_ROLES_CONFIG: Record<PATH, ROLE[]> = {
  [PATH.CATALOGUE]: [ROLE.CATALOGUE_CATEGORY_EDIT, ROLE.CATALOGUE_EDIT, ROLE.CATALOGUE_VIEW],
  [PATH.CATALOGUE_ITEM]: [ROLE.CATALOGUE_CATEGORY_EDIT, ROLE.CATALOGUE_EDIT, ROLE.CATALOGUE_VIEW],
  [PATH.DASHBOARD]: [ROLE.BASICS],
  [PATH.REPORTS]: [ROLE.REPORTS_VIEW],
  [PATH.SYSTEMS]: [ROLE.SYSTEM_EDIT, ROLE.SYSTEMS_VIEW],
  [PATH.ORDERS]: [ROLE.ORDERS_VIEW, ROLE.ORDERS_EDIT, ROLE.ORDERS_DELIVERY_EDIT],
  [PATH.ORDER]: [ROLE.ORDERS_VIEW, ROLE.ORDERS_EDIT, ROLE.ORDERS_DELIVERY_EDIT],
  [PATH.SYSTEM]: [ROLE.SYSTEM_EDIT, ROLE.SYSTEMS_VIEW],
  [PATH.SYSTEMS_MOVING]: [ROLE.SYSTEM_EDIT],
  [PATH.CODEBOOKS]: [ROLE.CODEBOOKS_ADMIN],
  [PATH.ROOM_CARD]: [ROLE.ROOM_CARD_VIEW, ROLE.ROOM_CARD_EDIT],
  [PATH.ROOM_CARDS]: [ROLE.ROOM_CARD_VIEW, ROLE.ROOM_CARD_EDIT],
  [PATH.ROOT]: []
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const matchesProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  const user = await getToken({ req: request })
  if (matchesProtectedPath) {
    if (!user) {
      const url = new URL('/', request.url)
      url.searchParams.set('callbackUrl', encodeURI(APP_BASE_URL + pathname))
      return NextResponse.redirect(url)
    }
    const currentPath = Object.keys(PATH_ROLES_CONFIG).find(key => pathname.startsWith(key)) as PATH
    const matchRolesToPath = PATH_ROLES_CONFIG[currentPath].some(role => user.roles.includes(role))

    if (!matchRolesToPath) {
      const url = new URL(`/404`, request.url)
      return NextResponse.redirect(url)
    }
  }
  if (user) {
    if (pathname === PATH.ROOT) {
      const url = new URL(PATH.DASHBOARD, request.url)
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
