import { EmptyState } from '../components/EmptyState';
import { MemberShell } from '../components/MemberShell';

export default function MemberHome() {
  return (
    <MemberShell>
      <div className="member-content__intro">
        <p className="eyebrow">Área de membros</p>
        <h1>Seu próximo passo começa aqui.</h1>
        <p>Um espaço reservado para conteúdos, práticas e encontros que respeitam o seu ritmo.</p>
      </div>
      <EmptyState />
    </MemberShell>
  );
}
