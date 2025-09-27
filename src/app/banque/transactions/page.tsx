
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
    { date: "15 Juil. 2024", description: "Virement entrant - Salaire", amount: 2850.75, type: 'credit' },
    { date: "14 Juil. 2024", description: "Prélèvement - Loyer", amount: -850.00, type: 'debit' },
    { date: "12 Juil. 2024", description: "Paiement CB - Supermarché", amount: -78.45, type: 'debit' },
    { date: "10 Juil. 2024", description: "Virement SEPA - John Doe", amount: -150.00, type: 'debit' },
    { date: "08 Juil. 2024", description: "Paiement CB - Restaurant", amount: -45.50, type: 'debit' },
    { date: "05 Juil. 2024", description: "Virement entrant - Vente en ligne", amount: 250.00, type: 'credit' },
];

export default function TransactionsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Historique des Transactions</h1>
          </div>

          <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-1/4">Date</TableHead>
                    <TableHead className="w-1/2">Description</TableHead>
                    <TableHead className="text-right w-1/4">Montant</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <TableRow key={index}>
                        <TableCell className="font-medium">{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className={cn(
                            "text-right font-semibold",
                            transaction.type === 'credit' ? 'text-green-600' : 'text-slate-800'
                        )}>
                            <span className="flex items-center justify-end gap-2">
                                {transaction.type === 'credit' ? 
                                    <ArrowRightCircle className="w-4 h-4 text-green-500"/> : 
                                    <ArrowLeftCircle className="w-4 h-4 text-slate-400"/>}
                                {transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                            </span>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-48 text-center text-muted-foreground">
                        <Info className="mx-auto mb-2" />
                        Aucune transaction à afficher pour le moment.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}
