import { EmptyState } from '../components/EmptyState';
import { MemberShell } from '../components/MemberShell';
import { isSupabaseConfigured } from '../../lib/supabase/config';
import { createSupabaseServerClient } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MemberHome() {
  let memberEmail: string | undefined;
  let isAdministrator = false;
  const preview = !isSupabaseConfigured();

  if (!preview) {
    let memberUser: { id: string; email?: string } | null = null;

    try {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      memberUser = user;
    } catch {
      redirect('/login/?auth=config-error');
    }

    if (!memberUser) {
      redirect('/login/');
    }

    memberEmail = memberUser.email;

    try {
      const supabase = await createSupabaseServerClient();
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', memberUser.id).maybeSingle();
      isAdministrator = profile?.role === 'administradora';
    } catch {
      isAdministrator = false;
    }
  }

  return (
    <MemberShell memberEmail={memberEmail} preview={preview} isAdministrator={isAdministrator}>
      <div className="member-content__intro">
        <p className="eyebrow">Área de membros</p>
        <h1>{preview ? 'Seu próximo passo começa aqui.' : 'Bem-vinda(o) ao seu espaço.'}</h1>
        <p>{preview ? 'Um espaço reservado para conteúdos, práticas e encontros que respeitam o seu ritmo.' : 'Sua sessão está ativa. Os conteúdos da sua jornada serão organizados aqui.'}</p>
      </div>
      <EmptyState />
    </MemberShell>
  );
}
