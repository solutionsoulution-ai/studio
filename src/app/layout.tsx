
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script";

const faviconSvg = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='50' fill='hsl(231, 48%, 48%)' /%3e%3ctext y='.9em' x='50%' text-anchor='middle' font-size='60' font-family='Arial' fill='hsl(228, 55%, 99%)'%3eV%3c/text%3e%3c/svg%3e";

export const metadata: Metadata = {
  title: 'Vylsfond - Centre de Prêt',
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
        <link rel="icon" href={faviconSvg} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
