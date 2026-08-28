import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kalì Franca | Área de membros',
  description: 'Um espaço de conteúdos e práticas da Kalì Franca em preparação.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
