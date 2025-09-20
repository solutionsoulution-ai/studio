
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, ArrowLeft } from "lucide-react";
import { verifyAdminLoginAction, getClientsAction, type ClientProfile } from "@/app/actions/clients";
import Link from "next/link";
import SubmissionsView from "@/components/admin/submissions-view";

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
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vyls_admin_session', 'true');
      }
      onLoginSuccess();
    } else {
      toast({ title: "Accès refusé", description: result.error, variant: "destructive" });
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Accès Sécurisé</CardTitle>
        <CardDescription>Veuillez entrer le mot de passe administrateur pour voir les soumissions.</CardDescription>
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


export default function SubmissionsPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<Omit<ClientProfile, 'password'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getClientsAction();
      if (result.success && result.clients) {
        setSubmissions(result.clients);
      } else {
        setError(result.error || "Une erreur est survenue lors de la récupération des soumissions.");
        setSubmissions([]);
      }
    } catch (e: any) {
       setError(e.message || "Une erreur critique est survenue.");
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && sessionStorage.getItem('vyls_admin_session') === 'true') {
        setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchSubmissions();
    }
  }, [isAdmin, fetchSubmissions]);

  if (!isClient) {
    return (
       <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
            <Loader2 className="animate-spin text-primary" size={48} />
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
      <div className="w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
                 <h1 className="text-3xl font-bold mb-2">Soumissions des Formulaires</h1>
                <p className="text-muted-foreground">Consultez les demandes de prêt et les messages reçus.</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/admin">
                    <ArrowLeft className="mr-2" />
                    Retour au panneau principal
                </Link>
            </Button>
        </div>
        
        <SubmissionsView 
            submissions={submissions}
            isLoading={isLoading}
            error={error}
        />
      </div>
    </main>
  );
}
