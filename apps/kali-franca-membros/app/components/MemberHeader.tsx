import { BrandMark } from './BrandMark';

export function MemberHeader() {
  return (
    <header className="member-header">
      <BrandMark compact />
      <div className="member-header__context">
        <span className="status-chip"><span aria-hidden="true" /> Prévia da experiência</span>
        <span className="member-header__avatar" aria-hidden="true">KF</span>
      </div>
    </header>
  );
}
