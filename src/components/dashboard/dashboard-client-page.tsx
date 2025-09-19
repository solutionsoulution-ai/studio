
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, ArrowUpRight, ArrowDownLeft, Landmark, Send, FileText, Info, Copy, TrendingUp, TrendingDown, Ban, Loader2, X, CheckCircle, AlertTriangle, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TransferForm from "@/components/dashboard/transfer-form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { getClientByIdAction, createTransferAction } from "@/app/actions/clients";
import type { ClientProfile } from "@/app/actions/clients";
import type { TransferFormInput } from "@/lib/schemas";
import ClientTransactionProgress from "./client-transaction-progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Transaction {
    id: string;
    profile_id: string;
    amount: number;
    reason: string;
    recipient_iban: string | null;
    recipient_name: string | null;
    created_at: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    estimatedCompletionDate?: string;
}

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

const TransactionDetailDialog = ({ transaction, open, onOpenChange }: { transaction: Transaction | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!transaction) return null;

    const getStatusBadge = (status: Transaction['status']) => {
        switch (status) {
            case 'COMPLETED':
                return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle />Terminé</Badge>;
            case 'PENDING':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Loader2 className="animate-spin" />En attente</Badge>;
            case 'FAILED':
                return <Badge variant="destructive"><AlertTriangle />Échoué</Badge>;
            default:
                return <Badge variant="outline">Inconnu</Badge>;
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Détails de la Transaction</DialogTitle>
                    <DialogDescription>
                        ID de la transaction : {transaction.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Statut</span>
                        {getStatusBadge(transaction.status)}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Montant</span>
                        <span className={cn("font-bold text-lg", transaction.amount > 0 ? 'text-green-600' : 'text-red-600')}>{formatCurrency(transaction.amount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Date</span>
                        <span>{new Date(transaction.created_at).toLocaleString('fr-FR')}</span>
                    </div>
                     <div className="flex justify-between items-start pt-2">
                        <span className="text-muted-foreground">Motif</span>
                        <span className="text-right font-medium">{transaction.reason}</span>
                    </div>
                    {transaction.recipient_name && (
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Bénéficiaire</span>
                            <span>{transaction.recipient_name}</span>
                        </div>
                    )}
                    {transaction.recipient_iban && (
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">IBAN Bénéficiaire</span>
                            <span className="font-mono">{transaction.recipient_iban}</span>
                        </div>
                    )}
                    {transaction.status === 'FAILED' && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Problème avec votre virement</AlertTitle>
                            <AlertDescription>
                                Cette transaction a échoué. Si vous avez des questions, n'hésitez pas à nous contacter.
                                <Button asChild variant="link" className="p-0 h-auto ml-1">
                                    <Link href="/contact">
                                        <Phone className="mr-1" /> Contacter le support
                                    </Link>
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                 <DialogClose asChild>
                    <Button type="button" variant="outline" className="mt-4 w-full">Fermer</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}


export default function DashboardClientPage() {
    const [accountData, setAccountData] = useState<Omit<ClientProfile, 'password'> | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleLogout = useCallback(() => {
        sessionStorage.removeItem('vyls_session_id');
        toast({ title: "Déconnexion réussie." });
        router.push("/");
    }, [router, toast]);


    const fetchAccountData = useCallback(async (clientId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getClientByIdAction(clientId);
        if (!result.success || !result.client) {
            throw new Error(result.error || "Client non trouvé.");
        }
        
        setAccountData(result.client);
        setTransactions(result.client.transactions || []);

      } catch (e: any) {
        setError(e.message || "Une erreur est survenue lors de la récupération des données.");
        toast({ title: "Erreur de chargement", description: e.message, variant: "destructive" });
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    }, [toast, handleLogout]);

    useEffect(() => {
        const clientId = sessionStorage.getItem('vyls_session_id');
        if (!clientId) {
            toast({ title: "Accès non autorisé", description: "Veuillez vous reconnecter.", variant: "destructive" });
            router.push("/login");
            return;
        }
        
        // Fetch data immediately
        fetchAccountData(clientId);

        // Then set up an interval to poll for updates
        const intervalId = setInterval(() => fetchAccountData(clientId), 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [fetchAccountData, router, toast]);

    const handleTransferSubmit = async (transferData: TransferFormInput): Promise<{success: boolean}> => {
        if (!accountData) return {success: false};

        const result = await createTransferAction({
            clientId: accountData.id,
            ...transferData
        });

        if (result.success) {
             // Immediately re-fetch data to update the view
            fetchAccountData(accountData.id);
        } else {
             toast({ title: "Erreur de virement", description: result.error, variant: "destructive"});
        }
        return {success: result.success};
    };

    const { totalIncome, totalExpenses } = useMemo(() => {
        if (!transactions) return { totalIncome: 0, totalExpenses: 0 };
        const income = transactions
            .filter((tx) => tx.status === 'COMPLETED' && tx.amount > 0)
            .reduce((sum, tx) => sum + tx.amount, 0);
        const expenses = transactions
            .filter((tx) => (tx.status === 'COMPLETED' || tx.status === 'PENDING') && tx.amount < 0)
            .reduce((sum, tx) => sum + tx.amount, 0);
        return { totalIncome: income, totalExpenses: expenses };
    }, [transactions]);


  if (isLoading && !accountData) { // Only show full-page skeleton on initial load
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

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const pendingTransactions = sortedTransactions.filter(tx => tx.status === 'PENDING');
  const completedTransactions = sortedTransactions.filter(tx => tx.status !== 'PENDING');

  return (
    <div className="container mx-auto py-16">
        <TransactionDetailDialog 
            transaction={selectedTransaction} 
            open={!!selectedTransaction}
            onOpenChange={(open) => !open && setSelectedTransaction(null)}
        />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Bienvenue, {accountData.email || 'Client'} !</h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    Votre identifiant client : <span className="font-mono text-foreground">{accountData.client_id}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                {isLoading && <Loader2 className="animate-spin text-muted-foreground" />}
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Résumé</TabsTrigger>
                <TabsTrigger value="transfer">Virement</TabsTrigger>
                <TabsTrigger value="loans">Mes Prêts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                {pendingTransactions.length > 0 && (
                    <Card className="mt-6 bg-amber-500/10 border-amber-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-700">
                                <Loader2 className="animate-spin" /> Virements en Cours de Traitement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {pendingTransactions.map(tx => (
                                <ClientTransactionProgress key={tx.id} transaction={tx} />
                            ))}
                        </CardContent>
                    </Card>
                )}
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
                            <CardTitle>Historique des Transactions</CardTitle>
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
                                        {completedTransactions.length > 0 ? (
                                            completedTransactions.map((tx) => (
                                                <TableRow key={tx.id} onClick={() => setSelectedTransaction(tx)} className="cursor-pointer">
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-500"/> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                                                            <span>{tx.reason}</span>
                                                        </div>
                                                        {tx.status === 'FAILED' && <Badge variant="destructive" className="mt-1">Échoué</Badge>}
                                                    </TableCell>
                                                    <TableCell className={`text-right font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(tx.amount)}</TableCell>
                                                    <TableCell className="hidden sm:table-cell text-right text-muted-foreground">{new Date(tx.created_at).toLocaleDateString('fr-FR')}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                    Aucune transaction finalisée pour le moment.
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
                        <div className="mt-6">
                             <TransferForm
                                onTransferSubmit={handleTransferSubmit}
                            />
                        </div>
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

    