
"use client";

import { useState, useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ClientProfile } from "@/app/actions/clients";
import {
    createClientAction,
    deleteClientAction,
    adjustClientBalanceAction,
    updateClientBlockSettingsAction,
    updateClientTransferSettingsAction
} from "@/app/actions/clients";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger
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
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoreHorizontal, PlusCircle, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";


interface ClientManagementTabProps {
    clients: Omit<ClientProfile, 'password'>[];
    isLoading: boolean;
    error: string | null;
    onClientAction: () => void; // Callback to refresh data
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(value || 0);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
}

// --- Create Client Form ---
const createClientSchema = z.object({
    email: z.string().email("L'adresse e-mail est invalide."),
    password: z.string().min(8, "Le mot de passe doit comporter au moins 8 caractères."),
    initialBalance: z.coerce.number().min(0, "Le solde initial ne peut pas être négatif."),
});
type CreateClientValues = z.infer<typeof createClientSchema>;

const CreateClientDialog = ({ onClientCreated, open, onOpenChange }: { onClientCreated: () => void, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<CreateClientValues>({
        resolver: zodResolver(createClientSchema),
        defaultValues: { email: "", password: "", initialBalance: 0 }
    });

    async function onSubmit(values: CreateClientValues) {
        setIsSubmitting(true);
        const result = await createClientAction(values);
        setIsSubmitting(false);
        if (result.success) {
            toast({ title: "Client créé avec succès !" });
            onClientCreated();
            onOpenChange(false);
            form.reset();
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer un Nouveau Client</DialogTitle>
                    <DialogDescription>Remplissez les informations pour créer un nouveau profil client.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="initialBalance" render={({ field }) => (
                            <FormItem><FormLabel>Solde Initial (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmitting}>Annuler</Button></DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                                Créer le Client
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

// --- Other Dialogs (Balance, Block, Transfer Settings) ---
const balanceSchema = z.object({
  amount: z.coerce.number().refine(val => val !== 0, "Le montant ne peut pas être zéro."),
  reason: z.string().min(3, "Le motif est requis."),
  type: z.enum(['credit', 'debit']),
});
type BalanceValues = z.infer<typeof balanceSchema>;

const GenericActionDialog = ({ client, onAction, actionType }: { client: Omit<ClientProfile, 'password'>, onAction: () => void, actionType: 'balance' | 'block' | 'transferTime' }) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    let form: UseFormReturn<any>;
    let schema: z.ZodObject<any>;
    let title: string;
    let description: string;
    
    // Schemas and forms for different actions
    const blockSchema = z.object({ is_transfer_blocked: z.boolean(), transfer_block_reason: z.string().nullable() });
    const transferSettingsSchema = z.object({ duration: z.coerce.number().min(0), unit: z.enum(['minutes', 'hours', 'days']) });
    
    // Initialize form and schema based on actionType
    switch(actionType) {
        case 'balance':
            form = useForm<BalanceValues>({ resolver: zodResolver(balanceSchema), defaultValues: { type: 'credit', reason: '', amount: 0 } });
            title = "Ajuster le Solde";
            description = `Modifiez le solde du client ${client.email}.`;
            break;
        case 'block':
            form = useForm({ resolver: zodResolver(blockSchema), defaultValues: { is_transfer_blocked: client.is_transfer_blocked, transfer_block_reason: client.transfer_block_reason || '' } });
            title = "Gérer le Blocage des Virements";
            description = `Activez ou désactivez les virements pour ${client.email}.`;
            break;
        case 'transferTime':
            const initialUnit = client.transfer_processing_time.days ? 'days' : client.transfer_processing_time.hours ? 'hours' : 'minutes';
            const initialDuration = client.transfer_processing_time.days || client.transfer_processing_time.hours || client.transfer_processing_time.minutes || 0;
            form = useForm({ resolver: zodResolver(transferSettingsSchema), defaultValues: { duration: initialDuration, unit: initialUnit }});
            title = "Délai de Traitement des Virements";
            description = `Configurez le temps de traitement pour les virements de ${client.email}.`;
            break;
    }

    const handleSubmit = async (values: any) => {
        setIsSubmitting(true);
        let result: { success: boolean, error?: string };

        switch(actionType) {
            case 'balance':
                result = await adjustClientBalanceAction({ ...values, clientId: client.id });
                break;
            case 'block':
                result = await updateClientBlockSettingsAction({ ...values, clientId: client.id });
                break;
            case 'transferTime':
                result = await updateClientTransferSettingsAction({ ...values, clientId: client.id });
                break;
        }
        
        setIsSubmitting(false);
        if (result.success) {
            toast({ title: "Action réussie !" });
            onAction();
            setIsOpen(false);
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
    };

    const renderFormFields = () => {
        switch(actionType) {
            case 'balance': return (
                <div className="space-y-4">
                    <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem><FormLabel>Type d'opération</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem><FormControl><RadioGroupItem value="credit" /> Crédit</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="debit" /> Débit</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="amount" render={({ field }) => (
                        <FormItem><FormLabel>Montant (€)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="reason" render={({ field }) => (
                        <FormItem><FormLabel>Motif</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            );
            case 'block': return (
                 <div className="space-y-4">
                    <FormField control={form.control} name="is_transfer_blocked" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Bloquer les virements</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="transfer_block_reason" render={({ field }) => (
                        <FormItem><FormLabel>Motif du blocage (si actif)</FormLabel><FormControl><Textarea {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            );
             case 'transferTime': return (
                 <div className="space-y-4">
                     <FormField control={form.control} name="duration" render={({ field }) => (
                        <FormItem><FormLabel>Durée</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="unit" render={({ field }) => (
                        <FormItem><FormLabel>Unité</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem><FormControl><RadioGroupItem value="minutes" /> minutes</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="hours" /> heures</FormControl></FormItem><FormItem><FormControl><RadioGroupItem value="days" /> jours</FormControl></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            );
        }
    }
    
    const triggerTextMap = {
        balance: 'Ajuster le solde',
        block: 'Gérer le blocage',
        transferTime: 'Délai de virement'
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left">
                    {triggerTextMap[actionType]}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {renderFormFields()}
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmitting}>Annuler</Button></DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                                Valider
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

// --- Main Component ---
export default function ClientManagementTab({ clients, isLoading, error, onClientAction }: ClientManagementTabProps) {
    const { toast } = useToast();
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<Omit<ClientProfile, 'password'> | null>(null);

    const handleDeleteClient = async () => {
        if (!clientToDelete) return;
        const result = await deleteClientAction(clientToDelete.id);
        if (result.success) {
            toast({ title: "Client supprimé avec succès !" });
            onClientAction();
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" });
        }
        setClientToDelete(null);
    };

    // Filter out submissions from the main client list
    const regularClients = clients.filter(c => !c.has_loan && !c.transactions.some(t => t.reason.startsWith("Message de Contact:")));

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Card>
                    <CardContent className="p-6">
                        <Skeleton className="h-48 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
             <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                       <AlertCircle className="text-destructive" /> Erreur
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-destructive py-12">{error}</CardContent>
            </Card>
        );
    }
    

    return (
        <>
            {/* --- DIALOGS --- */}
            <CreateClientDialog onClientCreated={onClientAction} open={isCreateOpen} onOpenChange={setCreateOpen} />
            <AlertDialog open={!!clientToDelete} onOpenChange={(open) => !open && setClientToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Le profil de <strong>{clientToDelete?.email}</strong> et toutes ses données associées (transactions, etc.) seront définitivement supprimés.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteClient}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        
            {/* --- MAIN VIEW --- */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                             <CardTitle>Gestion des Clients</CardTitle>
                            <CardDescription>
                                Créez, consultez et gérez les profils des clients de la banque en ligne.
                            </CardDescription>
                        </div>
                        <Button onClick={() => setCreateOpen(true)}>
                            <PlusCircle className="mr-2"/> Créer un client
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client ID</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Solde</TableHead>
                                <TableHead>Statut Virement</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {regularClients && regularClients.length > 0 ? (
                                regularClients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-mono">{client.client_id}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{formatCurrency(client.balance)}</TableCell>
                                        <TableCell>
                                            {client.is_transfer_blocked ? <Badge variant="destructive">Bloqué</Badge> : <Badge variant="secondary" className="bg-green-100 text-green-800">Actif</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal/></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild><GenericActionDialog client={client} onAction={onClientAction} actionType="balance" /></DropdownMenuItem>
                                                    <DropdownMenuItem asChild><GenericActionDialog client={client} onAction={onClientAction} actionType="block" /></DropdownMenuItem>
                                                    <DropdownMenuItem asChild><GenericActionDialog client={client} onAction={onClientAction} actionType="transferTime" /></DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => setClientToDelete(client)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                        Supprimer le client
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">Aucun client trouvé.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
