import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { APPLICATION_ORIGIN, validateApplicationPayload } from '../../../../lib/mentorship/frequency-application';
import { getSupabasePublicConfig } from '../../../../lib/supabase/config';

const MAX_BODY_BYTES = 50_000;

function headersFor(origin: string | null) {
  const headers = new Headers({ Vary: 'Origin' });
  if (origin === APPLICATION_ORIGIN) {
    headers.set('Access-Control-Allow-Origin', APPLICATION_ORIGIN);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'content-type');
  }
  return headers;
}

function json(body: Record<string, unknown>, status: number, origin: string | null) {
  return NextResponse.json(body, { status, headers: headersFor(origin) });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  if (origin !== APPLICATION_ORIGIN) return new Response(null, { status: 403, headers: headersFor(origin) });
  return new Response(null, { status: 204, headers: headersFor(origin) });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin !== APPLICATION_ORIGIN) return json({ error: 'Origem não permitida.' }, 403, origin);

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ error: 'Envio inválido.' }, 413, origin);
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return json({ error: 'Envio inválido.' }, 400, origin);
  }

  const validation = validateApplicationPayload(input);
  if (!validation.ok) return json({ error: validation.error }, 400, origin);

  const config = getSupabasePublicConfig();
  if (!config) return json({ error: 'Serviço temporariamente indisponível.' }, 503, origin);

  const supabase = createClient(config.url, config.publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  const {
    full_name,
    age_range,
    sex,
    email,
    whatsapp,
    city_state,
    challenge,
    beliefs,
    energy_tools_experience,
    priority_area,
    current_state,
    predominant_feeling,
    previous_support,
    perceived_block,
    desired_wins,
    commitment_score,
    investment_readiness,
    consent,
    client_submission_id,
  } = validation.data;

  const { error } = await supabase.from('mentorship_applications').insert({
    full_name,
    age_range,
    sex,
    email,
    whatsapp,
    city_state,
    challenge,
    beliefs,
    energy_tools_experience,
    priority_area,
    current_state,
    predominant_feeling,
    previous_support,
    perceived_block,
    desired_wins,
    commitment_score,
    investment_readiness,
    consent,
    client_submission_id,
    consented_at: new Date().toISOString(),
  });

  if (error) {
    if (error.code === '23505') {
      return json({ accepted: true }, 200, origin);
    }
    return json({ error: 'Não foi possível concluir o envio agora.' }, 503, origin);
  }

  return json({ accepted: true }, 201, origin);
}
