import type { ReactNode } from 'react';
import { Atmosphere } from './Atmosphere';
import { MemberHeader } from './MemberHeader';
import { MemberNavigation } from './MemberNavigation';

type MemberShellProps = {
  children: ReactNode;
  memberEmail?: string;
  preview?: boolean;
};

export function MemberShell({ children, memberEmail, preview = false }: MemberShellProps) {
  return (
    <main className="members-shell">
      <Atmosphere />
      <div className="member-frame">
        <MemberHeader memberEmail={memberEmail} preview={preview} />
        <div className="member-frame__layout">
          <MemberNavigation />
          <section className="member-content">{children}</section>
        </div>
      </div>
    </main>
  );
}
