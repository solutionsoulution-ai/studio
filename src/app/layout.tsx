import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script";

export const metadata: Metadata = {
  title: 'VylsCapital - Centre de Prêt',
  description: 'Solutions de financement rapides et flexibles pour aider votre entreprise à prospérer.',
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <div className="gtranslate_wrapper"></div>
        <Script id="gtranslate-settings">
          {`window.gtranslateSettings = {"default_language":"fr","native_language_names":true,"languages":["fr","it","es","de","en","pt"],"wrapper_selector":".gtranslate_wrapper","switcher_horizontal_position":"right"}`}
        </Script>
        <Script src="https://cdn.gtranslate.net/widgets/latest/float.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
