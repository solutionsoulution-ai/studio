
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Send } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold font-headline mb-8">Tableau de Bord</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-8">
              {/* Carte du Compte Courant */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Compte Courant</p>
                      <p className="text-4xl font-bold tracking-tight">12,345.67 €</p>
                      <p className="text-xs text-muted-foreground">
                        Solde au {new Date().toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-primary">FR76 ... 1234</div>
                  </div>
                </CardContent>
              </Card>

              {/* Transactions Récentes */}
              <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle className="text-lg">Transactions Récentes</CardTitle>
                  <Button variant="link" asChild>
                    <Link href="/banque/transactions">Voir tout</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <tbody className="divide-y divide-border">
                      <tr className="text-sm">
                        <td className="p-4">Paiement CB - Amazon.fr</td>
                        <td className="p-4 text-right font-medium">- 49,99 €</td>
                      </tr>
                      <tr className="text-sm">
                        <td className="p-4">Virement - Salaire</td>
                        <td className="p-4 text-right font-medium text-green-600">+ 2,500.00 €</td>
                      </tr>
                      <tr className="text-sm">
                        <td className="p-4">Prélèvement - Loyer</td>
                        <td className="p-4 text-right font-medium">- 850,00 €</td>
                      </tr>
                      <tr className="text-sm">
                        <td className="p-4">Paiement CB - Super U</td>
                        <td className="p-4 text-right font-medium">- 78,50 €</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Colonne latérale */}
            <div className="space-y-8">
              {/* Actions Rapides */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="/banque/virements">
                      <Send />
                      Faire un virement
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/contact">
                      <HelpCircle />
                      Aide et Support
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Carte d'Épargne */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Livret A</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold tracking-tight">5,120.50 €</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
