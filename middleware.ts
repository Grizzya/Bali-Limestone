import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isDashboardRoute = path.startsWith('/admin/dashboard');
  
  // PERBAIKAN: Cukup cek apakah cookie 'admin_session' ada isinya (!! mengubahnya jadi true/false)
  const isLoggedIn = !!request.cookies.get('admin_session')?.value;

  // Jika mencoba masuk dashboard tapi belum login, tendang ke halaman login
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Jika sudah login tapi iseng buka halaman login, arahkan kembali ke dashboard
  if (path === '/admin/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang akan dijaga oleh satpam ini
export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login'],
};