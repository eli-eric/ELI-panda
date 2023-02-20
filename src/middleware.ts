import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const PROTECTED_PATHS = [PATH.DASHBOARD, PATH.CATALOGUE, PATH.SYSTEMS, PATH.SYSTEMS_OVERVIEW, PATH.REPORTS]

const PATH_ROLES_CONFIG: Record<PATH, ROLE[]> = {
  [PATH.CATALOGUE]: [ROLE.CATALOGUE_CATEGORY_EDIT, ROLE.CATALOGUE_EDIT, ROLE.CATALOGUE_VIEW],
  [PATH.DASHBOARD]: [ROLE.BASICS],
  [PATH.REPORTS]: [ROLE.REPORTS_VIEW],
  [PATH.SYSTEMS]: [ROLE.SYSTEM_EDIT, ROLE.SYSTEMS_VIEW],
  [PATH.SYSTEMS_OVERVIEW]: [ROLE.SYSTEMS_VIEW, ROLE.SYSTEM_EDIT],
  [PATH.ROOT]: []
}

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const matchesProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  if (matchesProtectedPath) {
    const user = await getToken({ req: request })
    if (!user) {
      const url = new URL(PATH.ROOT, request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }
    const currentPath = Object.keys(PATH_ROLES_CONFIG).find(key => pathname.startsWith(key)) as PATH
    const matchRolesToPath = PATH_ROLES_CONFIG[currentPath].some(role => user.roles.includes(role))
    if (!matchRolesToPath) {
      const url = new URL(`/404`, request.url)
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
