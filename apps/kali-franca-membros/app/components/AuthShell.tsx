import type { ReactNode } from 'react';
import { Atmosphere } from './Atmosphere';
import { BrandMark } from './BrandMark';

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="auth-shell">
      <Atmosphere />
      <div className="auth-shell__topline">
        <BrandMark />
        <span className="topline-note">Experiência Kalì Franca</span>
      </div>
      <div className="auth-shell__layout">
        <section className="auth-story" aria-labelledby="auth-story-title">
          <div className="auth-story__glyph" aria-hidden="true">
            <span className="auth-story__glyph-core">KF</span>
            <span className="auth-story__glyph-ring auth-story__glyph-ring--one" />
            <span className="auth-story__glyph-ring auth-story__glyph-ring--two" />
          </div>
          <p className="eyebrow">Área de membros</p>
          <h1 id="auth-story-title">Um espaço para voltar a si.</h1>
          <p className="auth-story__description">Acesse sua jornada com presença, clareza e o tempo necessário para cada próximo passo.</p>
          <div className="auth-story__signature">
            <span className="frequency-line" aria-hidden="true" />
            <span>Despertar da consciência</span>
          </div>
        </section>
        <section className="auth-shell__panel" aria-label="Acesso à área de membros">
          {children}
        </section>
      </div>
      <p className="auth-shell__footer">Kalì Franca <span aria-hidden="true">·</span> um espaço em construção consciente</p>
    </main>
  );
}
