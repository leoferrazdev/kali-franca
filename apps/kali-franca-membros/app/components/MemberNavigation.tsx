export function MemberNavigation() {
  return (
    <aside className="member-navigation" aria-label="Navegação da área de membros">
      <p className="member-navigation__label">Seu espaço</p>
      <nav>
        <a className="member-navigation__link member-navigation__link--active" href="/membros/" aria-current="page">
          <span aria-hidden="true">◌</span>
          Início
        </a>
        <span className="member-navigation__link member-navigation__link--disabled" aria-disabled="true">
          <span aria-hidden="true">◈</span>
          Conteúdos
          <small>em breve</small>
        </span>
        <span className="member-navigation__link member-navigation__link--disabled" aria-disabled="true">
          <span aria-hidden="true">◎</span>
          Meu perfil
          <small>em breve</small>
        </span>
      </nav>
      <div className="member-navigation__note">
        <span className="frequency-line" aria-hidden="true" />
        <p>Seu tempo também faz parte do caminho.</p>
      </div>
    </aside>
  );
}
