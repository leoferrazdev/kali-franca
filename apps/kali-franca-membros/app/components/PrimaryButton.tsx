import type { ButtonHTMLAttributes } from 'react';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button className={`primary-button ${className}`.trim()} {...props}>
      <span>{children}</span>
      <span className="primary-button__arrow" aria-hidden="true">↗</span>
    </button>
  );
}
