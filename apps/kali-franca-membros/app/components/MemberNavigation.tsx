type MemberNavigationProps = {
  isAdministrator?: boolean;
  activePath?: 'home' | 'applications';
};

export function MemberNavigation({ isAdministrator = false, activePath = 'home' }: MemberNavigationProps) {
  return (
    <aside className="member-navigation" aria-label="Navegação da área de membros">
      <p className="member-navigation__label">Seu espaço</p>
      <nav>
        <a className={`member-navigation__link${activePath === 'home' ? ' member-navigation__link--active' : ''}`} href="/membros/" aria-current={activePath === 'home' ? 'page' : undefined}>
          <span aria-hidden="true">◌</span>
          Início
        </a>
        {isAdministrator ? (
          <a className={`member-navigation__link${activePath === 'applications' ? ' member-navigation__link--active' : ''}`} href="/membros/aplicacoes/mentoria-frequencia-da-abundancia" aria-current={activePath === 'applications' ? 'page' : undefined}>
            <span aria-hidden="true">◈</span>
            Aplicações
          </a>
        ) : null}
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
