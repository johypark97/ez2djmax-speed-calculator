import '@/styles/globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'EZ2DJMAX Speed Calculator',
  description:
    'A note speed calculator for DJMAX RESPECT V and EZ2ON REBOOT : R',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
