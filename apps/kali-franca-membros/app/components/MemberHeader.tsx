import { BrandMark } from './BrandMark';
import { LogoutButton } from './LogoutButton';

type MemberHeaderProps = {
  memberEmail?: string;
  preview?: boolean;
};

export function MemberHeader({ memberEmail, preview = false }: MemberHeaderProps) {
  return (
    <header className="member-header">
      <BrandMark compact />
      <div className="member-header__actions">
        <div className="member-header__context">
          <span className="member-header__email">{memberEmail}</span>
          <span className="status-chip"><span aria-hidden="true" /> {preview ? 'Prévia da experiência' : 'Sessão ativa'}</span>
          <span className="member-header__avatar" aria-hidden="true">{memberEmail ? memberEmail.slice(0, 2).toUpperCase() : 'KF'}</span>
        </div>
        {preview ? null : <LogoutButton />}
      </div>
    </header>
  );
}
