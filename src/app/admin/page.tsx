"use client";

import { useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleAdminLogin, handleCreateClientAndAccount } from "@/app/actions";
import { Loader2, UserPlus, Shield, Landmark } from "lucide-react";

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
  iban: z.string().min(1, { message: "L'IBAN est requis." }),
  bic: z.string().min(1, { message: "Le code BIC/SWIFT est requis." }),
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


const CreateClientAndAccountForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateClientAndAccountValues>({
    resolver: zodResolver(createClientAndAccountSchema),
    defaultValues: { 
      email: "", 
      password: "", 
      iban: "", 
      bic: "",
      loanType: "none",
    },
  });

  const loanType = form.watch("loanType");

  async function onSubmit(values: CreateClientAndAccountValues) {
    setIsLoading(true);
    const result = await handleCreateClientAndAccount(values);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Client et Compte Créés !",
        description: `Le compte pour ${values.email} a été créé avec succès.`,
      });
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
    <Card className="w-full max-w-2xl shadow-lg">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <Input type="number" placeholder="50000" {...field} disabled={isLoading} />
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
                                <Input type="number" step="0.1" placeholder="2.5" {...field} disabled={isLoading} />
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
                                <Input type="number" placeholder="20" {...field} disabled={isLoading} />
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


export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
        <AdminLoginForm onLoginSuccess={() => setIsAdmin(true)} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Panneau Administrateur</h1>
        <p className="text-muted-foreground mb-8">Gérez les comptes clients et leurs produits bancaires.</p>
        <CreateClientAndAccountForm />
      </div>
    </main>
  );
}

    