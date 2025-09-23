
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { ArrowDownLeft, ArrowUpRight, Ban, CheckCircle2, Clock, Copy, MoreHorizontal } from "lucide-react";

const mockTransactions = [
  { id: "TXN756", type: "Remboursement de prêt", date: "2024-07-05", amount: -459.80, status: "Terminé" },
  { id: "TXN755", type: "Virement entrant - Salaire", date: "2024-07-01", amount: 2800.00, status: "Terminé" },
  { id: "TXN754", type: "Remboursement de prêt", date: "2024-06-05", amount: -459.80, status: "Terminé" },
  { id: "TXN753", type: "Virement sortant - Loyer", date: "2024-06-01", amount: -950.00, status: "Terminé" },
  { id: "TXN752", type: "Virement entrant - Salaire", date: "2024-06-01", amount: 2800.00, status: "Terminé" },
  { id: "TXN751", type: "Déblocage des fonds - Prêt Auto", date: "2024-05-15", amount: 20000.00, status: "Terminé" },
];

const TransactionRow = ({ transaction }: { transaction: typeof mockTransactions[0] }) => {
    const isIncome = transaction.amount > 0;
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                        {isIncome ? <ArrowDownLeft className="h-4 w-4 text-green-600" /> : <ArrowUpRight className="h-4 w-4 text-red-600" />}
                    </div>
                    <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-sm text-muted-foreground">{transaction.id}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell className={`text-right font-mono ${isIncome ? 'text-green-600' : ''}`}>{transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
            <TableCell className="hidden text-right text-muted-foreground sm:table-cell">{transaction.date}</TableCell>
            <TableCell className="text-right">
                <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle2 className="mr-1 h-3 w-3" />Terminé</Badge>
            </TableCell>
        </TableRow>
    );
};

export default function DashboardPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-muted/40">
            <SiteHeader />
            <main className="flex-1 py-12">
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Bonjour, Jean</h1>
                        <p className="text-muted-foreground">Bienvenue sur votre espace personnel VylsCapital.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 mb-8">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Votre Prêt en cours</CardTitle>
                                <CardDescription>Prêt Auto #PA-84391</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-muted-foreground">Montant total</span>
                                        <span className="text-2xl font-bold">20 000,00 €</span>
                                    </div>
                                    <div className="space-y-2">
                                         <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-primary h-2.5 rounded-full" style={{ width: "15%" }}></div>
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>Remboursé: 3 218,60 €</span>
                                            <span>Restant: 16 781,40 €</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline pt-4 border-t">
                                        <span className="text-muted-foreground">Prochaine échéance</span>
                                        <div>
                                            <span className="font-bold">459,80 €</span>
                                            <span className="text-sm text-muted-foreground"> le 05/08/2024</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Informations du Compte</CardTitle>
                                <CardDescription>Pour vos virements et prélèvements.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Titulaire</p>
                                    <p className="font-semibold">Jean Dupont</p>
                                </div>
                                 <div>
                                    <p className="text-sm text-muted-foreground">IBAN</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-mono text-sm">FR76******************3456</p>
                                        <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="h-4 w-4"/></Button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">BIC/SWIFT</p>
                                    <p className="font-mono text-sm">VYLCFR21XXX</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historique des Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Montant</TableHead>
                                        <TableHead className="hidden text-right sm:table-cell">Date</TableHead>
                                        <TableHead className="text-right">Statut</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockTransactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
