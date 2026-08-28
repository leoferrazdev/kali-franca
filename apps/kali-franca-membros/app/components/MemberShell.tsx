import type { ReactNode } from 'react';
import { Atmosphere } from './Atmosphere';
import { MemberHeader } from './MemberHeader';
import { MemberNavigation } from './MemberNavigation';

export function MemberShell({ children }: { children: ReactNode }) {
  return (
    <main className="members-shell">
      <Atmosphere />
      <div className="member-frame">
        <MemberHeader />
        <div className="member-frame__layout">
          <MemberNavigation />
          <section className="member-content">{children}</section>
        </div>
      </div>
    </main>
  );
}
