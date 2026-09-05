import Link from 'next/link';
import type { ElevaMovement } from '../../lib/eleva/catalog';

type ElevaMovementCardProps = {
  movement: ElevaMovement;
  accessKind: 'preview' | 'unauthenticated' | 'pending_purchase' | 'active' | 'suspended';
};

export function ElevaMovementCard({ movement, accessKind }: ElevaMovementCardProps) {
  const featured = movement.slug === 'manifestar';
  const locked = accessKind !== 'active' && accessKind !== 'preview';

  return (
    <article className={`eleva-movement-card${featured ? ' eleva-movement-card--featured' : ''}`}>
      <div className="eleva-movement-card__topline">
        <span className="eleva-movement-card__number">0{movement.position}</span>
        <span className="eleva-movement-card__status">{locked ? 'bloqueado' : 'preparado'}</span>
      </div>
      <h3>{movement.title}</h3>
      <p>{movement.focus}</p>
      <ul>
        {movement.modules.map((module) => <li key={module}>{module}</li>)}
      </ul>
      <Link className="eleva-movement-card__link" href={`/membros/eleva/${movement.slug}`}>
        <span>{locked ? 'Ver estrutura' : 'Entrar no movimento'}</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
