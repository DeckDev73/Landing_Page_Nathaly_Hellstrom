// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// 🔹 Middleware principal de next-intl
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

  // Evitamos interferir con archivos o rutas internas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg')
  ) {
    return intlMiddleware(request);
  }

  // Si entra por raíz "/", redirigimos según cookie
  if (pathname === '/' && localeCookie) {
    const url = new URL(`/${localeCookie}`, request.url);
    return NextResponse.redirect(url);
  }

  // Si no hay cookie, simplemente seguimos con el middleware normal
  return intlMiddleware(request);
}

// Aplicamos el middleware solo a rutas relevantes
export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|static|.*\\..*).*)',
  ],
};
