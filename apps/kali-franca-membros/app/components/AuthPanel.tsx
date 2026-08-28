'use client';

import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { FormField } from './FormField';
import { InlineFeedback } from './InlineFeedback';
import { LoadingState } from './LoadingState';
import { PrimaryButton } from './PrimaryButton';
import { createSupabaseBrowserClient } from '../../lib/supabase/browser';

export type AuthMode = 'login' | 'signup';

type AuthPanelProps = {
  mode: AuthMode;
};

export function AuthPanel({ mode }: AuthPanelProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);
  const isSignup = mode === 'signup';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');
    setPending(true);

    try {
      const supabase = createSupabaseBrowserClient();

      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        if (data.session) {
          router.replace('/membros/');
          router.refresh();
          return;
        }

        setNotice('Cadastro iniciado. Verifique seu e-mail para ativar o acesso.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        router.replace('/membros/');
        router.refresh();
      }
    } catch (cause) {
      if (cause instanceof Error && cause.message === 'Configuração do Supabase ausente.') {
        setNotice('Acesso em preparação: a autenticação ainda não foi configurada neste ambiente.');
      } else if (isSignup) {
        setNotice('Não foi possível iniciar o cadastro. Revise os dados e tente novamente.');
      } else {
        setNotice('E-mail ou senha não reconhecidos.');
      }
    } finally {
      setPending(false);
    }
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
        {isSignup ? <FormField id="member-name" label="Como podemos chamar você?" placeholder="Seu nome" autoComplete="name" value={fullName} onChange={(event: ChangeEvent<HTMLInputElement>) => setFullName(event.target.value)} required /> : null}
        <FormField id="member-email" label="E-mail" type="email" placeholder="voce@exemplo.com" autoComplete="email" value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} required />
        <FormField id="member-password" label="Senha" type="password" placeholder="Sua senha" autoComplete={isSignup ? 'new-password' : 'current-password'} value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} required minLength={8} />
        <PrimaryButton type="submit" disabled={pending}>{pending ? <LoadingState label={isSignup ? 'Solicitando acesso' : 'Entrando'} /> : (isSignup ? 'Solicitar acesso' : 'Acessar espaço')}</PrimaryButton>
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
