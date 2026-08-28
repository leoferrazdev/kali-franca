import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(new URL('/membros/', requestUrl.origin));
      }
    } catch {
      // O estado de configuração é reportado na tela de acesso, sem expor detalhes internos.
    }
  }

  return NextResponse.redirect(new URL('/login/?auth=callback-error', requestUrl.origin));
}
