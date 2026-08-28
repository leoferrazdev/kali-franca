type InlineFeedbackProps = {
  children: React.ReactNode;
  tone?: 'info' | 'success' | 'error';
};

export function InlineFeedback({ children, tone = 'info' }: InlineFeedbackProps) {
  return (
    <div className={`inline-feedback inline-feedback--${tone}`} role="status" aria-live="polite">
      <span className="inline-feedback__mark" aria-hidden="true">✦</span>
      <span>{children}</span>
    </div>
  );
}
