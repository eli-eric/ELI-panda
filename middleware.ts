import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PATH } from '@/types/constants/paths'
import { Role } from '@/types/constants/roles'

const PROTECTED_PATHS = [PATH.DASHBOARD, PATH.CATALOGUE, PATH.SYSTEMS, PATH.SYSTEMS_OVERVIEW]

const ROLES_CONFIG: Record<Role, PATH> = {
  [Role.BASICS]: PATH.DASHBOARD,
  [Role.CATALOGUE_VIEW]: PATH.CATALOGUE,
  [Role.SYSTEMS_VIEW]: PATH.SYSTEMS,
  [Role.REPORTS_VIEW]: PATH.REPORTS
}

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl
  const matchesProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  if (matchesProtectedPath) {
    const user = await getToken({ req: request })
    if (!user) {
      const url = new URL(`/`, request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }
    const alowedPages = user.roles.map(role => {
      return ROLES_CONFIG[role].toString()
    })
    const matchesAllowedPages = alowedPages.some(path => pathname.startsWith(path))
    if (!matchesAllowedPages) {
      const url = new URL(`/404`, request.url)
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
