
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SubmissionsPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const sessionRole = sessionStorage.getItem('vyls_user_role');
    if (sessionRole === 'admin') {
      setIsAdmin(true);
    } else {
       toast({ title: "Accès non autorisé", description: "Vous devez être administrateur.", variant: "destructive" });
       router.push("/login");
    }
  }, [router, toast]);

  if (!isClient || !isAdmin) {
    return (
       <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
            <Loader2 className="animate-spin text-primary" size={48} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
                 <h1 className="text-3xl font-bold mb-2">Soumissions des Formulaires</h1>
                <p className="text-muted-foreground">Les soumissions sont maintenant envoyées par email.</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/admin">
                    <ArrowLeft className="mr-2" />
                    Retour au panneau principal
                </Link>
            </Button>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Changement de fonctionnement</AlertTitle>
          <AlertDescription>
            Toutes les demandes de prêt et les messages de contact sont désormais envoyés directement à votre adresse e-mail configurée ({process.env.NEXT_PUBLIC_SMTP_RECIPIENT_EMAIL || 'non configuré'}). Veuillez consulter votre boîte de réception pour gérer les nouvelles soumissions.
          </AlertDescription>
        </Alert>

      </div>
    </main>
  );
}
