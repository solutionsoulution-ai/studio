
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle, Send, Home, Info, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBankingStore } from "@/hooks/use-banking-store.tsx";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { balance, transactions, addTransaction } = useBankingStore();
  const recentTransactions = transactions.slice(-3).reverse();

  const simulateCredit = () => {
    addTransaction({
      description: "Virement entrant - Dépôt simulé",
      amount: 1000,
      type: 'credit'
    });
  };

  const simulateDebit = () => {
    addTransaction({
      description: "Paiement CB - Achat simulé",
      amount: -49.99,
      type: 'debit'
    });
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
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
                      <p className="text-4xl font-bold tracking-tight">
                        {balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </p>
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
                    <a href="#/transactions">Voir tout</a>
                  </Button>
                </CardHeader>
                <CardContent>
                    {recentTransactions.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Montant</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTransactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>{tx.description}</TableCell>
                                        <TableCell className={cn(
                                            "text-right font-semibold",
                                            tx.type === 'credit' ? 'text-green-600' : 'text-slate-800'
                                        )}>
                                            <span className="flex items-center justify-end gap-2">
                                                {tx.type === 'credit' ? 
                                                    <ArrowRightCircle className="w-4 h-4 text-green-500"/> : 
                                                    <ArrowLeftCircle className="w-4 h-4 text-slate-400"/>}
                                                {tx.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <Info className="mx-auto mb-2" />
                            <p>Aucune transaction pour le moment.</p>
                        </div>
                    )}
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
                  <Button asChild className="w-full justify-start">
                    <a href="#/virements">
                      <Send className="mr-2"/>
                      Faire un virement
                    </a>
                  </Button>
                  <Button variant="outline" onClick={simulateCredit} className="w-full justify-start">
                    + Créditer 1 000 € (Simulation)
                  </Button>
                   <Button variant="outline" onClick={simulateDebit} className="w-full justify-start">
                    - Payer 49,99 € (Simulation)
                  </Button>
                  <Button variant="secondary" asChild className="w-full justify-start">
                    <Link href="/contact">
                      <HelpCircle className="mr-2"/>
                      Aide et Support
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Mes Prêts en cours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mes Prêts en Cours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold flex items-center gap-2"><Home className="w-4 h-4 text-primary" /> Prêt Immobilier</span>
                            <span className="text-sm font-mono text-muted-foreground">#IMMO-789</span>
                        </div>
                        <Progress value={60} aria-label="60% remboursé" />
                        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                            <span>180/300 mois</span>
                            <span className="font-semibold">125,450.12 € restants</span>
                        </div>
                    </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
