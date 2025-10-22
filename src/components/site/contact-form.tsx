
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const { error } = await supabase
      .from('contacts')
      .insert([
        { name, email, message },
      ]);

    setLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } else {
      router.push('/contact/merci');
    }
  };

  return (
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom Complet</Label>
                <Input id="name" name="name" placeholder="Jean Dupont" required disabled={loading} />
              </div>
              <div>
                <Label htmlFor="email">Adresse E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="vous@exemple.com" required disabled={loading} />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Votre Message</Label>
              <Textarea id="message" name="message" rows={5} placeholder="Comment pouvons-nous vous aider aujourd'hui ?" required disabled={loading} />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send />
              )}
              {loading ? "Envoi en cours..." : "Envoyer le Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
