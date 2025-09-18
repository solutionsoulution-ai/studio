
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, Users, ArrowLeft, UserCog, AlertCircle, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getClientsAction, deleteClientAction, verifyAdminLoginAction } from "@/app/actions/clients";
import type { ClientProfile } from "@/app/actions/clients";


// Schéma pour le formulaire de connexion admin
const adminLoginSchema = z.object({
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});
type AdminLoginValues = z.infer<typeof adminLoginSchema>;

const AdminLoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(values: AdminLoginValues) {
    setIsLoading(true);
    const result = await verifyAdminLoginAction(values.password);
    setIsLoading(false);

    if (result.success) {
      toast({ title: "Accès autorisé" });
      sessionStorage.setItem('vyls_admin_session', 'true');
      onLoginSuccess();
    } else {
      toast({ title: "Accès refusé", description: result.error, variant: "destructive" });
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Accès Administrateur</CardTitle>
        <CardDescription>Veuillez entrer le mot de passe administrateur.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password">Mot de Passe Administrateur</label>
            <input id="password" type="password" {...form.register("password")} disabled={isLoading} className="w-full p-2 border rounded-md" />
            {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Shield />}
            Déverrouiller
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ClientList = ({ clients, onClientSelect, isLoading, error }: { clients: ClientProfile[], onClientSelect: (client:ClientProfile) => void, isLoading: boolean, error?: string | null }) => {

    if (isLoading) {
         return (
             <Card className="w-full shadow-lg mt-8 lg:mt-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <Users /> Liste des Clients
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
         return (
             <Card className="w-full shadow-lg mt-8 lg:mt-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                       <AlertCircle className="text-destructive" /> Erreur
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-destructive py-12">
                    {error}
                </CardContent>
            </Card>
        );
    }

    if (clients.length === 0) {
        return (
             <Card className="w-full shadow-lg mt-8 lg:mt-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <Users /> Liste des Clients
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                    Aucun client trouvé.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full shadow-lg mt-8 lg:mt-0">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <Users /> Liste des Clients
                </CardTitle>
                <CardDescription>
                    Cliquez sur un client pour voir les détails.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>ID Client</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Solde</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client) => (
                        <TableRow key={client.id} onClick={() => onClientSelect(client)} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-mono">{client.client_id}</TableCell>
                            <TableCell className="font-medium">{client.email}</TableCell>
                            <TableCell>{(client.balance || 0).toFixed(2)} €</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

const ClientDetailView = ({ client, onBack, onClientAction }: { client: ClientProfile, onBack: () => void, onClientAction: () => void }) => {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDelete = async () => {
        if (!client) return;
        setIsDeleting(true);
        const result = await deleteClientAction(client.id);
        setIsDeleting(false);

        if (result.success) {
            toast({ title: "Client Supprimé", description: "Le client a été supprimé avec succès." });
            onClientAction();
            onBack();
        } else {
             toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    };

    if (!client) return null;

    return (
        <Card className="w-full shadow-lg col-span-1 lg:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <UserCog /> Détails du Client
                        </CardTitle>
                        <CardDescription>{client.email}</CardDescription>
                        <p className="font-mono text-sm mt-1">ID: {client.client_id}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">Informations du Compte</h3>
                    <p><strong>Solde :</strong> <span className="font-bold text-primary">{(client.balance || 0).toFixed(2)} €</span></p>
                    <p><strong>Numéro de compte :</strong> {client.account_number}</p>
                    <p><strong>IBAN :</strong> {client.iban}</p>
                    <p><strong>BIC/SWIFT :</strong> {client.bic}</p>
                    <p><strong>Date de création :</strong> {new Date(client.created_at).toLocaleDateString('fr-FR')}</p>
                </div>

                {client.has_loan && (
                     <div className="p-4 border rounded-md">
                        <h3 className="font-semibold mb-2">Informations du Prêt</h3>
                        <p><strong>Type de prêt :</strong> {client.loan_type}</p>
                        <p><strong>Montant :</strong> {client.loan_amount} €</p>
                        <p><strong>Taux :</strong> {client.interest_rate} %</p>
                        <p><strong>Durée :</strong> {client.loan_term} ans</p>
                    </div>
                )}
                 <div className="p-4 border rounded-md space-y-4 bg-secondary/30">
                     <h3 className="font-semibold mb-2 pt-2">Zone de Danger</h3>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={isDeleting}>
                                <Trash2 className="mr-2" /> Supprimer le Client
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce client ?</AlertDialogTitle>
                            <AlertDialogDescription>Cette action est irréversible et supprimera le profil du client et toutes les transactions associées.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting && <Loader2 className="animate-spin mr-2" />}
                                Confirmer la suppression
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('vyls_admin_session') === 'true') {
        setIsAdmin(true);
    }
  }, []);

  const fetchClients = useCallback(async () => {
      if (!isAdmin) return;
      setIsLoadingClients(true);
      setErrorClients(null);
      
      const result = await getClientsAction();

      if (result.success && result.clients) {
        setClients(result.clients);
      } else {
        setErrorClients(result.error || "Une erreur est survenue.");
        setClients([]);
      }
      setIsLoadingClients(false);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchClients();
    }
  }, [isAdmin, fetchClients]);

  const handleClientSelection = (client: ClientProfile) => {
    setSelectedClient(client);
  }

  const handleBackToList = () => {
    setSelectedClient(null);
    fetchClients();
  }

  if (!isClient) {
    return (
       <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
            <Loader2 className="animate-spin" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
        <AdminLoginForm onLoginSuccess={() => setIsAdmin(true)} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Panneau Administrateur</h1>
        <p className="text-muted-foreground mb-8">Consultez les informations des clients.</p>
        
        {selectedClient ? (
            <ClientDetailView
                client={selectedClient}
                onBack={handleBackToList}
                onClientAction={fetchClients}
            />
        ) : (
            <ClientList
                clients={clients}
                onClientSelect={handleClientSelection}
                isLoading={isLoadingClients}
                error={errorClients}
            />
        )}
      </div>
    </main>
  );
}
