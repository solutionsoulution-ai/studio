

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ContactForm() {
  
  const handleSubmit = (e: React.FormEvent) => {
    // This is a static site, so we prevent the default form submission.
    // The form validation is handled by the browser's `required` attribute.
    // In WordPress, a plugin will handle the submission logic.
    e.preventDefault();
    alert("Dans un site fonctionnel, le formulaire serait envoyé. Pour cette maquette statique, l'envoi est désactivé.");
  };

  return (
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom Complet</Label>
                <Input id="name" placeholder="Jean Dupont" required />
              </div>
              <div>
                <Label htmlFor="email">Adresse E-mail</Label>
                <Input id="email" type="email" placeholder="vous@exemple.com" required />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Votre Message</Label>
              <Textarea id="message" rows={5} placeholder="Comment pouvons-nous vous aider aujourd'hui ?" required />
            </div>
            <Button type="submit" size="lg" className="w-full">
              <Send />
              Envoyer le Message
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}

const Label = (props: any) => <label {...props} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block" />;
