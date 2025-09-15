
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import MultiStepLoanForm from "@/components/site/multi-step-loan-form";

export default function DemandeDePretPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
           <div className="text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Demande de Financement</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Suivez les étapes pour compléter votre demande de prêt. C'est simple, rapide et sécurisé.
                </p>
            </div>
            <MultiStepLoanForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
