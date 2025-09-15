import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, LogOut } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Tableau de Bord Client</h1>
            <Button variant="outline" asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Link>
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Bienvenue, Client de Test !</CardTitle>
                <CardDescription>Ceci est votre espace client. D'ici, vous pourrez bientôt gérer vos prêts et informations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>Fonctionnalités à venir :</p>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>Voir l'historique de vos demandes de prêt.</li>
                    <li>Suivre le statut de vos demandes en cours.</li>
                    <li>Gérer vos informations personnelles.</li>
                    <li>Accéder à vos documents.</li>
                </ul>

                <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Faire une nouvelle demande
                </Button>
            </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
