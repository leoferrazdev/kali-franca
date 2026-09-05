import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ElevaAccessState } from '../../../components/ElevaAccessState';
import { ElevaContentPlaceholder } from '../../../components/ElevaContentPlaceholder';
import { MemberShell } from '../../../components/MemberShell';
import { resolveElevaAccess } from '../../../../lib/eleva/access';
import { findElevaMovement } from '../../../../lib/eleva/catalog';
import { isSupabaseConfigured } from '../../../../lib/supabase/config';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ElevaMovementPage({ params }: { params: Promise<{ movement: string }> }) {
  const { movement: movementSlug } = await params;
  const movement = findElevaMovement(movementSlug);
  if (!movement) notFound();

  let memberEmail: string | undefined;
  let isAdministrator = false;
  let access = resolveElevaAccess();

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login/');

    memberEmail = user.email;
    access = resolveElevaAccess({ id: user.id, email: user.email });
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    isAdministrator = profile?.role === 'administradora';
  }

  const locked = access.kind !== 'active' && access.kind !== 'preview';

  return (
    <MemberShell memberEmail={memberEmail} preview={access.kind === 'preview'} isAdministrator={isAdministrator} activePath="eleva">
      <div className="eleva-movement-page__topline">
        <Link className="application-page__back" href="/membros/eleva/">← Voltar para o ciclo</Link>
        <span className="eleva-page__code">MOVIMENTO / 0{movement.position}</span>
      </div>
      <header className="eleva-movement-page__header">
        <div>
          <p className="eyebrow">{movement.title} / movimento {movement.position}</p>
          <h1>{movement.focus}</h1>
          <p>Uma prática para transformar intenção em presença, com espaço para você avançar no seu próprio ritmo.</p>
        </div>
        <span className="eleva-movement-page__number" aria-hidden="true">0{movement.position}</span>
      </header>

      <ElevaAccessState state={access} />

      <section className="eleva-movement-page__modules" aria-labelledby="eleva-modules-title">
        <div className="eleva-section-heading">
          <div>
            <p className="eyebrow">Estrutura preparada</p>
            <h2 id="eleva-modules-title">O que você encontra aqui.</h2>
          </div>
          <p>{movement.title} é o movimento {movement.position} do ciclo Eleva 5D.</p>
        </div>
        <ul>
          {movement.modules.map((module) => <li key={module}><span aria-hidden="true">✦</span>{module}</li>)}
        </ul>
      </section>

      <ElevaContentPlaceholder locked={locked} />
    </MemberShell>
  );
}
