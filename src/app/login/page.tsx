
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
import { Loader2, LogIn } from "lucide-react";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { supabase } from "@/lib/supabase-client";

const formSchema = z.object({
  clientId: z.string().min(1, { message: "L'identifiant client est requis." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Clear any session on page load
    if (typeof window !== 'undefined') {
        localStorage.removeItem('vyls_session');
    }
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (!isClient) return;
    
    setIsLoading(true);

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*, password') // Important: select the hashed password
      .eq('client_id', values.clientId)
      .single();

    if (error || !profile) {
      setIsLoading(false);
      toast({
        title: "Erreur de connexion",
        description: "Identifiant client ou mot de passe incorrect.",
        variant: "destructive",
      });
      return;
    }
    
    // We need to verify the password. This is tricky without a dedicated backend function.
    // A simple RPC function in Supabase is the best way to handle this securely.
    // Let's create one.
    const { data: authResult, error: authError } = await supabase.rpc('verify_password', {
        p_client_id: values.clientId,
        p_password: values.password
    });


    setIsLoading(false);

    if (authError || !authResult) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiant client ou mot de passe incorrect.",
        variant: "destructive",
      });
    } else {
      // Store session in localStorage
      localStorage.setItem('vyls_session', JSON.stringify(profile));

      toast({
        title: "Connexion réussie !",
        description: "Vous allez être redirigé vers votre espace client.",
        variant: "default",
      });
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center container mx-auto py-16">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Espace Client</CardTitle>
            <CardDescription>Connectez-vous pour accéder à votre tableau de bord.</CardDescription>
          </CardHeader>
          <CardContent>
            {!isClient ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identifiant Client</FormLabel>
                        <FormControl>
                          <Input placeholder="VC-xxxxxx" {...field} disabled={isLoading} />
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
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <LogIn />
                    )}
                    Se connecter
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
