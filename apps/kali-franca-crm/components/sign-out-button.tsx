'use client';

import { createSupabaseBrowserClient } from '../lib/supabase/browser';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace('/login');
    router.refresh();
  }

  return <button className="sign-out" type="button" onClick={signOut}>Sair</button>;
}
