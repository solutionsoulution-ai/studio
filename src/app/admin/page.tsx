
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Loader2, UserPlus, Shield, Landmark, Users, ArrowLeft, UserCog, AlertCircle, Trash2, ArrowRightLeft, Settings } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@supabase/supabase-js";

// Supabase Admin Client - Côté Serveur (via une action)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Supabase Client - Côté Navigateur
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Schéma pour le formulaire de connexion admin
const adminLoginSchema = z.object({
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});
type AdminLoginValues = z.infer<typeof adminLoginSchema>;

// Schéma pour la création de client et de compte
const createClientAndAccountSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
  clientId: z.string().min(1, { message: "L'identifiant client est requis."}),
  accountNumber: z.string().min(1, { message: "Le numéro de compte est requis." }),
  iban: z.string().min(1, { message: "L'IBAN est requis." }),
  bic: z.string().min(1, { message: "Le code BIC/SWIFT est requis." }),
  balance: z.coerce.number().optional().default(0),
  loanType: z.enum(["none", "immobilier", "consommation", "auto"]),
  loanAmount: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  loanTerm: z.coerce.number().optional(),
}).refine(data => {
    if (data.loanType !== 'none') {
        return data.loanAmount !== undefined && data.interestRate !== undefined && data.loanTerm !== undefined;
    }
    return true;
}, {
    message: "Les détails du prêt sont requis lorsque le type de prêt n'est pas 'Aucun'.",
    path: ["loanAmount"],
});
type CreateClientAndAccountValues = z.infer<typeof createClientAndAccountSchema>;


const AdminLoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(values: AdminLoginValues) {
    setIsLoading(true);
    // Hardcoded password for demo access
    const ADMIN_PASSWORD = "XtZ_7@pQn!fS8#mV";
    const success = values.password === ADMIN_PASSWORD;
    setIsLoading(false);

    if (success) {
      toast({ title: "Accès autorisé" });
      onLoginSuccess();
    } else {
      toast({ title: "Accès refusé", description: "Mot de passe incorrect.", variant: "destructive" });
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Accès Administrateur</CardTitle>
        <CardDescription>Veuillez entrer le mot de passe administrateur.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de Passe Administrateur</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : <Shield />}
              Déverrouiller
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};


