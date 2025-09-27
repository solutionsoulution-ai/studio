
"use client";

import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import LoanApplicationForm from "@/components/site/loan-application-form";

export default function DemandeDePretPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-12 md:py-24 px-4">
        <div className="mx-auto max-w-3xl">
           <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Demande de Financement</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Remplissez le formulaire pour soumettre votre demande. C'est simple, rapide et sécurisé.
                </p>
            </div>

            <LoanApplicationForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
