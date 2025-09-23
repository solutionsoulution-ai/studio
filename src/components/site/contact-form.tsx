
"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dans un vrai site, ce formulaire enverrait des données.");
  };

  return (
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom Complet</Label>
                <Input id="name" placeholder="Jean Dupont" />
              </div>
              <div>
                <Label htmlFor="email">Adresse E-mail</Label>
                <Input id="email" type="email" placeholder="vous@exemple.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Votre Message</Label>
              <Textarea id="message" rows={5} placeholder="Comment pouvons-nous vous aider aujourd'hui ?" />
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

// Minimal hook form setup to satisfy component dependencies without functionality
import { useForm } from "react-hook-form";
const useFormHook = useForm;
const Label = (props: any) => <label {...props} />;
