import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  const publicRoutes = ['/', '/error', '/api'];
  const authRoutes = ['/login', '/signup'];

  const isPublic = publicRoutes.some((route) => {
    const pattern = new RegExp(`^${route}(\/|$)`);
    return pattern.test(pathname);
  });

  const isAuthRoute = authRoutes.some((route) => {
    const pattern = new RegExp(`^${route}(\/|$)`);
    return pattern.test(pathname);
  });

  if (!user && !isPublic && !isAuthRoute) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    const role = user.role;

    if (isAuthRoute) {
      url.pathname = role === 'admin' ? '/dashboard' : '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/dashboard') && role !== 'admin') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/private') && role !== 'customer') {
      url.pathname = '/error';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
