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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleAdminLogin, handleCreateUser } from "@/app/actions";
import { Loader2, UserPlus, Shield } from "lucide-react";

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
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Panneau Administrateur</CardTitle>
        <CardDescription>Créer un nouveau compte client.</CardDescription>
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
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : <UserPlus />}
              Créer le compte
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
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <AdminLoginForm onLoginSuccess={() => setIsAdmin(true)} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <CreateUserForm />
    </main>
  );
}
