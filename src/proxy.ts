import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { PATH } from '@/types/constants/paths'

import { PATH_ROLES_CONFIG, PROTECTED_PATHS } from './lib/navigation/config'
import { APP_BASE_URL } from './types/constants/common'

// Precompute protected path entries sorted by length (longest first)
// This ensures more specific paths are matched before generic ones
// e.g., /system/item is matched before /system
const PROTECTED_PATH_ENTRIES = Object.keys(PATH_ROLES_CONFIG).sort((a, b) => b.length - a.length)
function shouldBypassAuthForE2E(): boolean {
    return process.env.PLAYWRIGHT_E2E === '1'
}

// Helper: Check if a pathname matches any protected path
function isProtectedPath(pathname: string): boolean {
    return PROTECTED_PATHS.some(path => pathname.startsWith(path))
}

// Helper: Find the matching protected path configuration
function findMatchingProtectedPath(pathname: string): PATH | null {
    const match = PROTECTED_PATH_ENTRIES.find(key => pathname.startsWith(key))
    return match && match in PATH_ROLES_CONFIG ? (match as PATH) : null
}

// Helper: Check if user has required roles for a path
function hasRequiredRole(userRoles: string[], path: PATH): boolean {
    const requiredRoles = PATH_ROLES_CONFIG[path]
    if (!requiredRoles || requiredRoles.length === 0) return true
    return requiredRoles.some(role => userRoles.includes(role))
}

// Helper: Create safe callback URL (internal only)
function createCallbackUrl(pathname: string, search: string): string {
    const fullPath = `${pathname}${search}`
    // Only allow internal redirects
    return fullPath.startsWith('/') ? fullPath : '/'
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const matchesProtectedPath = isProtectedPath(pathname)
    const isE2EAuthBypass = shouldBypassAuthForE2E()

    // Get user token from the request
    const user = await getToken({ req: request })

    // Handle protected paths
    if (matchesProtectedPath) {
        // Redirect unauthenticated users to login
        if (!user && !isE2EAuthBypass) {
            const callbackUrl = createCallbackUrl(pathname, request.nextUrl.search)
            const url = new URL('/', request.url)
            url.searchParams.set('callbackUrl', encodeURI(APP_BASE_URL + callbackUrl))
            return NextResponse.redirect(url)
        }

        if (user) {
            // Find the matching path configuration
            const currentPath = findMatchingProtectedPath(pathname)

            if (!currentPath) {
                // Path is in PROTECTED_PATHS but not in PATH_ROLES_CONFIG
                // eslint-disable-next-line no-console
                console.warn('[Security] Protected path not found in roles config:', {
                    path: pathname,
                    timestamp: new Date().toISOString(),
                })
                const url = new URL(PATH.NOT_FOUND, request.url)
                return NextResponse.redirect(url)
            }

            // Check if user has required roles
            const matchRolesToPath = hasRequiredRole(user.roles, currentPath)

            if (!matchRolesToPath) {
                // Log unauthorized access attempts for security audit
                // eslint-disable-next-line no-console
                console.warn('[Security] Unauthorized access attempt:', {
                    user: user.email || user.name || 'unknown',
                    roles: user.roles,
                    path: pathname,
                    requiredRoles: PATH_ROLES_CONFIG[currentPath],
                    timestamp: new Date().toISOString(),
                })

                const url = new URL(PATH.NOT_FOUND, request.url)
                return NextResponse.redirect(url)
            }
        }
    }

    // Redirect authenticated users from root to dashboard
    if (user && pathname === PATH.ROOT) {
        const url = new URL(PATH.DASHBOARD, request.url)
        return NextResponse.redirect(url)
    }

    // Create response and add security headers
    const response = NextResponse.next()

    // Build Content Security Policy based on environment
    const isDevelopment = process.env.PANDA_ENV === 'localhost'
    const connectSrc = isDevelopment ? "'self' http://localhost:* https:" : "'self' https:"

    // Add Content Security Policy header
    response.headers.set(
        'Content-Security-Policy',
        `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src ${connectSrc}; frame-src https://layout.eli-beams.eu; frame-ancestors 'self';`,
    )

    // Add X-Frame-Options to prevent clickjacking
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')

    // Add X-Content-Type-Options to prevent MIME sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff')

    // Add Referrer-Policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder (images, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
    ],
}
