import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import PasswordProtect from '@/components/PasswordProtect';

export const metadata: Metadata = {
  title: 'Neofonds - Générateur de Documents',
  description: 'Générez des documents financiers professionnels.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.postimg.cc/ZqGtbXxd/Capture-d-ecran-2025-12-20-110200.png" />
      </head>
      <body className="font-body antialiased bg-muted/20">
        <PasswordProtect>
          {children}
        </PasswordProtect>
        <Toaster />
      </body>
    </html>
  );
}
