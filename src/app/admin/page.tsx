
"use client";

import { useState, useEffect } from "react";
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
import { handleAdminLogin, handleCreateClientAndAccount, getClients, handleDeleteClient, handleUpdateBalance } from "@/app/actions";
import { Loader2, UserPlus, Shield, Landmark, Users, ArrowLeft, UserCog, AlertCircle, Trash2, Banknote, ArrowRightLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Schéma pour le formulaire de connexion admin
const adminLoginSchema = z.object({
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});
type AdminLoginValues = z.infer<typeof adminLoginSchema>;


// Schéma pour la création de client et de compte (prêt optionnel)
const createClientAndAccountSchema = z.object({
  // Infos Client
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
  // Infos Compte Bancaire
  accountNumber: z.string().min(1, { message: "Le numéro de compte est requis." }),
  iban: z.string().min(1, { message: "L'IBAN est requis." }),
  bic: z.string().min(1, { message: "Le code BIC/SWIFT est requis." }),
  balance: z.coerce.number().optional().default(0),
  // Infos Prêt (Optionnel)
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
    path: ["loanAmount"], // On peut attacher l'erreur à un champ spécifique
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
    const result = await handleAdminLogin(values.password);
    setIsLoading(false);

    if (result.success) {
      toast({ title: "Accès autorisé" });
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


const CreateClientAndAccountForm = ({ onClientCreated }: { onClientCreated: (client: any) => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateClientAndAccountValues>({
    resolver: zodResolver(createClientAndAccountSchema),
    defaultValues: { 
      email: "", 
      password: "", 
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
    const result = await handleCreateClientAndAccount(values);
    setIsLoading(false);

    if (result.success && result.details) {
      toast({
        title: "Client et Compte Créés !",
        description: `Le compte pour ${values.email} a été créé avec succès.`,
      });
      onClientCreated(result.details);
      form.reset();
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible de créer le client et le compte.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <UserPlus /> Créer un Compte Client
        </CardTitle>
        <CardDescription>Créez un nouvel accès client et associez un compte bancaire (avec ou sans prêt).</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 p-4 border rounded-md">
                 <h3 className="font-semibold text-lg">Informations d'Authentification</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail du Client</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="client@exemple.com" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de Passe Provisoire</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
            </div>
            
            <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-semibold text-lg">Compte Bancaire Associé</h3>
                <FormField
                    control={form.control}
                    name="balance"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Solde initial (€)</FormLabel>
                        <FormControl>
                        <Input type="number" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro de Compte</FormLabel>
                            <FormControl>
                            <Input placeholder="00012345678" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="iban"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>IBAN</FormLabel>
                            <FormControl>
                            <Input placeholder="FR76..." {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bic"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code BIC/SWIFT</FormLabel>
                            <FormControl>
                            <Input placeholder="CRLYFRPP" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Landmark /> Compte de Prêt (Optionnel)</h3>
                 <FormField
                    control={form.control}
                    name="loanType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Type de Prêt</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">Aucun (Compte bancaire seul)</SelectItem>
                              <SelectItem value="immobilier">Prêt Immobilier</SelectItem>
                              <SelectItem value="consommation">Prêt à la Consommation</SelectItem>
                              <SelectItem value="auto">Prêt Auto</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                {loanType !== 'none' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                        <FormField
                            control={form.control}
                            name="loanAmount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Montant (€)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="50000" {...field} value={field.value ?? ''} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="interestRate"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Taux (%)</FormLabel>
                                <FormControl>
                                <Input type="number" step="0.1" placeholder="2.5" {...field} value={field.value ?? ''} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="loanTerm"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Durée (années)</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="20" {...field} value={field.value ?? ''} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
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
                    Voici la liste des clients récupérée. Cliquez sur un client pour voir les détails.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Numéro de Compte</TableHead>
                        <TableHead>Prêt Actif</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client) => (
                        <TableRow key={client.clientId} onClick={() => onClientSelect(client)} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-medium">{client.email}</TableCell>
                            <TableCell>{client.accountNumber}</TableCell>
                            <TableCell>
                                {client.hasLoan ? <Badge variant="default">Oui</Badge> : <Badge variant="secondary">Non</Badge>}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

const updateBalanceSchema = z.object({
  amount: z.coerce.number().positive("Le montant doit être positif."),
  operation: z.enum(["credit", "debit"]),
});

type UpdateBalanceValues = z.infer<typeof updateBalanceSchema>;

const ClientDetailView = ({ client, onBack, onClientDeleted, onBalanceUpdate }: { client: any, onBack: () => void, onClientDeleted: (clientId: string) => void, onBalanceUpdate: (clientId: string, newBalance: number) => void }) => {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingBalance, setIsUpdatingBalance] = useState(false);

    const balanceForm = useForm<UpdateBalanceValues>({
        resolver: zodResolver(updateBalanceSchema),
        defaultValues: { amount: undefined, operation: "credit" }
    });

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await handleDeleteClient(client.clientId);
        setIsDeleting(false);

        if (result.success) {
            toast({
                title: "Client supprimé",
                description: "Le client a été supprimé avec succès.",
            });
            onClientDeleted(client.clientId);
        } else {
            toast({
                title: "Erreur de suppression",
                description: result.error || "Impossible de supprimer le client.",
                variant: "destructive",
            });
        }
    };

    const handleBalanceUpdate = async (values: UpdateBalanceValues) => {
        setIsUpdatingBalance(true);
        const result = await handleUpdateBalance({ ...values, clientId: client.clientId });
        setIsUpdatingBalance(false);

        if (result.success && result.newBalance !== undefined) {
            toast({
                title: "Solde mis à jour !",
                description: `Le nouveau solde est de ${result.newBalance.toFixed(2)} €.`
            });
            onBalanceUpdate(client.clientId, result.newBalance);
            balanceForm.reset();
        } else {
            toast({
                title: "Erreur de mise à jour",
                description: result.error || "Impossible de mettre à jour le solde.",
                variant: "destructive"
            });
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
                    </div>
                    <Button variant="outline" size="sm" onClick={onBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 border rounded-md">
                    <h3 className="font-semibold mb-2">Informations du Compte</h3>
                    <p><strong>Solde :</strong> <span className="font-bold text-primary">{client.balance?.toFixed(2) || '0.00'} €</span></p>
                    <p><strong>Numéro de compte :</strong> {client.accountNumber}</p>
                    <p><strong>IBAN :</strong> {client.iban}</p>
                    <p><strong>BIC/SWIFT :</strong> {client.bic}</p>
                    <p><strong>Date de création :</strong> {new Date(client.creationDate).toLocaleDateString('fr-FR')}</p>
                </div>

                {client.hasLoan && (
                     <div className="p-4 border rounded-md">
                        <h3 className="font-semibold mb-2">Informations du Prêt</h3>
                        <p><strong>Type de prêt :</strong> {client.loanType}</p>
                        <p><strong>Montant :</strong> {client.loanAmount} €</p>
                        <p><strong>Taux :</strong> {client.interestRate} %</p>
                        <p><strong>Durée :</strong> {client.loanTerm} ans</p>
                    </div>
                )}
                
                <div className="p-4 border rounded-md space-y-4 bg-secondary/30">
                     <h3 className="font-semibold mb-2">Gestion de Compte</h3>
                     <Form {...balanceForm}>
                         <form onSubmit={balanceForm.handleSubmit(handleBalanceUpdate)} className="space-y-4">
                            <FormField
                                control={balanceForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Montant de l'opération</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="100.00" {...field} disabled={isUpdatingBalance}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={balanceForm.control}
                                name="operation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type d'opération</FormLabel>
                                        <FormControl>
                                             <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                                disabled={isUpdatingBalance}
                                             >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="credit" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Crédit</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="debit" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Débit</FormLabel>
                                                </FormItem>
                                             </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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
                            <AlertDialogDescription>
                                Cette action est irréversible. Toutes les données du client, y compris son compte et ses transactions, seront définitivement effacées.
                            </AlertDialogDescription>
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
      if (isAdmin) {
          const fetchClients = async () => {
              setIsLoadingClients(true);
              setErrorClients(null);
              const result = await getClients();
              if (result.success && result.data) {
                  setClients(result.data.sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()));
              } else {
                  setErrorClients(result.error || "Une erreur est survenue.");
                  toast({
                      title: "Erreur de chargement",
                      description: result.error || "Impossible de charger la liste des clients.",
                      variant: "destructive"
                  });
              }
              setIsLoadingClients(false);
          };
          fetchClients();
      }
  }, [isAdmin, toast]);

  const handleClientCreation = (newClient: any) => {
    setClients(prevClients => [newClient, ...prevClients]);
  }
  
  const handleClientDeletion = (clientId: string) => {
    setClients(prevClients => prevClients.filter(c => c.clientId !== clientId));
    setSelectedClient(null);
  }

  const handleClientSelection = (client: any) => {
    setSelectedClient(client);
  }

  const handleBackToList = () => {
    setSelectedClient(null);
  }
  
  const handleBalanceUpdate = (clientId: string, newBalance: number) => {
      const updateClient = (client: any) => {
           if(client.clientId === clientId) {
               return { ...client, balance: newBalance };
           }
           return client;
      }
      setClients(prevClients => prevClients.map(updateClient));
      setSelectedClient(prevClient => prevClient ? updateClient(prevClient) : null);
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
                    onClientDeleted={handleClientDeletion}
                    onBalanceUpdate={handleBalanceUpdate}
                />
            ) : (
                <CreateClientAndAccountForm onClientCreated={handleClientCreation} />
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
```