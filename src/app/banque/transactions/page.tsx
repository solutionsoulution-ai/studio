
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
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

const transactions = [
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), description: "Paiement CB - Amazon.fr", amount: -49.99, type: "debit" },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: "Virement - Salaire", amount: 2500.00, type: "credit" },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), description: "Prélèvement - Loyer", amount: -850.00, type: "debit" },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), description: "Paiement CB - Super U", amount: -78.50, type: "debit" },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), description: "Virement à - John Doe", amount: -100.00, type: "debit" },
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), description: "Paiement CB - SNCF", amount: -124.00, type: "debit" },
  { date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), description: "Paiement sans contact - Boulangerie", amount: -5.60, type: "debit" },
  { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), description: "Virement de - Jane Smith", amount: 50.00, type: "credit" },
];

export default function TransactionsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Historique des Transactions</h1>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.date.toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.type === 'credit' ? 'text-green-600' : ''}`}>
                      {transaction.type === 'credit' ? '+' : ''}
                      {transaction.amount.toLocaleString("fr-FR", { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
