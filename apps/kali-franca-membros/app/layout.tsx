import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kali França | Área de membros',
  description: 'Área de membros da Kali França em preparação.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
