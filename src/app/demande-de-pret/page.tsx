
"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import LoanApplicationForm from "@/components/site/loan-application-form";
import CtaSection from "@/components/site/cta-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default function DemandeDePretPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto py-12 md:py-24 px-4">
            <div className="mx-auto max-w-3xl">
               <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande de Financement</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Remplissez le formulaire pour soumettre votre demande. C'est simple et sécurisé.
                    </p>
                </div>
                
                <Alert className="mb-8 bg-muted/50">
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle className="font-semibold">Transparence et Sécurité</AlertTitle>
                    <AlertDescription>
                        Les informations que vous nous confiez sont précieuses. Elles sont utilisées exclusivement pour l'étude de votre dossier de financement. Toutes vos données sont transmises de manière sécurisée (cryptage SSL) et stockées sur des serveurs en Europe, conformément au RGPD.
                    </AlertDescription>
                </Alert>

                <LoanApplicationForm />
            </div>
        </div>
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
