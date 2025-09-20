
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, FileText } from "lucide-react";
import { verifyAdminLoginAction, getClientsAction } from "@/app/actions/clients";
import type { ClientProfile } from "@/lib/types";
import Link from "next/link";
import ClientManagementTab from "@/components/admin/client-management-tab";

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


export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clients, setClients] = useState<Omit<ClientProfile, 'password'>[]>([]);
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
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
                 <h1 className="text-3xl font-bold mb-2">Panneau d'Administration</h1>
                <p className="text-muted-foreground">Gérez les clients de la banque en ligne.</p>
            </div>
             <div className="flex gap-2">
                 <Button asChild variant="secondary">
                    <Link href="/admin/documents">
                        <FileText className="mr-2" />
                        Générateur de Documents
                    </Link>
                </Button>
            </div>
        </div>
        
        <ClientManagementTab 
            clients={clients} 
            isLoading={isLoadingClients} 
            error={errorClients} 
            onClientAction={fetchClients} 
        />
      </div>
    </main>
  );
}
