import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabasePublicConfig } from './lib/supabase/config';

export async function proxy(request: NextRequest) {
  const config = getSupabasePublicConfig();
  let response = NextResponse.next({ request });

  if (!config) {
    return response;
  }

  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '') || '/';
  const isMemberRoute = pathname === '/membros' || pathname.startsWith('/membros/');
  const isAuthRoute = pathname === '/' || pathname === '/login' || pathname === '/cadastro';

  if (isMemberRoute && !user) {
    return NextResponse.redirect(new URL('/login/', request.url));
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/membros/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
