type ProgressIndicatorProps = {
  value: number;
  label?: string;
};

export function ProgressIndicator({ value, label = 'Progresso' }: ProgressIndicatorProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-indicator">
      <div className="progress-indicator__meta">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div className="progress-indicator__track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
