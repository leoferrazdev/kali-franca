'use client';

import { useState, type FormEvent } from 'react';
import { FormField } from './FormField';
import { InlineFeedback } from './InlineFeedback';
import { PrimaryButton } from './PrimaryButton';

export type AuthMode = 'login' | 'signup';

type AuthPanelProps = {
  mode: AuthMode;
};

export function AuthPanel({ mode }: AuthPanelProps) {
  const [notice, setNotice] = useState('');
  const isSignup = mode === 'signup';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Acesso em preparação: a autenticação será ativada em uma próxima etapa.');
  }

  function handleRecovery() {
    setNotice('A recuperação de acesso ainda está em preparação.');
  }

  return (
    <div className="auth-panel">
      <div className="auth-panel__intro">
        <p className="eyebrow">{isSignup ? 'Primeiro passo' : 'Bem-vinda(o) de volta'}</p>
        <h2>{isSignup ? 'Crie seu ponto de presença.' : 'Entre na sua jornada.'}</h2>
        <p>{isSignup ? 'Deixe seu contato para acompanhar a abertura deste espaço.' : 'Seu espaço de conteúdos e práticas começa aqui.'}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup ? <FormField id="member-name" name="name" label="Como podemos chamar você?" placeholder="Seu nome" autoComplete="name" required /> : null}
        <FormField id="member-email" name="email" label="E-mail" type="email" placeholder="voce@exemplo.com" autoComplete="email" required />
        <FormField id="member-password" name="password" label="Senha" type="password" placeholder="Sua senha" autoComplete={isSignup ? 'new-password' : 'current-password'} required minLength={8} />
        <PrimaryButton type="submit">{isSignup ? 'Solicitar acesso' : 'Acessar espaço'}</PrimaryButton>
      </form>

      {notice ? <InlineFeedback>{notice}</InlineFeedback> : null}

      <div className="auth-panel__links">
        {isSignup ? (
          <p>Já possui acesso? <a href="/login/">Entrar</a></p>
        ) : (
          <>
            <p>Primeiro acesso? <a href="/cadastro/">Criar cadastro</a></p>
            <button className="text-link" type="button" onClick={handleRecovery}>Esqueci minha senha</button>
          </>
        )}
      </div>

      <p className="auth-panel__disclaimer">Nenhum dado é enviado nesta prévia. A ativação da conta será comunicada quando a estrutura estiver pronta.</p>
    </div>
  );
}
