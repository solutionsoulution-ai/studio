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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { handleContactForm, type ContactFormInput } from "@/app/actions";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

export default function ContactForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setIsLoading(true);
    const result = await handleContactForm(values);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Message envoyé !",
        description: "Merci de nous avoir contactés. Nous vous répondrons sous peu.",
        variant: "default",
        className: "bg-accent text-accent-foreground border-accent",
      });
      form.reset();
    } else {
       toast({
        title: "Oh non ! Quelque chose s'est mal passé.",
        description: result.error || "Un problème est survenu avec votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }

  return (
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom Complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="vous@exemple.com" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre Message</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Comment pouvons-nous vous aider aujourd'hui ?" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                 {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send />
                )}
                Envoyer le Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
