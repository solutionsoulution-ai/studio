import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = process.env.APP_PASSWORD;
const COOKIE_NAME = 'neofonds-auth';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow API routes and the login page to be accessed
  if (pathname.startsWith('/api/') || pathname === '/login') {
    return NextResponse.next();
  }

  // Check for the authentication cookie
  const isAuthenticated = req.cookies.get(COOKIE_NAME)?.value === 'true';

  if (!isAuthenticated) {
    // Redirect to the login page, preserving the original URL
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
