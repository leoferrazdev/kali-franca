type ElevaContentPlaceholderProps = {
  locked?: boolean;
};

export function ElevaContentPlaceholder({ locked = true }: ElevaContentPlaceholderProps) {
  return (
    <section className="eleva-content-placeholder" aria-labelledby="eleva-content-title">
      <div className="eleva-content-placeholder__symbol" aria-hidden="true">✦</div>
      <div>
        <p className="eyebrow">Conteúdo do movimento</p>
        <h2 id="eleva-content-title">O espaço está preparado para receber a sua prática.</h2>
        <p>{locked ? 'Os áudios, vídeos e exercícios serão liberados quando a compra estiver confirmada e o acesso for ativado.' : 'Os primeiros conteúdos da sua prática aparecerão aqui.'}</p>
      </div>
    </section>
  );
}
