import { notFound, redirect } from 'next/navigation';
import { MemberShell } from '../../../../components/MemberShell';
import { createSupabaseServerClient } from '../../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

const APPLICATIONS_PATH = '/membros/aplicacoes/mentoria-frequencia-da-abundancia';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const responseSections = [
  {
    eyebrow: 'IDENTIFICAÇÃO E CONTATO',
    title: 'Quem está chegando',
    fields: [
      ['age_range', 'Faixa etária'],
      ['sex', 'Sexo'],
      ['email', 'E-mail'],
      ['whatsapp', 'WhatsApp'],
      ['city_state', 'Cidade e Estado'],
    ],
  },
  {
    eyebrow: 'CONTEXTO E EXPERIÊNCIA',
    title: 'O ponto de partida',
    fields: [
      ['challenge', 'Desafio atual'],
      ['beliefs', 'Crença, fé ou filosofia'],
      ['energy_tools_experience', 'Experiência com frequências'],
      ['priority_area', 'Área prioritária'],
      ['current_state', 'Estado atual'],
    ],
  },
  {
    eyebrow: 'PRONTIDÃO E DIREÇÃO',
    title: 'O próximo movimento',
    fields: [
      ['predominant_feeling', 'Sentimento e pensamento predominante'],
      ['previous_support', 'Acompanhamentos anteriores'],
      ['perceived_block', 'Maior bloqueio percebido'],
      ['desired_wins', 'Primeiras vitórias desejadas'],
      ['commitment_score', 'Compromisso com a jornada'],
      ['investment_readiness', 'Disponibilidade para investir'],
    ],
  },
] as const;

type ApplicationRow = Record<string, string | number | boolean | null> & {
  id: string;
  full_name: string;
  status: string;
  created_at: string;
  consent: boolean;
  consented_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));
}

export default async function MentorshipApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!UUID_PATTERN.test(id)) notFound();

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return <AccessState title="Configuração do Supabase" detail="O preenchimento desta aplicação aguarda a configuração pública do Supabase." />;
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
    .eq('id', id)
    .eq('mentorship_slug', 'frequencia-da-abundancia')
    .maybeSingle();

  if (error) {
    return (
      <MemberShell memberEmail={user.email} isAdministrator activePath="applications">
        <div className="member-content__intro">
          <p className="eyebrow">CRM ADMINISTRATIVO · MENTORIA</p>
          <h1>Aplicação indisponível.</h1>
          <p>Não foi possível consultar este preenchimento agora. Tente novamente em alguns instantes.</p>
          <a className="application-page__back" href={APPLICATIONS_PATH}>← Voltar para aplicações</a>
        </div>
      </MemberShell>
    );
  }

  if (!data) notFound();
  const application = data as ApplicationRow;

  return (
    <MemberShell memberEmail={user.email} isAdministrator activePath="applications">
      <div className="application-page__topline">
        <a className="application-page__back" href={APPLICATIONS_PATH}>← Todas as aplicações</a>
        <span className="application-page__readonly">Somente leitura</span>
      </div>

      <header className="application-page__header">
        <div>
          <p className="eyebrow">PREENCHIMENTO INDIVIDUAL · MENTORIA</p>
          <h1>{application.full_name}</h1>
          <p>Leitura completa da aplicação recebida pela Mentoria Frequência da Abundância.</p>
        </div>
        <dl className="application-page__meta">
          <div>
            <dt>Status</dt>
            <dd>{application.status}</dd>
          </div>
          <div>
            <dt>Recebida em</dt>
            <dd>{formatDate(application.created_at)}</dd>
          </div>
        </dl>
      </header>

      <div className="application-page" aria-labelledby="application-page-title">
        <h2 id="application-page-title" className="sr-only">Preenchimento completo da aplicação</h2>
        {responseSections.map((section) => (
          <section className="application-page__section" key={section.title}>
            <div className="application-page__section-heading">
              <p className="eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
            </div>
            <dl className="application-page__responses">
              {section.fields.map(([key, label]) => (
                <div className="application-response" key={key}>
                  <dt>{label}</dt>
                  <dd>{key === 'commitment_score' ? `${String(application[key])}/10` : String(application[key] ?? '')}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <section className="application-page__consent" aria-labelledby="application-consent-title">
          <div>
            <p className="eyebrow">CONSENTIMENTO</p>
            <h2 id="application-consent-title">Uso dos dados</h2>
          </div>
          <p>{application.consent ? `Aceito em ${formatDate(application.consented_at)}.` : 'Não aceito.'}</p>
        </section>
      </div>
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
