import { AuthPanel, type AuthMode } from './AuthPanel';
import { AuthShell } from './AuthShell';

export function AuthPage({ mode }: { mode: AuthMode }) {
  return (
    <AuthShell>
      <AuthPanel mode={mode} />
    </AuthShell>
  );
}
