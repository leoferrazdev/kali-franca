import { redirect } from 'next/navigation';
import { MemberShell } from '../../../components/MemberShell';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

const responseFields = [
  ['age_range', 'Faixa etária'],
  ['sex', 'Sexo'],
  ['email', 'E-mail'],
  ['whatsapp', 'WhatsApp'],
  ['city_state', 'Cidade e Estado'],
  ['challenge', 'Desafio atual'],
  ['beliefs', 'Crença, fé ou filosofia'],
  ['energy_tools_experience', 'Experiência com frequências'],
  ['priority_area', 'Área prioritária'],
  ['current_state', 'Estado atual'],
  ['predominant_feeling', 'Sentimento e pensamento predominante'],
  ['previous_support', 'Acompanhamentos anteriores'],
  ['perceived_block', 'Maior bloqueio percebido'],
  ['desired_wins', 'Primeiras vitórias desejadas'],
  ['commitment_score', 'Compromisso com a jornada'],
  ['investment_readiness', 'Disponibilidade para investir'],
] as const;

type ApplicationRow = {
  id: string;
  full_name: string;
  status: string;
  created_at: string;
  consent: boolean;
  consented_at: string;
  age_range: string;
  sex: string;
  email: string;
  whatsapp: string;
  city_state: string;
  challenge: string;
  beliefs: string;
  energy_tools_experience: string;
  priority_area: string;
  current_state: string;
  predominant_feeling: string;
  previous_support: string;
  perceived_block: string;
  desired_wins: string;
  commitment_score: number;
  investment_readiness: string;
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
              <details className="application-detail" key={application.id}>
                <summary>
                  <span>
                    <strong>{application.full_name}</strong>
                    <small>{application.email} · {formatDate(application.created_at)}</small>
                  </span>
                  <span className="application-status">{application.status}</span>
                </summary>
                <dl className="application-detail__body">
                  {responseFields.map(([key, label]) => (
                    <div className="application-response" key={key}>
                      <dt>{label}</dt>
                      <dd>{String(application[key])}</dd>
                    </div>
                  ))}
                  <div className="application-response">
                    <dt>Consentimento</dt>
                    <dd>{application.consent ? `Aceito em ${formatDate(application.consented_at)}` : 'Não aceito'}</dd>
                  </div>
                </dl>
              </details>
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
