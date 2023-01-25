export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/catalogue', '/catalogue/:path*', '/systems', '/systems/:path*', '/dashboard', '/dashboard/:path*']
}
