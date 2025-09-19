
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
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
import { Loader2, Shield, Users, ArrowLeft, UserCog, AlertCircle, Trash2, UserPlus, Banknote, Plus, Minus, Ban, Clock, Timer } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getClientsAction, deleteClientAction, verifyAdminLoginAction, createClientAction, adjustClientBalanceAction, updateClientBlockSettingsAction, updateClientTransferSettingsAction } from "@/app/actions/clients";
import type { ClientProfile } from "@/app/actions/clients";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


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

const createClientSchema = z.object({
    email: z.string().email("L'adresse e-mail est invalide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
    initialBalance: z.coerce.number().min(0, "Le solde initial ne peut pas être négatif."),
});
type CreateClientValues = z.infer<typeof createClientSchema>;

const CreateClientForm = ({ onClientCreated }: { onClientCreated: () => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<CreateClientValues>({
        resolver: zodResolver(createClientSchema),
        defaultValues: { email: "", password: "", initialBalance: 0 },
    });

    async function onSubmit(values: CreateClientValues) {
        setIsLoading(true);
        const result = await createClientAction(values);
        setIsLoading(false);

        if (result.success) {
            toast({ title: "Client Créé", description: "Le nouveau client a été ajouté avec succès." });
            onClientCreated();
            setOpen(false); // Close dialog on success
            form.reset();
        } else {
            toast({ title: "Erreur de création", description: result.error, variant: "destructive" });
        }
    }

    return (
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2" />
                    Créer un Client
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer un nouveau client</DialogTitle>
                    <DialogDescription>
                        Entrez les détails ci-dessous pour créer un nouveau profil client.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input id="email" type="email" {...form.register("email")} className="w-full mt-1" disabled={isLoading} />
                        {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <Input id="password" type="password" {...form.register("password")} className="w-full mt-1" disabled={isLoading} />
                        {form.formState.errors.password && <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="initialBalance">Solde initial (€)</label>
                        <Input id="initialBalance" type="number" {...form.register("initialBalance")} className="w-full mt-1" disabled={isLoading} />
                        {form.formState.errors.initialBalance && <p className="text-red-500 text-sm mt-1">{form.formState.errors.initialBalance.message}</p>}
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isLoading}>Annuler</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Créer le client"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


const ClientList = ({ clients, onClientSelect, isLoading, error, onClientCreated }: { clients: Omit<ClientProfile, 'password'>[], onClientSelect: (client:Omit<ClientProfile, 'password'>) => void, isLoading: boolean, error?: string | null, onClientCreated: () => void }) => {

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

    return (
        <Card className="w-full shadow-lg mt-8 lg:mt-0">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <Users /> Liste des Clients
                        </CardTitle>
                        <CardDescription>
                            Cliquez sur un client pour voir les détails ou créez un nouveau client.
                        </CardDescription>
                    </div>
                    <CreateClientForm onClientCreated={onClientCreated} />
                </div>
            </CardHeader>
            <CardContent>
                {clients.length === 0 ? (
                     <div className="text-center text-muted-foreground py-12">
                        Aucun client trouvé.
                    </div>
                ): (
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
                )}
            </CardContent>
        </Card>
    )
}

const balanceAdjustmentSchema = z.object({
  amount: z.coerce.number().positive("Le montant doit être positif."),
  reason: z.string().min(3, "Le motif est requis (min 3 caractères)."),
  type: z.enum(['credit', 'debit']),
});
type BalanceAdjustmentValues = z.infer<typeof balanceAdjustmentSchema>;

const BalanceAdjustmentForm = ({ client, onActionSuccess }: { client: Omit<ClientProfile, 'password'>, onActionSuccess: () => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<BalanceAdjustmentValues>({
        resolver: zodResolver(balanceAdjustmentSchema),
        defaultValues: { amount: "" as unknown as number, reason: "", type: 'credit' },
    });

    async function onSubmit(values: BalanceAdjustmentValues) {
        setIsLoading(true);
        const result = await adjustClientBalanceAction({
            ...values,
            clientId: client.id,
        });
        setIsLoading(false);

        if (result.success) {
            toast({ title: "Opération réussie", description: "Le solde du client a été mis à jour." });
            onActionSuccess();
            setOpen(false);
            form.reset();
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Banknote className="mr-2" /> Créditer / Débiter
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajuster le Solde</DialogTitle>
                    <DialogDescription>Créditez ou débitez le compte de {client.email}.</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label>Type d'opération</label>
                        <Select onValueChange={(value) => form.setValue('type', value as 'credit' | 'debit')} defaultValue={form.getValues('type')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit"><div className="flex items-center gap-2"><Plus/>Crédit</div></SelectItem>
                                <SelectItem value="debit"><div className="flex items-center gap-2"><Minus/>Débit</div></SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="amount">Montant (€)</label>
                        <Input id="amount" type="number" step="0.01" {...form.register("amount")} className="w-full mt-1" disabled={isLoading} />
                        {form.formState.errors.amount && <p className="text-red-500 text-sm mt-1">{form.formState.errors.amount.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="reason">Motif</label>
                        <Input id="reason" {...form.register("reason")} className="w-full mt-1" disabled={isLoading} />
                        {form.formState.errors.reason && <p className="text-red-500 text-sm mt-1">{form.formState.errors.reason.message}</p>}
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isLoading}>Annuler</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Valider l'opération"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const blockSettingsSchema = z.object({
  is_transfer_blocked: z.boolean(),
  transfer_block_reason: z.string().optional(),
});
type BlockSettingsValues = z.infer<typeof blockSettingsSchema>;

const BlockSettingsForm = ({ client, onActionSuccess }: { client: Omit<ClientProfile, 'password'>, onActionSuccess: () => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<BlockSettingsValues>({
        resolver: zodResolver(blockSettingsSchema),
        defaultValues: {
            is_transfer_blocked: client.is_transfer_blocked,
            transfer_block_reason: client.transfer_block_reason || "",
        },
    });

    async function onSubmit(values: BlockSettingsValues) {
        setIsLoading(true);
        const result = await updateClientBlockSettingsAction({
            clientId: client.id,
            is_transfer_blocked: values.is_transfer_blocked,
            transfer_block_reason: values.is_transfer_blocked ? values.transfer_block_reason || "Aucun motif spécifié" : null
        });
        setIsLoading(false);

        if (result.success) {
            toast({ title: "Paramètres mis à jour", description: "Les paramètres de blocage du client ont été modifiés." });
            onActionSuccess();
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    }
    
    const isBlocked = form.watch('is_transfer_blocked');

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="flex items-center space-x-2">
                <Switch
                    id="is_transfer_blocked"
                    checked={form.watch('is_transfer_blocked')}
                    onCheckedChange={(checked) => form.setValue('is_transfer_blocked', checked)}
                    disabled={isLoading}
                />
                <Label htmlFor="is_transfer_blocked">Bloquer les virements</Label>
            </div>
            {isBlocked && (
                <div>
                    <Label htmlFor="transfer_block_reason">Motif du blocage</Label>
                    <Input
                        id="transfer_block_reason"
                        {...form.register("transfer_block_reason")}
                        placeholder="Ex: Vérification de compte requise"
                        className="mt-1"
                        disabled={isLoading}
                    />
                </div>
            )}
            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Enregistrer"}
            </Button>
        </form>
    );
};

const transferSettingsSchema = z.object({
  duration: z.coerce.number().min(0, "La durée ne peut être négative."),
  unit: z.enum(['minutes', 'hours', 'days']),
});
type TransferSettingsValues = z.infer<typeof transferSettingsSchema>;

const TransferSettingsForm = ({ client, onActionSuccess }: { client: Omit<ClientProfile, 'password'>, onActionSuccess: () => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = () => {
        const time = client.transfer_processing_time;
        if (time.days && time.days > 0) return { duration: time.days, unit: 'days' as const};
        if (time.hours && time.hours > 0) return { duration: time.hours, unit: 'hours' as const};
        return { duration: time.minutes || 1, unit: 'minutes' as const};
    };

    const form = useForm<TransferSettingsValues>({
        resolver: zodResolver(transferSettingsSchema),
        defaultValues: defaultValues(),
    });

    async function onSubmit(values: TransferSettingsValues) {
        setIsLoading(true);
        const result = await updateClientTransferSettingsAction({
            clientId: client.id,
            ...values,
        });
        setIsLoading(false);

        if (result.success) {
            toast({ title: "Paramètres mis à jour", description: "Le délai de traitement des virements a été modifié." });
            onActionSuccess();
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="duration">Délai</Label>
                    <Input id="duration" type="number" {...form.register("duration")} disabled={isLoading} className="mt-1" />
                    {form.formState.errors.duration && <p className="text-red-500 text-sm mt-1">{form.formState.errors.duration.message}</p>}
                 </div>
                  <div>
                    <Label htmlFor="unit">Unité</Label>
                    <Select onValueChange={(v) => form.setValue('unit', v as 'minutes'|'hours'|'days')} defaultValue={form.getValues('unit')}>
                        <SelectTrigger id="unit" disabled={isLoading} className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Heures</SelectItem>
                            <SelectItem value="days">Jours</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
             </div>
            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Enregistrer"}
            </Button>
        </form>
    );
};


const ClientDetailView = ({ client, onBack, onClientAction }: { client: Omit<ClientProfile, 'password'>, onBack: () => void, onClientAction: () => void }) => {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDelete = async () => {
        if (!client) return;
        setIsDeleting(true);
        const result = await deleteClientAction(client.id);
        setIsDeleting(false);

        if (result.success) {
            toast({ title: "Client Supprimé", description: "Le client a été supprimé avec succès." });
            onClientAction(); // This will trigger a re-fetch in the parent
            onBack(); // Go back to the list view
        } else {
             toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    };
    
    const handleActionSuccess = () => {
        onClientAction();
    }

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
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-md">
                        <h3 className="font-semibold mb-2">Informations du Compte</h3>
                        <p><strong>Solde :</strong> <span className="font-bold text-primary">{(client.balance || 0).toFixed(2)} €</span></p>
                        <p><strong>Numéro de compte :</strong> {client.account_number}</p>
                        <p><strong>IBAN :</strong> {client.iban}</p>
                        <p><strong>BIC/SWIFT :</strong> {client.bic}</p>
                        <p><strong>Date de création :</strong> {new Date(client.created_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                     <div className="p-4 border rounded-md space-y-4">
                         <h3 className="font-semibold mb-2 pt-2">Opérations Manuelles</h3>
                         <BalanceAdjustmentForm client={client} onActionSuccess={handleActionSuccess} />
                    </div>
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-md">
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Ban/> Blocage des Virements</h3>
                        <BlockSettingsForm client={client} onActionSuccess={handleActionSuccess} />
                    </div>
                     <div className="p-4 border rounded-md">
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Clock /> Délai de Traitement des Virements</h3>
                        <TransferSettingsForm client={client} onActionSuccess={handleActionSuccess} />
                    </div>
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
  const [clients, setClients] = useState<Omit<ClientProfile, 'password'>[]>([]);
  const [selectedClient, setSelectedClient] = useState<Omit<ClientProfile, 'password'> | null>(null);
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
         // If a client is selected, update its data
        if(selectedClient) {
            const updatedSelectedClient = result.clients.find(c => c.id === selectedClient.id) || null;
            setSelectedClient(updatedSelectedClient);
        }
      } else {
        setErrorClients(result.error || "Une erreur est survenue.");
        setClients([]);
        setSelectedClient(null);
      }
      setIsLoadingClients(false);
  }, [isAdmin, selectedClient]);

  useEffect(() => {
    if (isAdmin) {
      fetchClients();
    }
  }, [isAdmin, fetchClients]);

  const handleClientSelection = (client: Omit<ClientProfile, 'password'>) => {
    setSelectedClient(client);
  }

  const handleBackToList = () => {
    setSelectedClient(null);
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
        <p className="text-muted-foreground mb-8">Consultez et gérez les informations des clients.</p>
        
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
                onClientCreated={fetchClients}
            />
        )}
      </div>
    </main>
  );
}
