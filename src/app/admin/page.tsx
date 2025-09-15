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
import { handleAdminLogin, handleCreateUser, handleCreateLoanAccount } from "@/app/actions";
import { Loader2, UserPlus, Shield, Landmark } from "lucide-react";

// Schéma pour le formulaire de connexion admin
const adminLoginSchema = z.object({
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});
type AdminLoginValues = z.infer<typeof adminLoginSchema>;

// Schéma pour le formulaire de création de client
const createUserSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
});
type CreateUserValues = z.infer<typeof createUserSchema>;

// Schéma pour la création de compte de prêt
const createLoanAccountSchema = z.object({
  clientEmail: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  loanType: z.enum(["immobilier", "consommation", "auto"]),
  loanAmount: z.coerce.number().positive("Le montant du prêt doit être positif."),
  interestRate: z.coerce.number().min(0, "Le taux d'intérêt ne peut pas être négatif."),
  loanTerm: z.coerce.number().positive("La durée du prêt doit être positive (en années)."),
});
type CreateLoanAccountValues = z.infer<typeof createLoanAccountSchema>;


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


const CreateUserForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: CreateUserValues) {
    setIsLoading(true);
    const result = await handleCreateUser(values);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Client créé !",
        description: `Le compte pour ${values.email} a été créé avec succès.`,
      });
      form.reset();
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible de créer le client.",
        variant: "destructive",
      });
    }
  }
  
  return (
     <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <UserPlus /> Créer un Compte Client
        </CardTitle>
        <CardDescription>Créez un nouvel accès pour un client.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              Créer le compte
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const CreateLoanAccountForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateLoanAccountValues>({
    resolver: zodResolver(createLoanAccountSchema),
    defaultValues: { clientEmail: "" },
  });

  async function onSubmit(values: CreateLoanAccountValues) {
    setIsLoading(true);
    const result = await handleCreateLoanAccount(values);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Compte de prêt créé !",
        description: `Le prêt pour ${values.clientEmail} (ID: ${result.loanDetails.loanId}) a été créé.`,
      });
      form.reset();
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible de créer le compte de prêt.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Landmark /> Créer un Compte de Prêt
        </CardTitle>
        <CardDescription>Créez un nouveau prêt pour un client existant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="clientEmail"
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
                      <SelectItem value="immobilier">Prêt Immobilier</SelectItem>
                      <SelectItem value="consommation">Prêt à la Consommation</SelectItem>
                      <SelectItem value="auto">Prêt Auto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant du Prêt (€)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50000" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taux d'intérêt (%)</FormLabel>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              Créer le compte de prêt
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
    <main className="flex min-h-screen flex-col items-start justify-start p-6 sm:p-24">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Panneau Administrateur</h1>
        <p className="text-muted-foreground mb-8">Gérez les comptes clients et leurs produits bancaires.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <CreateUserForm />
          <CreateLoanAccountForm />
        </div>
      </div>
    </main>
  );
}
