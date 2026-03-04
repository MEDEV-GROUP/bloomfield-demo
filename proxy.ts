import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const isAuth = request.cookies.has('bloomfield_demo_auth')
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  // Redirection vers /login si non authentifié et pas déjà sur la page de login
  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si on est déjà authentifié et qu'on essaie d'accéder à /login, on va vers le dashboard /
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Appliquer le middleware sur toutes les routes SAUF:
     * - api (API routes)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
