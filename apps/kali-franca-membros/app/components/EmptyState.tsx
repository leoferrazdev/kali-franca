export function EmptyState() {
  return (
    <section className="empty-state" aria-labelledby="empty-state-title">
      <div className="empty-state__symbol" aria-hidden="true">✦</div>
      <div>
        <p className="eyebrow">Em preparação</p>
        <h2 id="empty-state-title">Seu espaço está sendo preparado.</h2>
        <p>Os conteúdos da sua jornada aparecerão aqui quando a área de membros estiver oficialmente ativada.</p>
        <a className="secondary-link" href="/login/">Voltar ao acesso <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
