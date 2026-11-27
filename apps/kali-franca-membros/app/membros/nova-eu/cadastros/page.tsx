import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { MemberShell } from '../../../components/MemberShell';
import { requireSupabasePublicConfig } from '../../../../lib/supabase/config';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';
import { QuizLeadRefresh } from './QuizLeadRefresh';

export const dynamic = 'force-dynamic';

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
});

export default async function QuizLeadsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login/');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || profile?.role !== 'administradora') redirect('/membros/');

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const database = serviceKey ? createClient(requireSupabasePublicConfig().url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  }) : null;

  const result = await database?.from('nova_eu_quiz_leads')
    .select('id,nome,email,celular,criado_em')
    .order('id', { ascending: false })
    .limit(100);

  return (
    <MemberShell memberEmail={user.email} isAdministrator activePath="quiz-cadastros">
      <QuizLeadRefresh />
      <div className="member-content__intro application-inbox__intro">
        <p className="eyebrow">Diário Nova Eu</p>
        <h1>Cadastros do quiz</h1>
        <p>Os 100 cadastros mais recentes, atualizados a cada 5 segundos enquanto esta aba estiver visível.</p>
      </div>
      <section className="application-inbox" aria-label="Lista de cadastros">
        {!result || result.error ? (
          <p role="status">Não foi possível consultar os cadastros agora. A lista será atualizada automaticamente.</p>
        ) : result.data.length === 0 ? (
          <p role="status">Nenhum cadastro recebido até agora.</p>
        ) : (
          <ul className="application-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {result.data.map((lead) => (
              <li className="application-card" key={lead.id}>
                <div className="application-card__summary">
                  <div style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
                    <strong>{lead.nome}</strong>
                    <small>E-mail: {lead.email}</small>
                    <small>Celular: {lead.celular}</small>
                    <small>Cadastro: <time dateTime={lead.criado_em}>{dateFormatter.format(new Date(lead.criado_em))}</time></small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </MemberShell>
  );
}
