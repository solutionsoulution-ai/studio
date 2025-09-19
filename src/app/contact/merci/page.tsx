
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";

export default function ContactThankYouPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center container mx-auto py-16">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl font-bold">Message Envoyé !</CardTitle>
            <CardDescription>Merci de nous avoir contactés.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mt-4">
              Notre équipe a bien reçu votre message et reviendra vers vous dans les plus brefs délais.
            </p>
            <Button asChild className="mt-8">
              <Link href="/">
                <Home className="mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
