'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '../../lib/supabase/browser';

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    setError('');
    setPending(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      router.replace('/login/');
      router.refresh();
    } catch {
      setError('Não foi possível sair. Tente novamente.');
      setPending(false);
    }
  }

  return (
    <div className="logout-control">
      <button className="logout-button" type="button" onClick={handleLogout} disabled={pending} aria-busy={pending}>
        {pending ? 'Saindo…' : 'Sair'}
      </button>
      {error ? <span className="logout-control__error" role="status" aria-live="polite">{error}</span> : null}
    </div>
  );
}
