
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function ThankYouContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h1 className="text-4xl font-bold tracking-tight font-headline">Message envoyé !</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons très prochainement.
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
