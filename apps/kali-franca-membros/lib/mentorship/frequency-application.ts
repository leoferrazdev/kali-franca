export const MENTORSHIP_SLUG = 'frequencia-da-abundancia';
export const APPLICATION_ORIGIN = 'https://kalifranca.com.br';

const AGE_RANGES = new Set([
  '20 a 24 anos',
  '25 a 29 anos',
  '30 a 34 anos',
  '35 a 39 anos',
  '40 a 44 anos',
  '45 anos ou mais',
]);

const SEX_OPTIONS = new Set(['Feminino', 'Masculino', 'Outro']);
const PRIORITY_AREAS = new Set([
  'Financeiro e Abundância',
  'Relacionamentos e Conexão',
  'Carreira e Poder Pessoal',
  'Saúde, Vitalidade e Disposição física',
]);
const CURRENT_STATES = new Set([
  'Sinto-me exausta e no limite do esgotamento',
  'Sinto que estou estagnada e nada flui',
  'Sinto que minha antiga identidade "não cabe" mais em mim',
  'Estou bem, mas pronta para o meu próximo Salto Quântico',
  'Outro',
]);
const INVESTMENT_OPTIONS = new Set([
  'Sim, estou disposta.',
  'Preciso de mais informações sobre valores.',
  'Não, não estou disposta neste momento.',
]);

const TEXT_FIELDS = [
  'full_name',
  'age_range',
  'sex',
  'email',
  'whatsapp',
  'city_state',
  'challenge',
  'beliefs',
  'energy_tools_experience',
  'priority_area',
  'current_state',
  'predominant_feeling',
  'previous_support',
  'perceived_block',
  'desired_wins',
  'investment_readiness',
] as const;

const TEXT_LIMITS: Record<TextField, number> = {
  full_name: 160,
  age_range: 80,
  sex: 40,
  email: 254,
  whatsapp: 40,
  city_state: 160,
  challenge: 4000,
  beliefs: 4000,
  energy_tools_experience: 4000,
  priority_area: 120,
  current_state: 240,
  predominant_feeling: 4000,
  previous_support: 4000,
  perceived_block: 4000,
  desired_wins: 4000,
  investment_readiness: 160,
};

type TextField = (typeof TEXT_FIELDS)[number];

export type ValidatedApplication = Record<TextField, string> & {
  commitment_score: number;
  consent: true;
  client_submission_id: string;
};

type ValidationResult =
  | { ok: true; data: ValidatedApplication }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  if (cleaned.length < 2 || cleaned.length > maxLength) return null;
  return cleaned;
}

function isUuid(value: unknown): value is string {
  return typeof value === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function validateApplicationPayload(input: unknown): ValidationResult {
  if (!isRecord(input)) {
    return { ok: false, error: 'Envio inválido.' };
  }

  if (input.honeypot !== undefined && input.honeypot !== '') {
    return { ok: false, error: 'Envio inválido.' };
  }

  const data = {} as Record<TextField, string>;
  for (const field of TEXT_FIELDS) {
    const value = cleanText(input[field], TEXT_LIMITS[field]);
    if (!value) return { ok: false, error: 'Revise os campos obrigatórios.' };
    data[field] = value;
  }

  if (!AGE_RANGES.has(data.age_range)) return { ok: false, error: 'Revise os campos obrigatórios.' };
  if (!SEX_OPTIONS.has(data.sex)) return { ok: false, error: 'Revise os campos obrigatórios.' };
  if (!PRIORITY_AREAS.has(data.priority_area)) return { ok: false, error: 'Revise os campos obrigatórios.' };
  if (!CURRENT_STATES.has(data.current_state)) return { ok: false, error: 'Revise os campos obrigatórios.' };
  if (!INVESTMENT_OPTIONS.has(data.investment_readiness)) return { ok: false, error: 'Revise os campos obrigatórios.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) {
    return { ok: false, error: 'Informe um e-mail válido.' };
  }

  const commitmentScore = input.commitment_score;
  if (!Number.isInteger(commitmentScore) || Number(commitmentScore) < 0 || Number(commitmentScore) > 10) {
    return { ok: false, error: 'Informe um compromisso entre 0 e 10.' };
  }

  if (input.consent !== true) {
    return { ok: false, error: 'É necessário aceitar o consentimento para enviar.' };
  }

  if (!isUuid(input.client_submission_id)) {
    return { ok: false, error: 'Envio inválido.' };
  }

  return {
    ok: true,
    data: {
      ...data,
      commitment_score: Number(commitmentScore),
      consent: true,
      client_submission_id: input.client_submission_id,
    },
  };
}
