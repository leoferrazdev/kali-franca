import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ELEVA_MOVEMENTS, ELEVA_PRODUCT } from '../../../lib/eleva/catalog';
import { resolveElevaAccess } from '../../../lib/eleva/access';
import { isSupabaseConfigured } from '../../../lib/supabase/config';
import { createSupabaseServerClient } from '../../../lib/supabase/server';
import { ElevaAccessState } from '../../components/ElevaAccessState';
import { ElevaCalendar } from '../../components/ElevaCalendar';
import { ElevaMovementCard } from '../../components/ElevaMovementCard';
import { MemberShell } from '../../components/MemberShell';

export const dynamic = 'force-dynamic';

export default async function ElevaHomePage() {
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

  const referenceDate = new Date().toISOString().slice(0, 10);

  return (
    <MemberShell memberEmail={memberEmail} preview={access.kind === 'preview'} isAdministrator={isAdministrator} activePath="eleva">
      <div className="eleva-page__intro">
        <div>
          <p className="eyebrow">{ELEVA_PRODUCT.name} / jornada de presença</p>
          <h1>Volte ao centro. Sustente o próximo movimento.</h1>
          <p>{ELEVA_PRODUCT.description} Este é o seu espaço para construir uma rotina de retorno à identidade que você escolhe habitar.</p>
        </div>
        <span className="eleva-page__code">ELEVA / 01</span>
      </div>

      <ElevaAccessState state={access} />

      <div className="eleva-dashboard-grid">
        <ElevaCalendar referenceDate={referenceDate} />
        <section className="eleva-progress" aria-labelledby="eleva-progress-title">
          <div className="eleva-section-heading">
            <div>
              <p className="eyebrow">Ciclo principal</p>
              <h2 id="eleva-progress-title">Seu progresso</h2>
            </div>
            <strong>0%</strong>
          </div>
          <div className="eleva-progress__track" aria-label="Progresso do ciclo: 0%" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span /></div>
          <p>Comece pelo primeiro movimento quando o acesso estiver confirmado.</p>
          <Link className="secondary-link" href="/membros/eleva/onboarding/">Abrir configuração inicial <span aria-hidden="true">↗</span></Link>
        </section>
      </div>

      <section className="eleva-movements" aria-labelledby="eleva-movements-title">
        <div className="eleva-section-heading">
          <div>
            <p className="eyebrow">O ciclo completo</p>
            <h2 id="eleva-movements-title">Cinco movimentos para sustentar sua jornada.</h2>
          </div>
          <p>Uma porta de entrada para voltar ao agora, um movimento por vez.</p>
        </div>
        <div className="eleva-movements__grid">
          {ELEVA_MOVEMENTS.map((movement) => <ElevaMovementCard accessKind={access.kind} key={movement.slug} movement={movement} />)}
        </div>
      </section>
    </MemberShell>
  );
}
