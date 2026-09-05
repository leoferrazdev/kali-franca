import { ELEVA_MOVEMENTS, type ElevaMovementSlug } from '../../lib/eleva/catalog';

type ElevaRoutineProps = {
  activityDate: string;
  completedMovementSlugs?: readonly ElevaMovementSlug[];
  locked?: boolean;
};

const DAILY_SLUGS: readonly ElevaMovementSlug[] = ['reprogramar', 'alinhar', 'manifestar'];

export function ElevaRoutine({ activityDate, completedMovementSlugs = [], locked = false }: ElevaRoutineProps) {
  const routine = DAILY_SLUGS.map((slug) => ELEVA_MOVEMENTS.find((movement) => movement.slug === slug)).filter(Boolean);

  return (
    <section className="eleva-routine" aria-labelledby="eleva-routine-title">
      <div className="eleva-section-heading">
        <div>
          <p className="eyebrow">Prática de hoje</p>
          <h2 id="eleva-routine-title">Três movimentos para voltar ao centro.</h2>
        </div>
        <time dateTime={activityDate}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(`${activityDate}T12:00:00`))}</time>
      </div>
      <ol className="eleva-routine__list">
        {routine.map((movement) => {
          if (!movement) return null;
          const completed = completedMovementSlugs.includes(movement.slug);
          return (
            <li className={`eleva-routine__item${completed ? ' is-complete' : ''}`} key={movement.slug}>
              <span className="eleva-routine__number">0{movement.position}</span>
              <div>
                <strong>{movement.title}</strong>
                <span>{completed ? 'Concluído' : locked ? 'Disponível após a liberação do acesso' : 'Pronto para começar'}</span>
              </div>
              <span className="eleva-routine__mark" aria-hidden="true">{completed ? '✓' : '·'}</span>
            </li>
          );
        })}
      </ol>
      <p className="eleva-routine__note">A rotina diária será registrada por movimento quando o acesso ao produto estiver confirmado.</p>
    </section>
  );
}
