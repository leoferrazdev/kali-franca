type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <a className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} href="https://kalifranca.com.br/" aria-label="Kalì Franca — voltar ao site principal">
      <span className="brand-mark__symbol" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-mark__wordmark">
        <strong>Kalì</strong>
        <small>Franca</small>
      </span>
    </a>
  );
}
