type ContentCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
};

export function ContentCard({ eyebrow, title, description, meta }: ContentCardProps) {
  return (
    <article className="content-card">
      <div className="content-card__mark" aria-hidden="true">✦</div>
      <div>
        <p className="content-card__eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        {meta ? <span className="content-card__meta">{meta}</span> : null}
      </div>
    </article>
  );
}
