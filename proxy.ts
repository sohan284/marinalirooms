import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Handle root redirection
    if (pathname === '/') {
      const country = request.headers.get('x-vercel-ip-country') || '';
      let targetLang = 'en';

      if (country === 'IT') {
        targetLang = 'it';
      } else if (country === 'DE' || country === 'AT') {
        targetLang = 'de';
      }

      const url = request.nextUrl.clone();
      url.pathname = `/${targetLang}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Public admin routes
        if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/auth')) {
          return true;
        }
        // Protected admin routes
        if (pathname.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/admin/:path*'],
};