const CreateClientAndAccountForm = ({ onClientCreated }: { onClientCreated: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateClientAndAccountValues>({
    resolver: zodResolver(createClientAndAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      clientId: `VC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      accountNumber: "",
      iban: "",
      bic: "",
      balance: 0,
      loanType: "none",
    },
  });

  const loanType = form.watch("loanType");

    async function onSubmit(values: CreateClientAndAccountValues) {
        setIsLoading(true);

        try {
            // 1. Create the user in Supabase Auth
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email: values.email,
                password: values.password,
                email_confirm: true, // Auto-confirms the email
            });

            if (authError) throw authError;

            const userId = authData.user.id;

            // 2. Create the profile in the 'profiles' table
            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    id: userId,
                    client_id: values.clientId,
                    email: values.email,
                    account_number: values.accountNumber,
                    iban: values.iban,
                    bic: values.bic,
                    balance: values.balance,
                    has_loan: values.loanType !== 'none',
                    loan_type: values.loanType === 'none' ? null : values.loanType,
                    loan_amount: values.loanAmount,
                    interest_rate: values.interestRate,
                    loan_term: values.loanTerm,
                    is_transfer_blocked: false,
                    transfer_block_reason: null,
                    transfer_processing_time: { days: 0, hours: 0, minutes: 1 }
                });
            
            if (profileError) {
                // If profile creation fails, try to delete the auth user to avoid orphans
                await supabaseAdmin.auth.admin.deleteUser(userId);
                throw profileError;
            }

            toast({
                title: "Client et Compte Créés !",
                description: `Le compte pour ${values.email} a été créé avec succès.`,
            });
            onClientCreated(); // Refresh the client list
            form.reset({
                ...form.getValues(), // keep some values if needed
                email: "",
                password: "",
                clientId: `VC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            });

        } catch (error: any) {
             toast({
                title: "Erreur de création de client",
                description: error.message || "Une erreur inattendue est survenue.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <UserPlus /> Créer un Compte Client
        </CardTitle>
        <CardDescription>Créez un nouvel accès client et associez un compte bancaire.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 p-4 border rounded-md">
                 <h3 className="font-semibold text-lg">Informations d'Authentification</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail (pour la connexion)</FormLabel>
                          <FormControl><Input type="email" placeholder="client@exemple.com" {...field} disabled={isLoading} /></FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de Passe</FormLabel>
                          <FormControl><Input type="password" placeholder="••••••••" {...field} disabled={isLoading} /></FormControl>
                          <FormMessage />
                        </FormItem>
                     )}/>
                 </div>
            </div>

            <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-semibold text-lg">Compte Bancaire Associé</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <FormField control={form.control} name="clientId" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Identifiant Client</FormLabel>
                            <FormControl><Input placeholder="VC-..." {...field} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="balance" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Solde initial (€)</FormLabel>
                            <FormControl><Input type="number" {...field} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="accountNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro de Compte</FormLabel>
                            <FormControl><Input placeholder="00012345678" {...field} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="iban" render={({ field }) => (
                        <FormItem>
                            <FormLabel>IBAN</FormLabel>
                            <FormControl><Input placeholder="FR76..." {...field} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="bic" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code BIC/SWIFT</FormLabel>
                            <FormControl><Input placeholder="CRLYFRPP" {...field} disabled={isLoading} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Landmark /> Compte de Prêt (Optionnel)</h3>
                 <FormField control={form.control} name="loanType" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type de Prêt</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez un type" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="none">Aucun (Compte bancaire seul)</SelectItem>
                              <SelectItem value="immobilier">Prêt Immobilier</SelectItem>
                              <SelectItem value="consommation">Prêt à la Consommation</SelectItem>
                              <SelectItem value="auto">Prêt Auto</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                 )}/>
                {loanType !== 'none' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                        <FormField control={form.control} name="loanAmount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Montant (€)</FormLabel>
                                <FormControl><Input type="number" placeholder="50000" {...field} value={field.value ?? ''} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="interestRate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Taux (%)</FormLabel>
                                <FormControl><Input type="number" step="0.1" placeholder="2.5" {...field} value={field.value ?? ''} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="loanTerm" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Durée (années)</FormLabel>
                                <FormControl><Input type="number" placeholder="20" {...field} value={field.value ?? ''} disabled={isLoading} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              Créer le Client et le Compte
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const ClientList = ({ clients, onClientSelect, isLoading, error }: { clients: any[], onClientSelect: (client:any) => void, isLoading: boolean, error?: string | null }) => {

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
                    Cliquez sur un client pour voir les détails et le gérer.
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

const clientUpdateBalanceSchema = z.object({
  amount: z.coerce.number({invalid_type_error: "Le montant doit être un nombre."}).positive("Le montant doit être positif."),
  operation: z.enum(["credit", "debit"]),
  reason: z.string().min(3, "Un motif est requis pour l'opération."),
});
type UpdateBalanceValues = z.infer<typeof clientUpdateBalanceSchema>;

const clientConfigSchema = z.object({
    is_transfer_blocked: z.boolean().default(false),
    transfer_block_reason: z.string().optional(),
    transfer_processing_time: z.object({
        days: z.coerce.number().min(0).default(0),
        hours: z.coerce.number().min(0).max(23).default(0),
        minutes: z.coerce.number().min(0).max(59).default(1),
    })
}).refine(data => !data.is_transfer_blocked || (data.is_transfer_blocked && data.transfer_block_reason && data.transfer_block_reason.length > 5), {
    message: "Un motif d'au moins 5 caractères est requis si les virements sont bloqués.",
    path: ["transfer_block_reason"],
});
type ClientConfigValues = z.infer<typeof clientConfigSchema>;


const ClientDetailView = ({ client, onBack, onClientAction }: { client: any, onBack: () => void, onClientAction: () => void }) => {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingBalance, setIsUpdatingBalance] = useState(false);
    const [isUpdatingConfig, setIsUpdatingConfig] = useState(false);

    const balanceForm = useForm<UpdateBalanceValues>({
        resolver: zodResolver(clientUpdateBalanceSchema),
        defaultValues: { amount: undefined, operation: "credit", reason: "" }
    });

    const configForm = useForm<ClientConfigValues>({
        resolver: zodResolver(clientConfigSchema),
        defaultValues: {
            is_transfer_blocked: client.is_transfer_blocked || false,
            transfer_block_reason: client.transfer_block_reason || "",
            transfer_processing_time: client.transfer_processing_time || { days: 0, hours: 0, minutes: 1 }
        }
    });

    const isTransferBlocked = configForm.watch("is_transfer_blocked");

    const handleDelete = async () => {
        setIsDeleting(true);
        // This will cascade delete thanks to DB constraints
        const { error } = await supabaseAdmin.auth.admin.deleteUser(client.id);
        setIsDeleting(false);

        if (error) {
            toast({ title: "Erreur", description: `Impossible de supprimer le client: ${error.message}`, variant: "destructive" });
        } else {
            toast({ title: "Client Supprimé", description: "Le client a été supprimé avec succès." });
            onClientAction();
            onBack();
        }
    };

    const handleBalanceUpdate = async (values: UpdateBalanceValues) => {
        setIsUpdatingBalance(true);
        const amount = values.operation === 'credit' ? values.amount : -values.amount;

        const { error } = await supabaseAdmin
            .from('profiles')
            .update({ balance: (client.balance || 0) + amount })
            .eq('id', client.id);

        if (error) {
             toast({ title: "Erreur", description: `Impossible de mettre à jour le solde: ${error.message}`, variant: "destructive" });
        } else {
             await supabaseAdmin.from('transactions').insert({
                 profile_id: client.id,
                 amount,
                 reason: values.reason,
             });
             toast({ title: "Opération réussie !", description: `Le solde du client a été mis à jour.` });
             balanceForm.reset();
             onClientAction();
        }
        setIsUpdatingBalance(false);
    };

    const handleConfigUpdate = async (values: ClientConfigValues) => {
        setIsUpdatingConfig(true);
        const { error } = await supabaseAdmin
            .from('profiles')
            .update({
                is_transfer_blocked: values.is_transfer_blocked,
                transfer_block_reason: values.is_transfer_blocked ? values.transfer_block_reason : null,
                transfer_processing_time: values.transfer_processing_time
            })
            .eq('id', client.id);

        setIsUpdatingConfig(false);
        if (error) {
            toast({ title: "Erreur", description: error.message, variant: "destructive" });
        } else {
            toast({
                title: "Configuration enregistrée",
                description: "Les paramètres du client ont été mis à jour.",
            });
            onClientAction();
        }
    };

    return (
        <Card className="w-full shadow-lg">
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

                <div className="p-4 border rounded-md space-y-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><Settings /> Configuration du Client</h3>
                    <Form {...configForm}>
                        <form onSubmit={configForm.handleSubmit(handleConfigUpdate)} className="space-y-4">
                             <FormField control={configForm.control} name="is_transfer_blocked" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5"><FormLabel>Bloquer les virements</FormLabel><FormMessage /></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                             )}/>
                            {isTransferBlocked && (
                                <FormField control={configForm.control} name="transfer_block_reason" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Motif du blocage</FormLabel>
                                        <FormControl><Input placeholder="Ex: Vérification de compte requise" {...field} value={field.value ?? ""} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            )}
                            <div>
                                <FormLabel>Durée de traitement du virement</FormLabel>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                     <FormField control={configForm.control} name="transfer_processing_time.days" render={({ field }) => (
                                        <FormItem><FormControl><Input type="number" placeholder="Jours" {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                     <FormField control={configForm.control} name="transfer_processing_time.hours" render={({ field }) => (
                                        <FormItem><FormControl><Input type="number" placeholder="Heures" {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                     <FormField control={configForm.control} name="transfer_processing_time.minutes" render={({ field }) => (
                                        <FormItem><FormControl><Input type="number" placeholder="Min" {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                </div>
                            </div>
                            <Button type="submit" disabled={isUpdatingConfig}>
                                {isUpdatingConfig && <Loader2 className="animate-spin mr-2" />}
                                Enregistrer la Configuration
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="p-4 border rounded-md space-y-4 bg-secondary/30">
                     <h3 className="font-semibold mb-2">Gestion de Compte</h3>
                     <Form {...balanceForm}>
                         <form onSubmit={balanceForm.handleSubmit(handleBalanceUpdate)} className="space-y-4">
                            <FormField control={balanceForm.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Montant de l'opération</FormLabel>
                                    <FormControl><Input type="number" placeholder="100.00" {...field} disabled={isUpdatingBalance} value={field.value ?? ''} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={balanceForm.control} name="reason" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motif de l'opération</FormLabel>
                                    <FormControl><Input placeholder="Ex: Ajustement, Bonus..." {...field} disabled={isUpdatingBalance}/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={balanceForm.control} name="operation" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type d'opération</FormLabel>
                                    <FormControl>
                                         <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4" disabled={isUpdatingBalance}>
                                            <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="credit" /></FormControl><FormLabel className="font-normal">Crédit</FormLabel></FormItem>
                                            <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="debit" /></FormControl><FormLabel className="font-normal">Débit</FormLabel></FormItem>
                                         </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button type="submit" disabled={isUpdatingBalance}>
                                {isUpdatingBalance && <Loader2 className="animate-spin mr-2" />}
                                <ArrowRightLeft className="mr-2" />
                                Exécuter l'opération
                            </Button>
                         </form>
                     </Form>
                     <Separator />
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
                            <AlertDialogDescription>Cette action est irréversible et supprimera l'authentification et le profil du client, ainsi que toutes les transactions associées.</AlertDialogDescription>
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
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchClients = useCallback(async () => {
      if (!isAdmin) return;
      setIsLoadingClients(true);
      setErrorClients(null);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setErrorClients(`Erreur de RLS: ${error.message}. Vérifiez les policies sur la table 'profiles'. L'admin doit pouvoir lire.`);
        setClients([]);
      } else {
        setClients(data);
      }
      setIsLoadingClients(false);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchClients();
    }
  }, [isAdmin, fetchClients]);

  const handleClientAction = () => {
    fetchClients();
    if (selectedClient) {
        // Refresh selected client data
        supabase.from('profiles').select('*').eq('id', selectedClient.id).single().then(({data, error}) => {
            if (!error) {
                setSelectedClient(data);
            } else {
                setSelectedClient(null);
            }
        });
    }
  }

  const handleClientSelection = (client: any) => {
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
        <p className="text-muted-foreground mb-8">Gérez les comptes clients et leurs produits bancaires.</p>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            {selectedClient ? (
                <ClientDetailView
                    client={selectedClient}
                    onBack={handleBackToList}
                    onClientAction={handleClientAction}
                />
            ) : (
                <CreateClientAndAccountForm onClientCreated={fetchClients} />
            )}
            <ClientList
                clients={clients}
                onClientSelect={handleClientSelection}
                isLoading={isLoadingClients}
                error={errorClients}
            />
        </div>
      </div>
    </main>
  );
}

    