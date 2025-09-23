
"use client";

import { useState, useEffect, useCallback } from "react";
import type { ClientProfile } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User } from "lucide-react";
import { getClientsAction } from "@/app/actions/clients";
import Link from "next/link";
import ClientManagementTab from "@/components/admin/client-management-tab";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [clients, setClients] = useState<Omit<ClientProfile, 'password'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorClients, setErrorClients] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const sessionRole = sessionStorage.getItem('vyls_user_role');
    if (sessionRole === 'admin') {
      setIsAdmin(true);
    } else {
      toast({ title: "Accès non autorisé", description: "Vous devez être administrateur.", variant: "destructive" });
      router.push("/login");
    }
  }, [router, toast]);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    setErrorClients(null);
    const result = await getClientsAction();
    if (result.success && result.clients) {
      setClients(result.clients);
    } else {
      setErrorClients(result.error || "Une erreur est survenue.");
      setClients([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchClients();
    }
  }, [isAdmin, fetchClients]);

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
        <Loader2 className="animate-spin text-primary" size={48} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panneau d'Administration</h1>
            <p className="text-muted-foreground">Gérez les clients et consultez les soumissions de formulaires.</p>
          </div>
          <div className="flex gap-2">
             <Button asChild variant="outline">
              <Link href="/admin/soumissions">
                <User className="mr-2" />
                Soumissions
              </Link>
            </Button>
          </div>
        </div>
        
        <ClientManagementTab 
            clients={clients} 
            isLoading={isLoading} 
            error={errorClients} 
            onClientAction={fetchClients} 
        />
      </div>
    </main>
  );
}
