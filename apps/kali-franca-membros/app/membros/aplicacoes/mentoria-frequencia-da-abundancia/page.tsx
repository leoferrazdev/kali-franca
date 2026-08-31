import { redirect } from 'next/navigation';
import { MemberShell } from '../../../components/MemberShell';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

type ApplicationRow = {
  id: string;
  full_name: string;
  status: string;
  created_at: string;
  email: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));
}

export default async function MentorshipApplicationsPage() {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return <AccessState title="Configuração do Supabase" detail="A caixa de entrada administrativa aguarda a configuração pública do Supabase." />;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login/');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || profile?.role !== 'administradora') {
    redirect('/membros/');
  }

  const { data, error } = await supabase
    .from('mentorship_applications')
    .select('*')
    .eq('mentorship_slug', 'frequencia-da-abundancia')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <MemberShell memberEmail={user.email} isAdministrator activePath="applications">
        <div className="member-content__intro">
          <p className="eyebrow">Mentoria Frequência da Abundância</p>
          <h1>Aplicações indisponíveis.</h1>
          <p>Não foi possível consultar a caixa de entrada agora. Tente novamente em alguns instantes.</p>
        </div>
      </MemberShell>
    );
  }

  const applications = (data ?? []) as ApplicationRow[];

  return (
    <MemberShell memberEmail={user.email} isAdministrator activePath="applications">
      <div className="member-content__intro application-inbox__intro">
        <p className="eyebrow">CRM ADMINISTRATIVO · MENTORIA</p>
        <h1>Aplicações recebidas.</h1>
        <p>Uma leitura reservada das pessoas que escolheram iniciar este movimento com a Kalì Franca.</p>
      </div>

      <section className="application-inbox" aria-labelledby="application-inbox-title">
        <div className="application-inbox__heading">
          <div>
            <p className="eyebrow">CAIXA DE ENTRADA</p>
            <h2 id="application-inbox-title">Mentoria Frequência da Abundância</h2>
          </div>
          <div className="application-inbox__meta">
            <span className="application-inbox__readonly">Somente leitura</span>
            <span className="application-inbox__count">{applications.length} {applications.length === 1 ? 'aplicação' : 'aplicações'}</span>
          </div>
        </div>

        {applications.length ? (
          <div className="application-list">
            {applications.map((application) => (
              <article className="application-card" key={application.id}>
                <div className="application-card__summary">
                  <div>
                    <strong>{application.full_name}</strong>
                    <small>{application.email} · {formatDate(application.created_at)}</small>
                  </div>
                  <span className="application-status">{application.status}</span>
                </div>
                <a
                  className="application-card__link"
                  href={`/membros/aplicacoes/mentoria-frequencia-da-abundancia/${application.id}`}
                  aria-label={`Ver aplicação completa de ${application.full_name}`}
                >
                  <span>Ver aplicação completa</span>
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="application-inbox__empty">
            <span className="empty-state__symbol" aria-hidden="true">◌</span>
            <div>
              <h3>Nenhuma aplicação recebida.</h3>
              <p>Quando uma nova aplicação for enviada, ela aparecerá aqui.</p>
            </div>
          </div>
        )}
      </section>
    </MemberShell>
  );
}

function AccessState({ title, detail }: { title: string; detail: string }) {
  return (
    <MemberShell preview>
      <div className="member-content__intro">
        <p className="eyebrow">CRM ADMINISTRATIVO · ACESSO INTERNO</p>
        <h1>{title}</h1>
        <p>{detail}</p>
      </div>
    </MemberShell>
  );
}
