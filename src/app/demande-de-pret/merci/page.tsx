
"use client";

import { Suspense } from "react";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Home, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id");

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center items-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <CardTitle className="text-2xl font-bold">Demande Envoyée !</CardTitle>
        <CardDescription>Votre demande a été soumise avec succès.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {applicationId ? (
          <p className="text-lg text-muted-foreground">
            Votre numéro de dossier est le : <strong className="font-mono text-primary">{applicationId}</strong>
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">
            Nous traitons votre demande.
          </p>
        )}
        <p className="mt-4">
          Notre équipe va maintenant examiner votre dossier. Nous vous contacterons par e-mail dans les plus brefs délais avec une réponse.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <Home className="mr-2" />
            Retour à l'accueil
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function LoadingFallback() {
    return (
        <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    )
}

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center container mx-auto py-16">
        <Suspense fallback={<LoadingFallback />}>
          <ThankYouContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}


    