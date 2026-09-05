import type { ElevaAccessState as AccessState } from '../../lib/eleva/access';

type ElevaAccessStateProps = {
  state: AccessState;
};

const stateCopy: Record<AccessState['kind'], { label: string; description: string }> = {
  preview: {
    label: 'Prévia local',
    description: 'A configuração do Supabase ainda não está ativa neste ambiente.',
  },
  unauthenticated: {
    label: 'Sessão necessária',
    description: 'Entre na sua conta para consultar o estado do produto.',
  },
  pending_purchase: {
    label: 'Acesso aguardando confirmação',
    description: 'A estrutura do Eleva 5D está preparada. O acesso ao conteúdo será liberado após a confirmação da compra.',
  },
  active: {
    label: 'Acesso ativo',
    description: 'Seu espaço do Eleva 5D está disponível.',
  },
  suspended: {
    label: 'Acesso suspenso',
    description: 'O acesso está temporariamente indisponível. Consulte o suporte para continuar.',
  },
};

export function ElevaAccessState({ state }: ElevaAccessStateProps) {
  const copy = stateCopy[state.kind];

  return (
    <section className={`eleva-access-state eleva-access-state--${state.kind}`} aria-live="polite" role="status">
      <span className="eleva-access-state__mark" aria-hidden="true">◌</span>
      <div>
        <p className="eyebrow">Estado do produto</p>
        <h2>{copy.label}</h2>
        <p>{copy.description}</p>
      </div>
    </section>
  );
}
