import { NextResponse } from 'next/server'
import { SESSION_COOKIE_NAME } from '@/utils/auth-cookies'

const PROTECTED_ROUTES = ['/dashboard']

function isProtectedPath(pathname) {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function middleware(request) {
  const { pathname, search } = request.nextUrl
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME))
  const authRoute = pathname.startsWith('/auth')

  if (isProtectedPath(pathname) && !hasSession) {
    const signInUrl = request.nextUrl.clone()
    signInUrl.pathname = '/auth/signin'
    const returnTo = `${pathname}${search || ''}`
    signInUrl.searchParams.set('redirect', returnTo)
    return NextResponse.redirect(signInUrl)
  }

  if (hasSession && authRoute) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    dashboardUrl.searchParams.delete('redirect')
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/plaid/:path*'],
}
