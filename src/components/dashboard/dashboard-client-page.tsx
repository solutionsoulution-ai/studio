
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, ArrowUpRight, ArrowDownLeft, Landmark, Send, FileText, Info, Copy, TrendingUp, TrendingDown, Ban } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TransferForm from "@/components/dashboard/transfer-form";
import type { TransferFormInput } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase-client";


const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value || 0);
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
    const { toast } = useToast();

    const copyToClipboard = () => {
        if (!value) return;
        navigator.clipboard.writeText(value);
        toast({
            title: "Copié !",
            description: `${label} a été copié dans le presse-papiers.`,
        });
    };

    return (
        <div className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-mono text-sm sm:text-base">{value || "N/A"}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label={`Copier ${label}`}>
                <Copy className="w-4 h-4" />
            </Button>
        </div>
    );
};


export default function DashboardClientPage() {
    const [accountData, setAccountData] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const fetchAccountData = useCallback(async (profileId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();

        if (profileError) throw profileError;
        setAccountData(profile);

        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('profile_id', profileId)
          .order('created_at', { ascending: false });

        if (transactionsError) throw transactionsError;
        setTransactions(transactionsData);

      } catch (e: any) {
        setError(e.message || "Une erreur est survenue lors de la récupération des données.");
        toast({ title: "Erreur de chargement", description: e.message, variant: "destructive" });
        // If error, log out
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    }, [router, toast]);

    useEffect(() => {
        const sessionString = localStorage.getItem('vyls_session');
        if (!sessionString) {
            toast({ title: "Accès non autorisé", description: "Veuillez vous reconnecter.", variant: "destructive" });
            router.push("/login");
            return;
        }
        const session = JSON.parse(sessionString);
        if (session.id) {
            fetchAccountData(session.id);
        } else {
            router.push("/login");
        }
    }, [fetchAccountData, router, toast]);

    const handleLogout = () => {
        localStorage.removeItem('vyls_session');
        toast({ title: "Déconnexion réussie." });
        router.push("/");
    };

    const handleTransferSubmit = async (transferData: TransferFormInput): Promise<{success: boolean}> => {
        if (!accountData) return {success: false};

        if (accountData.balance < transferData.amount) {
            toast({ title: "Erreur de virement", description: "Solde insuffisant.", variant: "destructive"});
            return {success: false};
        }

        const newBalance = accountData.balance - transferData.amount;

        const { error: profileUpdateError } = await supabase
            .from('profiles')
            .update({ balance: newBalance })
            .eq('id', accountData.id);

        if (profileUpdateError) {
             toast({ title: "Erreur de virement", description: profileUpdateError.message, variant: "destructive"});
             return {success: false};
        }

        const { error: txError } = await supabase.from('transactions').insert({
            profile_id: accountData.id,
            amount: -transferData.amount,
            reason: transferData.reason,
            recipient_iban: transferData.recipientIban,
            recipient_name: transferData.recipientName
        });

        if (txError) {
            // Try to revert balance
            await supabase.from('profiles').update({ balance: accountData.balance }).eq('id', accountData.id);
            toast({ title: "Erreur de virement", description: `La transaction n'a pas pu être enregistrée: ${txError.message}`, variant: "destructive"});
            return {success: false};
        }

        fetchAccountData(accountData.id); // Re-fetch data to update the view
        return {success: true};
    };

    const { totalIncome, totalExpenses } = useMemo(() => {
        if (!transactions) return { totalIncome: 0, totalExpenses: 0 };
        const income = transactions
            .filter((tx: any) => tx.amount > 0)
            .reduce((sum: number, tx: any) => sum + tx.amount, 0);
        const expenses = transactions
            .filter((tx: any) => tx.amount < 0)
            .reduce((sum: number, tx: any) => sum + tx.amount, 0);
        return { totalIncome: income, totalExpenses: expenses };
    }, [transactions]);


  if (isLoading) {
    return (
        <div className="container mx-auto py-16">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <div>
                    <Skeleton className="h-10 w-80 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>
                 <Skeleton className="h-10 w-32" />
             </div>
             <Skeleton className="h-10 w-96 mb-4" />
             <div className="grid lg:grid-cols-3 gap-6 mt-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
             </div>
              <div className="grid lg:grid-cols-5 gap-6 mt-6">
                  <div className="lg:col-span-2">
                    <Skeleton className="h-48 w-full" />
                  </div>
                  <div className="lg:col-span-3">
                    <Skeleton className="h-72 w-full" />
                  </div>
              </div>
        </div>
    )
  }

  if (error || !accountData) {
      return (
          <div className="container mx-auto py-16 text-center">
                <h1 className="text-2xl font-bold text-destructive">Erreur de chargement</h1>
                <p className="text-muted-foreground mt-2">{error || "Impossible de charger les données de votre compte."}</p>
                 <Button onClick={handleLogout} className="mt-4">
                    <LogOut className="mr-2 h-4 w-4" />
                    Retour à l'accueil et se reconnecter
                </Button>
          </div>
      )
  }

  return (
    <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Bienvenue, {accountData.email || 'Client'} !</h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    Votre identifiant client : <span className="font-mono text-foreground">{accountData.client_id}</span>
                </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
            </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Résumé</TabsTrigger>
                <TabsTrigger value="transfer">Virement</TabsTrigger>
                <TabsTrigger value="loans">Mes Prêts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <div className="grid lg:grid-cols-3 gap-6 mt-4">
                    <Card className="lg:col-span-1 h-full bg-primary/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Solde Actuel</CardTitle>
                            <Landmark className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(accountData.balance)}</p>
                            <p className="text-xs text-muted-foreground pt-1">Compte Courant : ...{accountData.account_number?.slice(-4)}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Revenus (historique)</CardTitle>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Dépenses (historique)</CardTitle>
                            <TrendingDown className="w-4 h-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                        </CardContent>
                    </Card>
                </div>

                 <div className="grid lg:grid-cols-5 gap-6 mt-6">
                    <div className="lg:col-span-2">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                   <Info className="w-5 h-5 text-primary" /> Informations du Compte
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <InfoRow label="IBAN" value={accountData.iban} />
                                <InfoRow label="BIC / SWIFT" value={accountData.bic} />
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-0 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Dernières Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                        {transactions && transactions.length > 0 ? (
                                            transactions.map((tx: any) => (
                                                <TableRow key={tx.id}>
                                                    <TableCell className="font-medium flex items-center gap-2">
                                                        {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-500"/> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                                                        {tx.reason}
                                                    </TableCell>
                                                    <TableCell className={`text-right font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(tx.amount)}</TableCell>
                                                    <TableCell className="hidden sm:table-cell text-right text-muted-foreground">{new Date(tx.created_at).toLocaleDateString('fr-FR')}</TableCell>
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
                </div>
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
                        {accountData.is_transfer_blocked ? (
                            <Alert variant="destructive">
                                <Ban className="h-4 w-4" />
                                <AlertTitle>Virements Bloqués</AlertTitle>
                                <AlertDescription>
                                    {accountData.transfer_block_reason || "Vos virements sont actuellement suspendus. Veuillez contacter le support."}
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <TransferForm
                                onTransferSubmit={handleTransferSubmit}
                                processingTimeConfig={accountData.transfer_processing_time}
                            />
                        )}
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
    </div>
  );
}

    