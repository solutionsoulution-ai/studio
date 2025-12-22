import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import PasswordProtect from '@/components/PasswordProtect';
import { BrandProvider } from '@/context/BrandContext';

export const metadata: Metadata = {
  title: 'Générateur de Documents',
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>" />
      </head>
      <body className="font-body antialiased bg-muted/20">
        <BrandProvider>
          <PasswordProtect>
            {children}
          </PasswordProtect>
        </BrandProvider>
        <Toaster />
      </body>
    </html>
  );
}
