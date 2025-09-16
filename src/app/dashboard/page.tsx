
"use client";

import { useState } from "react";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, ArrowUpRight, ArrowDownLeft, Landmark, Send, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TransferForm from "@/components/dashboard/transfer-form";
import type { TransferFormInput } from "@/app/actions";


// Données initiales pour l'exemple
const initialAccountData = {
  balance: 12345.67,
  iban: "FR76 3000 4000 0512 3456 7890 123",
  transactions: [],
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value);
};


export default function DashboardPage() {
    const [accountData, setAccountData] = useState(initialAccountData);

    const handleTransferSuccess = (transferData: TransferFormInput) => {
        const newTransaction = {
            id: new Date().toISOString(),
            type: `Virement à ${transferData.recipientName}`,
            date: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
            amount: -transferData.amount,
        };

        setAccountData(prevData => ({
            ...prevData,
            balance: prevData.balance - transferData.amount,
            transactions: [newTransaction, ...prevData.transactions]
        }));
    };


  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold font-headline">Tableau de Bord Client</h1>
            <Button variant="outline" asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Link>
            </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Résumé</TabsTrigger>
                <TabsTrigger value="transfer">Virement</TabsTrigger>
                <TabsTrigger value="loans">Mes Prêts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Card className="mt-4">
                    <CardHeader className="flex flex-row justify-between items-start">
                        <div>
                            <CardTitle>Résumé du Compte</CardTitle>
                            <CardDescription>Client de Test - Compte Courant</CardDescription>
                        </div>
                         <div className="text-right">
                            <p className="text-sm text-muted-foreground">Solde Actuel</p>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(accountData.balance)}</p>
                         </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-mono text-muted-foreground mb-4">{accountData.iban}</p>
                        <h3 className="text-lg font-semibold mb-2">Dernières Transactions</h3>
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Montant</TableHead>
                                        <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {accountData.transactions.length > 0 ? (
                                        accountData.transactions.map((tx) => (
                                            <TableRow key={tx.id}>
                                                <TableCell className="font-medium flex items-center gap-2">
                                                    {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-500"/> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                                                    {tx.type}
                                                </TableCell>
                                                <TableCell className={`text-right font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(tx.amount)}</TableCell>
                                                <TableCell className="hidden sm:table-cell text-right text-muted-foreground">{new Date(tx.date).toLocaleDateString('fr-FR')}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                Aucune transaction pour le moment.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="transfer">
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Send/> Effectuer un Virement
                        </CardTitle>
                        <CardDescription>Transférez de l'argent facilement et en toute sécurité.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TransferForm onTransferSuccess={handleTransferSuccess} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="loans">
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Landmark /> Gérer mes Prêts
                        </CardTitle>
                        <CardDescription>Consultez vos prêts en cours et vos demandes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center py-12">
                         <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">La section de gestion des prêts est en cours de construction.</p>
                        <Button asChild>
                            <Link href="/demande-de-pret">
                                Faire une nouvelle demande de prêt
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
