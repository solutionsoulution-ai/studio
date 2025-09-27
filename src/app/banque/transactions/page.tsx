
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Info, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBankingStore } from "@/hooks/use-banking-store.tsx";

export default function TransactionsPage() {
  const { transactions } = useBankingStore();

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
                    [...transactions].reverse().map((transaction) => (
                        <TableRow key={transaction.id}>
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
