

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demande Envoyée | VylsCapital',
  description: 'Page de remerciement suite à la soumission d\'une demande de prêt.',
};

export default function ThankYouLoanPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande envoyée avec succès !</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Merci d'avoir soumis votre demande de financement. Notre équipe va l'examiner attentivement et vous contactera dans les plus brefs délais.
            </p>
            <p className="mt-2 text-muted-foreground">
                Vous recevrez une copie de votre soumission par e-mail.
            </p>
            <div className="mt-8">
                <Button asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2" />
                        Retour à l'accueil
                    </Link>
                </Button>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
