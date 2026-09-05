'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type ElevaSetupFormProps = {
  initialCutText?: string;
  preview?: boolean;
};

export function ElevaSetupForm({ initialCutText = '', preview = false }: ElevaSetupFormProps) {
  const router = useRouter();
  const [cutText, setCutText] = useState(initialCutText);
  const [photoName, setPhotoName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCutText = cutText.trim();

    if (normalizedCutText.length < 2) {
      setFeedback('Escreva pelo menos duas letras para registrar o seu corte.');
      return;
    }

    if (preview) {
      setFeedback('A prévia local não grava dados. Configure o Supabase para salvar o seu registro.');
      return;
    }

    setIsSaving(true);
    setFeedback('');

    try {
      const response = await fetch('/api/eleva/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initialCutText: normalizedCutText }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setFeedback(result.message || 'Não foi possível salvar sua configuração agora.');
        return;
      }

      router.push('/membros/eleva/');
      router.refresh();
    } catch {
      setFeedback('Não foi possível salvar sua configuração agora.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="eleva-setup-form" onSubmit={handleSubmit}>
      <div className="eleva-setup-form__field">
        <label htmlFor="eleva-initial-cut">O que eu não aceito mais na minha vida</label>
        <textarea
          aria-describedby="eleva-initial-cut-hint"
          aria-invalid={Boolean(feedback && cutText.trim().length < 2)}
          id="eleva-initial-cut"
          name="initialCutText"
          onChange={(event) => setCutText(event.target.value)}
          placeholder="Escreva o padrão, a repetição ou o estado que você escolhe deixar para trás."
          required
          rows={7}
          value={cutText}
        />
        <span id="eleva-initial-cut-hint">Este registro é privado e servirá como marco de acompanhamento da sua jornada.</span>
      </div>

      <div className="eleva-setup-form__field">
        <label htmlFor="eleva-initial-photo">Foto atual <span>(opcional)</span></label>
        <input
          accept="image/*"
          id="eleva-initial-photo"
          name="initialPhoto"
          onChange={(event) => setPhotoName(event.target.files?.[0]?.name || '')}
          type="file"
        />
        <span>{photoName || 'A foto será conectada ao armazenamento privado na próxima etapa.'}</span>
      </div>

      <button className="primary-button eleva-setup-form__submit" disabled={isSaving || preview} type="submit">
        <span>{isSaving ? 'Salvando…' : 'Salvar configuração inicial'}</span>
        <span className="primary-button__arrow" aria-hidden="true">→</span>
      </button>

      {preview ? <p className="eleva-setup-form__notice" role="status">Prévia local: o formulário está visível, mas não envia dados.</p> : null}
      {feedback ? <p className="eleva-setup-form__feedback" aria-live="polite" role="alert">{feedback}</p> : null}
    </form>
  );
}
