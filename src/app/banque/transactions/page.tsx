
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
import { Info } from "lucide-react";


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
                <TableRow>
                  <TableCell colSpan={3} className="h-48 text-center text-muted-foreground">
                    <Info className="mx-auto mb-2" />
                    Aucune transaction à afficher pour le moment.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
