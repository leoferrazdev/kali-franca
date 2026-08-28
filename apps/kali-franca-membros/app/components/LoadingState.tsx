export function LoadingState({ label = 'Carregando' }: { label?: string }) {
  return (
    <span className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
