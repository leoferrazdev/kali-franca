import type { InputHTMLAttributes } from 'react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function FormField({ label, hint, error, id, ...props }: FormFieldProps) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={describedBy} aria-invalid={error ? 'true' : undefined} {...props} />
      {hint ? <span className="form-field__hint" id={`${id}-hint`}>{hint}</span> : null}
      {error ? <span className="form-field__error" id={`${id}-error`} role="alert">{error}</span> : null}
    </div>
  );
}
